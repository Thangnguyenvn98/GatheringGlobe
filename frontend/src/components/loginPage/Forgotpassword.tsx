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
import axios from "axios";
import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      await axios.post(
        "http://localhost:5050/api/authRoutes/forgetPassword",
        values,
      );
      toast.success("Email sent successfully");
      reset();
      // navigate("/reset-password");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("Email not found");
        } else {
          toast.error("Server error");
        }
      } else if (error.request) {
        toast.error("No response from server");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <Card className="h-[450px]">
      <CardHeader className="mt-[1.9rem]">
        <CardTitle className="text-center">
          Check your GatheringGlobe account
        </CardTitle>
        <CardDescription className="text-center">
          Discover, host, and buy event tickets with us
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Enter your email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full mb-2 rounded-full"
            type="submit"
            disabled={isSubmitting}
          >
            Send
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ForgotPassword;
