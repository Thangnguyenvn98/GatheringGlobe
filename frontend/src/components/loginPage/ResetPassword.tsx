import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { resetPassword } from "../../services/api";
import { useState } from "react";

interface ResetPasswordProps {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id") || "";
  const token = searchParams.get("token") || "";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();
  const onSubmit: SubmitHandler<ResetPasswordProps> = async (data) => {
    setIsSubmitting(true);
    try {
      // Not set up to receive the token yet
      console.log("Sending request with:", userId, token, data.newPassword);
      const response = await resetPassword(userId, token, data.newPassword);
      response
        ? toast.success("Password Reset Success")
        : toast.error("Reset Failed");
    } catch (e) {
      const errorMessage =
        e instanceof AxiosError ? e.response?.data.message : "Fail to reset";
      toast.error(errorMessage);
      console.error("Fail to reset:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="h-[450px]">
      <CardHeader className="mt-[1.9rem]">
        <CardTitle className="text-center">Reset Your Password</CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
              placeholder="Password"
            />
            {errors.newPassword && typeof errors.newPassword === "string" && (
              <div className="error">{errors.newPassword}</div>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required: "Required",
                validate: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (watch("newPassword") !== value) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />

            {errors.confirmPassword &&
              typeof errors.confirmPassword === "string" && (
                <div className="error">{errors.confirmPassword}</div>
              )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full mb-2 rounded-full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </CardFooter>
      </form>
      <div className="flex flex-col">
        <div className="text-gray-600"></div>
      </div>
    </Card>
  );
};
export default ResetPassword;
