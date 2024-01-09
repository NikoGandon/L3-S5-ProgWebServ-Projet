// Bannir User
import React, { useState } from 'react';

const ExpulsionButton = ({ idUser }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const isUserAdmin = async (serverId, userId) => {
    await axios
    .get("https://localhost:3000/serveur/", {
      params: {
        idServeur: contexteID,
      },
    })
      return userData.roles.some((role) => role.serverId === serverId && role.isAdmin);
    }
    useEffect(() => {
        const checkAdminStatus = async () => {
          const isAdminUser = await isUserAdmin(serverId, userId);
          setIsAdmin(isAdminUser);
        };
        checkAdminStatus(); }, [serverId, userId]);

  const handleExpulsion = () => {
    BanMembre(idUser);
    console.log(`Utilisateur ${idUser} Banni`);
  }

  isUserAdmin();

  return (
    <div>
      {isAdmin && ( 
        <button onClick={handleExpulsion}>
          Bannir l'utilisateur {userId}
        </button>
      )}
    </div>
  );
  }

export  ExpulsionButton;

//Création Salon
import React, { useState } from 'react';

const CreateChannelButton = ({ CreateSalon }) => {
  const [newChannelName, setNewChannelName] = useState('');

  const handleInputChange = (event) => {
    setNewChannelName(event.target.value);
  };

  const handleCreateChannel = () => {
    // Appeler la fonction onCreateChannel avec le nom du nouveau salon
    CreateSalon(newChannelName);
    // Réinitialiser le champ de saisie après la création du salon
    setNewChannelName('');
  };

  return (
    <div>
      {isAdmin && (
        <button onClick={ handleCreateChannel}> Nouveau Salon </button>
        )} 

    </div>
        );
      }
    
export  CreateChannelButton;
// supp salon
import React from 'react';

const DeleteChannelButton = ({ idSalon, salon }) => {
  const handleDeleteChannel = () => {
    DeleteSalon(idSalon);
  };

  return (
    <div>
      {isAdmin && salon.map((salon) => (
        <DeleteChannelButton
          key={idSalon}
          salonName={salon}
          DeleteChannelButton={handleDeleteChannel}
        />
      ))}
    
    </div>
  );
};

export  DeleteChannelButton;