import React, { useEffect } from "react";
import Cookies from "universal-cookie";

export default function LoginSuccess() {
  useEffect(() => {
    const cookie = new Cookies();
    cookie.get("authToken");

    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>Connecté</div>;
}
