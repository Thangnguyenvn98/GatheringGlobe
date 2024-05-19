import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";

export const OrderConfirmationModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const navigate = useNavigate();
  const { orderId } = data;

  const isModalOpen = isOpen && type === "orderConfirmation";
  const onClick = () => {
    navigate(`/your-account/order-details/${orderId}`);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 flex flex-col overflow-hidden items-center justify-center">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold self-center">
            <CircleCheck className="w-10 h-10" color="green" />
          </DialogTitle>
          <DialogDescription className="flex items-center flex-col space-y-6 text-zinc-500 p-4">
            <span className="font-bold text-lg"> Thank you for your order</span>
            <span>Your payment has been processed successfully.</span>
            <Button onClick={onClick}>View my orders</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
