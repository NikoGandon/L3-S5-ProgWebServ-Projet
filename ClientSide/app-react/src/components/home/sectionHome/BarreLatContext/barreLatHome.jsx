import React, { useEffect, useState, useContext } from "react";
import axios from "../../../../utils/axiosConf";
import { UserContext } from "../../../../contexts/user.context";
import CreateGroupe from "../../../groupe/createGroupe";

/**
 * @desc Section d'un groupe
 * @returns
 */

const GroupeBox = ({ nomGroupe, idGroupe, handleClick, nbUser }) => {
  return (
    <div id="liste_groupe">

    <button
      className="btn_find_groupe"
      onClick={() => {
        handleClick("groupe", idGroupe);
      }}
    >
      <div className="div_find_groupe">
        <img className="icon_mp" src="../../../image/groupe.png" />
        <div className="name_mp_box">
          <p className="name_mp">{nomGroupe}</p>
          <p className="name_mp">{nbUser} membres</p>
        </div>
      </div>
    </button>
    </div>
  );
};

/**
 * @desc Affiche tous les Groupes et MP dont l'utilisateur est membre
 *       trié par ordre chronologique
 */
const BarreLatHome = ({ handleClick }) => {
  const { handleAmis,handleProfil } = useContext(UserContext);

  const [groupesMembre, setGroupesMembre] = useState([]);
  const ajouterGroupe = () => {
    axios
      .get("https://localhost:3000/user/get-DM")
      .then((res) => {
        setGroupesMembre(res.data.Groupes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    ajouterGroupe();
  }, []);

  return (
    <>
      <div className="barreLatHome" >

        <button id="bouttonAmis" onClick={handleAmis}>
          <img src="../../public/image/amis.png" width="35px" height="35px"></img>
          <p id="textAmi">Amis</p>
         </button>

      <p id="conversation">Conversation</p>
      <div className="scroll-zone-groupes">
        <div className="box_mp">
          {groupesMembre && groupesMembre.length > 0 ? (
            groupesMembre.map((item) => (
              <GroupeBox
                key={item.id}
                nomGroupe={item.nomGroupe}
                idGroupe={item.id}
                nbUser={item.nbUser}
                handleClick={handleClick}
              />
            ))
          ) : (
            <p id="AucunMessage">Vous n'avez aucun message</p>
          )}
        </div>
          <div className="createGroupe">
            <CreateGroupe ajouterGroupe={ajouterGroupe} />
          </div>
          </div>


          <div id="divProfile" onClick={()=>{handleProfil()}}>
            <img src="../../public/image/amis.png" width="30px" height="30px"></img>
            Profile
        </div>


      </div>
    </>
  );
};

export default BarreLatHome;
