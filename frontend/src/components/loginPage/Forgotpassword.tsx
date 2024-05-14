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
    onSubmit: (values, { setSubmitting, resetForm }) => {
      axios
        .post("/users/forgetPassword", values)
        .then(() => {
          // Assuming the backend sends some kind of response that you can use
          toast.success("Email sent successfully");
          resetForm(); // Optionally reset the form
          setSubmitting(false); // Set submitting to false
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              toast.error("Email not found");
            } else {
              // More specific messages can be based on the error response status or data
              toast.error("Server error");
            }
          } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response from server");
          } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("Error: " + error.message);
          }
          setSubmitting(false); // Set submitting to false
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
      <form onSubmit={formik.handleSubmit}>
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
      </form>
      <div className="flex flex-col">
        <div className="text-gray-600"></div>
      </div>
    </Card>
  );
};
export default ForgotPassword;
