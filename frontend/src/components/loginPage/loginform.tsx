import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInUser } from "@/services/api";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData } from "@/types/signInFormData";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data);
      await SignInUser(data);
      navigate("/");
      toast.success("Login Success");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Login failed";
      toast.error(errorMessage);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Sign in to GatheringGlobe
          </CardTitle>
          <CardDescription className="text-center">
            Discover, host, and buy event tickets with us
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full mb-2 rounded-full" type="submit">
            Sign in
          </Button>
        </CardFooter>
        <div className="flex flex-col">
          <Button
            className="w-80 h-8 bg-red-600 text-white rounded mx-10 mb-3.5"
            type="submit"
          >
            Sign in with Google
          </Button>
        </div>
      </Card>
    </form>
  );
};
export default Login;
