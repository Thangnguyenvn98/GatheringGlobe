import express, { Request, Response } from "express";
import Discount from "../models/discount";
import verifyToken from "../middleware/auth";

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
  const { cartItems, discountCode, totalCost } = req.body;

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
    // Update discount usage count
    discount.usedCount += totalQuantityDiscounted;
    await discount.save();

    // Calculate the new total cost
    const newTotal = totalCost - discountAmount;

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

export default router;
