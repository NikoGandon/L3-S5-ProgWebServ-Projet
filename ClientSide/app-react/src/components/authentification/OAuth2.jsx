import React, { } from "react";
import { GoogleLogin } from "@react-oauth/google";

/**
 * @desc Bouton OAuth2 de google
 */

export default function OAuth2() {

  const onSuccess = (response) => {
    console.log(response);
  };

  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <GoogleLogin>
      clientId="683358252215-to6amlqd2qgr0rvq1629fn2g447luq2q.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      redirectUri="http://localhost:3000/auth"
    </GoogleLogin>
  );
}
