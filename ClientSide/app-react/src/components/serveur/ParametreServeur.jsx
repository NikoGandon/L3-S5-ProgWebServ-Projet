import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosConf";
import AddFriend from "../user/ajoutAmi";

const Amis = () => {
    const [amis, setAmi] = useState([]);

  const ajouterAmi = () => {
    axios
      .get("https://localhost:3000/User/friend")
      .then((res) => {
        setAmi(res.data.amis);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterAmi();
  }, []);

  return (
    <>
    
    </>
  );
};

export default Amis;