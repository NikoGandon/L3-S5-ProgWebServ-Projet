import React, { useEffect } from "react";
import axios from "../../utils/axiosConf";

const MessagePrv = ({ IDMP }) => {

  useEffect(() => {
    axios
      .get("https://localhost:3000/MP/", {
        params: {
          id: IDMP,
        },
      })
      .then((res) => {});
  }, []);

  return (
    <>
      <h1>MessagePrv</h1>
    </>
  );
};

export default MessagePrv;
