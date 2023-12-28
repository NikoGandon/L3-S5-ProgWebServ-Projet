import React, { useEffect, useState } from "react";
import "./groupe.css";

import axios from "../../utils/axiosConf";

const Groupe = () => {

  const [groupe, setGroupe] = useState();

  useEffect(() => {
    axios.get("https://localhost:3000/user/get-groupes").then((res) => {
      console.log(res);
      setGroupe(res.data.groupes);
    });
  }, []);

  return (
    <>
      <div className="container_grp">
        <div className="LeftSide">
        <button className="btn_base"><img className="icon_base" src="../../../images/porsche.jpg" /></button>
          <div className="barre"></div>
          <button className="btn_base"><img className="icon_base" src="../../../images/mp.png" /></button>
          <div className="barre"></div>
          <div className="box_serveur">
          </div>
        </div>
        <div className="mp-groupe">
          <input type="search" id="mp_search" placeholder="Recherche message ..."/>
          <button className="btn_groupe" type="button">Amis</button>
          <div className="barre2"></div>
          <button className="btn_groupe" type="button">Tout</button>
          <button className="btn_groupe" type="button">Privé</button>
          <button className="btn_groupe" type="button">Groupe</button>
          <div className="barre2"></div>
          <div className="box_mp">
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
            <button className="btn_find_groupe">
            <div className="div_find_groupe">
              <img className="icon_mp" src="../../../images/singe.jpg" />
              <div className="name_mp_box">
                <p className="name_mp">nom groupe</p>
                <p className="name_mp">5 membres</p>
              </div>
            </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Groupe;
