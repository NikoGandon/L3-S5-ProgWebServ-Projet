import React from "react";
import PopUp from "../pop-up/pop-up.model"
import axios from "../../utils/axiosConf"

const Profil = () => {
  const [users, setUser] = useState();
  const [profilSelectionne, setProfilSelectionne] = useState(null);
  const [estAmi, setEstAmi,groupeExiste, setGroupeExiste] = useState(false);
  useEffect(() => {
    getFriend(userId)
      .then((estAmi) => setEstAmi(estAmi))
      .catch((error) => console.error('Erreur lors de la vérification de l\'ami : ', error)); [userId, getFriend];

      const groupesFiltres = chatGroups.filter(groupeId => groupeId.MembreGroupe.length === 2);
      setGroupesDeuxUtilisateurs(groupesFiltres); [chatGroups];
    
    
    axios.get('https://localhost:3000/serveur/')
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des utilisateurs : ', error));
  }, []);
  /*const handleCloseProfil = () => {
    setProfilSelec(null);
  };*/
  const testAjouterAmi = () => {
    if (!estAmi) {
      addFriend(userId)
        .then(() => setEstAmi(true))
        .catch((error) => console.error('Erreur lors de l\'ajout d\'ami : ', error));
    }
  };
  const TestEnvoyerMessage = (groupeId) => {
    // Redirection vers la page de discussion du groupe avec l'ID groupeId
    window.location.href = `/discussion/${groupeId}`;
  };
    return (
    <PopUp>
      <h1>Profil : {User.username}</h1>
      <div className="userinfo">
      {//ProfilSelec && (<Popup utilisateur={ProfilSelec} onClose={handleCloseProfil} />)}}
}
        <p> {User.lienPP}</p>
        <p>Date d'inscription : {User.createdAt}</p>
        <p>Bio : {User.Bio}</p>
        {estAmi ? (
         <button disabled>Déjà Ami</button>) :(<button onClick={testAjouterAmi}>Ajouter en ami</button>)}
         <button onClick={() => TestEnvoyerMessage(groupeId)}>Envoyer un message</button>
        
      </div>
    </PopUp>
  );
};
//axios.get/post/Delete (link api), data(Userid) 'https://localhost:3000/serveur/'
export default Profil;
