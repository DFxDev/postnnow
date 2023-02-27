import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import share from "../assets/share.mp4";
import postnowwhite from "../assets/postnowwhite.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { client } from "../clients";

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);

    localStorage.setItem("user", JSON.stringify(userObject));
    const { name, sub, picture } = userObject;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={share}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={postnowwhite} width="180px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            >
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className=""
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="" /> Sign in with google
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
