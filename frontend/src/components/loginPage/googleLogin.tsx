import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
      className="w-80 h-8 text-white rounded mx-10 mb-3.5"
      type="button"
      onClick={() => auth()}
    >
      {/* <img className="btn-auth-img" src={googleButton} alt='google sign in'/> */}
      Sign in with Google
    </Button>
  );
}

export default GoogleLogin;
