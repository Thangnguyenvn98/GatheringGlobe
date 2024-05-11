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
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("users/forgetPassword", values)
        .then((response) => {
          toast.success("Email sent successfully");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast.error("Email not found");
          } else {
            toast.error("Server error");
          }
        });
    },
  });
  return (
    <Card className="h-[450px]  ">
      <CardHeader className="mt-[1.9rem]">
        <CardTitle className="text-center">
          Check your GatheringGlobe account
        </CardTitle>
        <CardDescription className="text-center">
          Discover, host, and buy event tickets with us
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">Enter your email</Label>
          <Input id="email" placeholder="Enter your email" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mb-2 rounded-full" type="submit">
          Send
        </Button>
      </CardFooter>
      <div className="flex flex-col">
        <div className="text-gray-600"></div>
      </div>
    </Card>
  );
};
export default ForgotPassword;
