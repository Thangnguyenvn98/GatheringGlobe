import express, { Request, Response } from "express";
import Discount from "../models/discount";
import verifyToken from "../middleware/auth";
import Stripe from "stripe";
import DiscountApplication from "../models/discountTicketOrder";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

const router = express.Router();

router.get("/:discountId", async (req: Request, res: Response) => {
  try {
    const { discountId } = req.params;
    if (!discountId) {
      return res.status(400).send("Discount ID is required");
    }
    const discount = await Discount.findById(discountId)
      .populate("eventId")
      .populate("ticketId")
      .exec();
    res.status(200).send(discount);
  } catch (error) {
    console.log(error);
  }
});

// Backend route for applying a discount
router.post("/apply-discount", verifyToken, async (req, res) => {
  const { cartItems, discountCode, totalCost, paymentIntentId, discountCodes } =
    req.body;
  const userId = req.userId;

  try {
    // Validate the discount code
    const discount = await Discount.findOne({
      code: discountCode,
      isActive: true,
    });

    if (!discount) {
      return res
        .status(400)
        .json({ message: "Invalid or expired discount code." });
    }

    if (
      discount.usedCount >= discount.usageLimit ||
      new Date() > discount.validUntil
    ) {
      return res
        .status(400)
        .json({ message: "Discount code is no longer valid." });
    }

    let discountAmount = 0;
    let totalQuantityDiscounted = 0;
    const discountedTickets = [];

    for (const item of cartItems) {
      for (const ticketId in item.tickets) {
        if (
          discount?.eventId?.toString() === item.eventId &&
          discount?.ticketId?.toString() === ticketId
        ) {
          const ticketDetails = item.tickets[ticketId];
          const discountPerTicket = discount.percentage
            ? (ticketDetails.price * discount.percentage) / 100
            : discount.number;

          discountAmount += (discountPerTicket || 0) * ticketDetails.quantity;
          totalQuantityDiscounted += ticketDetails.quantity;

          discountedTickets.push({
            eventId: item.eventId,
            ticketId: ticketId,
            originalPrice: ticketDetails.price,
            discountPerTicket: discountPerTicket,
            newPrice: ticketDetails.price - (discountPerTicket || 0),
            quantity: ticketDetails.quantity,
            discountCode: discount.code,
          });
        }
      }
    }

    if (discount.usedCount + totalQuantityDiscounted > discount.usageLimit) {
      return res
        .status(400)
        .json({ message: "Discount usage limit exceeded." });
    }

    // Calculate the new total cost
    const newTotal = totalCost - discountAmount;
    const existingDiscountApplication = await DiscountApplication.findOne({
      paymentIntentId: paymentIntentId,
    });

    if (!existingDiscountApplication) {
      const newDiscountApplication = new DiscountApplication({
        paymentIntentId,
        userId,
        discountedTickets,
      });
      await newDiscountApplication.save();
    } else {
      //Existing discount applications
      if (discountCodes.length === 0) {
        existingDiscountApplication.set({ discountedTickets: [] });
      }
      existingDiscountApplication.discountedTickets.push(...discountedTickets);
      await existingDiscountApplication.save();
    }

    try {
      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId);
      if (!paymentIntent) {
        return res.status(400).json({ message: "Payment intent not found" });
      }

      if (paymentIntent.metadata.userId !== req.userId) {
        return res.status(400).json({ message: "Payment Intent Mismatch" });
      }
      await stripe.paymentIntents.update(paymentIntentId, {
        amount: Math.round(newTotal * 100),
      });
    } catch (error) {
      console.error("Failed to apply discount:", error);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.json({
      message: "Discount applied successfully.",
      newTotal,
      discountAmount,
      discountedTickets,
    });
  } catch (error) {
    console.error("Error applying discount:", error);
    res
      .status(500)
      .json({ message: "An error occurred while applying the discount." });
  }
});

router.post("/remove-discount", verifyToken, async (req, res) => {
  const { paymentIntentId, discountCode, totalCost, totalDiscount, cartItems } =
    req.body;
  const userId = req.userId;

  try {
    const discountApplication = await DiscountApplication.findOne({
      paymentIntentId,
    });

    const discount = await Discount.findOne({
      code: discountCode,
      isActive: true,
    });

    if (!discount) {
      return res
        .status(400)
        .json({ message: "Invalid or expired discount code." });
    }

    if (!discountApplication) {
      return res
        .status(400)
        .json({ message: "Discount application not found" });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!paymentIntent) {
      return res.status(400).json({ message: "Payment intent not found" });
    }

    if (paymentIntent.metadata.userId !== userId) {
      return res.status(400).json({ message: "Payment Intent Mismatch" });
    }

    let discountAmount = 0;

    for (const item of cartItems) {
      for (const ticketId in item.tickets) {
        if (
          discount?.eventId?.toString() === item.eventId &&
          discount?.ticketId?.toString() === ticketId
        ) {
          const ticketDetails = item.tickets[ticketId];
          const discountPerTicket = discount.percentage
            ? (ticketDetails.price * discount.percentage) / 100
            : discount.number;

          discountAmount += (discountPerTicket || 0) * ticketDetails.quantity;
        }
      }
    }
    const newTotal = totalCost + discountAmount;
    const newDiscountAmount = totalDiscount - discountAmount;

    await stripe.paymentIntents.update(paymentIntentId, {
      amount: Math.round(newTotal * 100),
    });

    for (const discountedTickets of discountApplication.discountedTickets) {
      if (discountedTickets.discountCode === discountCode) {
        discountApplication.discountedTickets.pull(discountedTickets);
      }
    }

    const discountedTickets = discountApplication.discountedTickets;

    res.json({
      message: "Discount removed successfully.",
      newTotal,
      discountAmount: newDiscountAmount,
      discountedTickets,
    });
  } catch (error) {
    console.error("Error removing discount:", error);
    res
      .status(500)
      .json({ message: "An error occurred while removing the discount." });
  }
});

export default router;
