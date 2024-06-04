import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <Button asChild variant={"secondary"}>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
