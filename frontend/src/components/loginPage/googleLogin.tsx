import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin() {
  const navigate = useNavigate();

  function navigateSelf(url: string) {
    window.location.href = url;
    console.log(url);
    navigate(url);
  }
  async function auth() {
    console.log("auth entered");
    const response = await fetch("http://127.0.0.1:5050/api/request", {
      method: "post",
    });
    const data = await response.json();
    console.log(data);
    navigateSelf(data.url);
  }
  return (
    <Button
      className="w-[240px] h-8 text-black mb-4 bg-white shadow-md hover:bg-transparent flex items-center"
      type="button"
      onClick={() => auth()}
    >
      <FcGoogle className="mr-2 w-6 h-6" />
      Sign in with Google
    </Button>
  );
}

export default GoogleLogin;
