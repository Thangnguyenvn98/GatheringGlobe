import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GatheringGlobe from "../../images/GatheringGlobe.png";

import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterUser } from "@/services/api";
import { SignInFormData } from "@/types/signInFormData";




const RegisterForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();
  const handleRegistration:SubmitHandler<SignInFormData> = async (data) => {
    try {
      console.log(data)
      RegisterUser(data);

      console.log("Registration sucessful");
    } catch (error) {
      console.error("Registartion failed", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: "#cce7c9" }}
    >
      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="flex flex-col w-[400px]">
          <img
            src={GatheringGlobe}
            alt="GatheringGlobe Logo"
            className="justify-items-start mx-28 "
            style={{ width: "200px", height: "190px" }}
          />
          <Tabs defaultValue="account" className="w-[400px] ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Log in</TabsTrigger>
              <TabsTrigger value="password">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
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
            </TabsContent>
            <TabsContent value="password">
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
                      {...register("email", { required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"}, })}
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
                      {...register("username", { required: "This field is required",
                      minLength: {
                        value: 4,
                        message: "Username must be at least 4 characters"}, })}
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
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </div>
  );
};
export { RegisterForm };
