import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IngressInput } from "@/types/IngressInput";
import { AlertTriangle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useState, useTransition, useRef, ElementRef } from "react";
import { fetchCreateIngress } from "@/services/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

interface ConnectModalProps {
  currentUser: User;
}

const ConnectModal = ({ currentUser }: ConnectModalProps) => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onSubmit = () => {
    startTransition(() => {
      fetchCreateIngress(parseInt(ingressType))
        .then(() => {
          toast.success("Ingress created");
          closeRef.current?.click();
          queryClient.invalidateQueries({
            queryKey: ["stream", currentUser._id],
          });
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Generate OBS connection</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate connection</DialogTitle>
        </DialogHeader>
        <Select
          disabled={isPending}
          value={ingressType}
          onValueChange={(value) => setIngressType(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ingress Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current
            connection
          </AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={closeRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={isPending}>
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectModal;
