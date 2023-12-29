import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosConf";

/**
 * @desc Affiche tous les Groupes et MP dont l'utilisateur est membre
 *       trié par ordre chronologique
 */
const BarreLatHome = () => {
  // TODO : Récupérer les MP dont l'utilisateur est membre
  // TODO : Trier par ordre chronologique
  const [groupesMembre, setGroupesMembre] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:3000/user/get-groupes").then((res) => {
      console.log(res);
      setGroupesMembre(res.data.Groupes);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <div className="barreLatHome">
        <div className="box_mp">
          {groupesMembre.length > 0
            ? groupesMembre.map((groupe) => (
                <button className="btn_find_groupe">
                  <div className="div_find_groupe">
                    <img className="icon_mp" src="../../../images/singe.jpg" />
                    <div className="name_mp_box">
                      <p className="name_mp">{groupe.nom}</p>
                      <p className="name_mp">{groupe.nbMembres} membres</p>
                    </div>
                  </div>
                </button>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default BarreLatHome;
