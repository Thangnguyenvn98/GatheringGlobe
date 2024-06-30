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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await SignInUser(data);
      const redirectTo = location.state?.from || "/";
      console.log(redirectTo);
      console.log("Redirecting to: ", location);
      navigate(redirectTo);
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
      <Card className="h-[450px]  ">
        <CardHeader className="mt-[1.9rem]">
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
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button className="w-72 mb-2 rounded-full" type="submit">
            Sign in
          </Button>
        </CardFooter>
        <div className="justify-center ml-4">
          <Button
            className="w-72 h-8 bg-red-600 text-white rounded-full mx-10 mb-2"
            type="submit"
          >
            Sign in with Google
          </Button>
          <div className="text-gray-600">
            <p className=" flex justify-center underline">
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
          </div>
        </div>
      </Card>
    </form>
  );
};
export default Login;
