import React, { useEffect } from "react";
import Cookie from "universal-cookie";
export default function LoginSuccess() {
  useEffect(() => {
    const cookies = new Cookie();
    const authToken = cookies.get("authToken");

    cookies.set("authToken", authToken);

    console.log("Token JWT:", authToken);

    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return <div>Connecté</div>;
}
