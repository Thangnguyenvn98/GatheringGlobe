import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState, useTransition, useRef, ElementRef } from "react";
import { editUserInfo } from "@/services/api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface BioModalProps {
  initialValue: string | null;
  hostName: string;
}

const BioModal = ({ initialValue, hostName }: BioModalProps) => {
  const [value, setValue] = useState(initialValue || "");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const closeRef = useRef<ElementRef<"button">>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      editUserInfo({ bio: value })
        .then(() => {
          toast.success("User bio updated");
          closeRef.current?.click();
          queryClient.invalidateQueries({ queryKey: ["user", hostName] });
        })
        .catch((error) => {
          console.error("Error updating user bio:", error);
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} size="sm" className="ml-auto text-white ">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <Textarea
            placeholder="User bio"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            disabled={isPending}
            className="resize-none"
          />
          <div className="flex justify-between">
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant={"ghost"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit" variant={"primary"}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BioModal;
