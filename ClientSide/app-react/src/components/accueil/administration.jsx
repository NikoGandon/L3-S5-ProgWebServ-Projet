import React, { useState, useEffect } from "react";

import axios from "../../utils/axiosConf";

const debanUser = (id) => {
  axios.delete("https://localhost:3000/Administrateur/", {
    id: id,
  });
};

const AfficherBanni = ({ banni }) => {
  return (
    <>
      {banni.map((ban) => {
        return (
          <div key={ban.id}>
            <p>{ban.username}</p>
            <button>Unban</button>
          </div>
        );
      })}
    </>
  );
};

const AdminPanel = () => {
  const [banni, setBanni] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:3000/Administrateur/ban").then((res) => {
      setBanni(res.data);
    });
  }, []);

  return (
    banni.length > 0 ? AfficherBanni(banni) : <p> pas de banissement </p>
  )

};

export default AdminPanel;
