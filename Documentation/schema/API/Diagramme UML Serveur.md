Généré sur [zenuml](https://app.zenuml.com)

```
User
Site
API
Database

User->Site."Veut consulter le site"{
  Site->API.GET(Accueil){
    API->Site:Accueil du site 
  }
}

User->Site."Veut se connecter"{
  Site->API.POST(Login){
    API->Database:SELECT
    Database->API:Résultat
    API->Site:Accueil (utilisateur connecté)
  }
}

User->Site."Veut créer un compte"{
  Site->API.POST(Register){
    API->Database:INSERT
    Database->API:Résultat
    API->API:POST\LOGIN
    API->Site:Accueil (utilisateur connecté)
  }
}

User->Site:"Veut modifier son profil"{
  Site->API.PUT(UPDATE/User/Profil){
    API->Database:UPDATE
  }
}

User->Site:"Veut envoyer un message privée"
Site->API.POST(Private/Message/Send){
  API->Database:INSERT 
}

User->Site:"Reçoit un message privée"
{
  Site->API.GET(Private/Message/Receive){
    API->Database:SELECT
    Database->API:Résultat
    API->Site:Nouveau message
}
}

User->Site:"Veut créer un serveur"{
  Site->API.POST(Server/Create){
    API->Database:INSERT INTO
    Database->API:Création du serveur
    API->Site:Interface du serveur
  }
}

User->Site:"Veut modifier son serveur"{
  Site->API.PUT(Server/Param){
    API->Database:UPDATE
  }
}

User->Site:"Veut envoyer un message sur un serveur"{
  Site->API.POST(Server/Message/Send){
    API->Database:INSERT
  }
}

User->Site:"Recoit un message sur un serveur"{
  Site->API.GET(Server/Message/Receive){
    API->Database:SELECT
    Database->API:Resultat
    API->Site:Nouveau message
  }
}

User->Site:"Créer un code pour son serveur"{
  Site->API.GET(Server/CreateCode){
    API->Database:INSERT
    API->Site:Envoie le code généré
  }
}

User->Site:"Veut acceder à un serveur via code"{
  Site->API.POST(Server/Join){
    API->Database:INSERT
  }
}

User->Site:"Veut partir du serveur"{
  Site->API.DELETE(Server/Unjoin){
    API->Database:DELETE
  }
}

User->Site."Veut créer un groupe"{
  Site->API.POST(Group/Create){
    API->Database:INSERT
  }
}


User->Site."Veut envoyer un message dans un groupe"{
  Site->API.POST(Group/Send){
    API->Database:INSERT
  }
}

User->Site."Reçoit un message dans un groupe"{
  Site->API.GET(Group/Received){
    API->Database:SELECT
    Database->API:Resultat
    API->Site:Nouveau message
  }
}

User->Site."Veut quitter le groupe"{
  Site->API.DELETE(Group/Quit){
    API->Database:DELETE
  }
}

........
```
