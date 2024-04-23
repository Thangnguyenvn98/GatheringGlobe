import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterUser } from "@/services/api";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormData } from "@/types/signInFormData";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const handleRegistration: SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data);
      RegisterUser(data);
      navigate("/");
      toast.success("Registration Success");
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? error.response?.data.message
          : "Register failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRegistration)}>
      <Card>
        <CardHeader>
          <CardTitle>New user?</CardTitle>
          <CardDescription>
            Join us to unlock exclusive features now
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Enter your email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Enter your username</Label>
            <Input
              id="username"
              type="text"
              {...register("username", {
                required: "This field is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters",
                },
              })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">Enter your password</Label>
            <Input
              id="current"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Confirm your password</Label>
            <Input
              id="new"
              type="password"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required";
                  } else if (watch("password") !== val) {
                    return "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Sign Up</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Register;
