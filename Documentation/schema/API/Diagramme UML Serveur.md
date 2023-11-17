Généré sur [zenuml](https://app.zenuml.com)
# Diagramme du service User

```
@actor User
Site
API as "API/USER"
@Database DB as Database

User->Site."Veut consulter le site"{
  Site->API."GET/"{
    API->Site:"Interface du site"
  }
}

User->Site."Veut créer un compte"{
  Site->API."POST/USER/Signup"{
    API->DB:"INSERT"
    API->Site:"Interface du compte"
  }
}

User->Site."Veut se connecter"{
  Site->API."POST/USER/Login"{
    API->DB:"SELECT"
    API->Site:"Interface du compte"
  }
}

User->Site."Veut voir son compte"{
  Site->API."GET/USER"{
    API->DB:"SELECT"
    API->Site:"Affiche le profil de l'utilisateur"
  }
}

User->Site."Veut modifier son compte"{
  Site->API."PUT/USER/Compte"{
    API->DB:"UPDATE"
  }
}

User->Site."Veut modifier ses paramètres"{
  Site->API."PUT/USER/Param"{
    API->DB:"UPDATE"
  }
}

User->Site."Veut voir un compte"{
  Site->API."GET/USER/Search"{
    API->DB:"SELECT"
    API->Site:"Affiche le profil de l'utilisateur"
  }
}

User->Site."Veut bloquer un compte"{
  Site->API."POST/USER/Blocklist"{
    API->DB:"INSERT"
  }
}

User->Site."Veut débloquer un compte"{
  Site->API."DELETE/USER/Blocklist"{
    API->DB:"DELETE"
  }
}

User->Site."Veut ajouter en ami"{
  Site->API."POST/USER/Friend"{
    API->DB:"INSERT"
  }
}

User->Site."Veut enlever un ami"{
  Site->API."DELETE/USER/Friend"{
    API->DB:"DELETE"
  }
}
```

# Diagramme du service Serveur

```
@actor User
Site
API as "API/SERVER"
@Database DB as Database

User->Site."Veut voir le serveur"{
  Site->API."GET/SERVER/"{
    API->DB:"SELECT"
    API->Site:"Interface du serveur"
  }
}

User->Site."Veut créer un serveur"{
  Site->API."POST/SERVER/"{
    API->DB:"INSERT"
    DB->API:"Création du serveur"
    API->Site:"Interface du serveur"
  }
}

User->Site."Veut modifier son serveur"{
  Site->API."PUT/SERVER/"{
    API->DB:"UPDATE"
  }
}

User->Site."Veut supprimer son serveur"{
  Site->API."DELETE/SERVER"{
    API->DB:"DELETE"
  }
}

User->Site."Veut bannir un membre"{
  Site->API."POST/SERVER/Ban"{
	API->DB:"INSERT"
  }
}

User->Site."Veut débannir un membre"{
  Site->API."DELETE/SERVER/Ban"{
    API->DB:"DELETE"
  }
}

User->Site."Veut créer un salon"{
  Site->API."POST/SERVER/Salon"{
    API->DB:"INSERT"
  }
}

User->Site."Veut modifier un salon"{
  Site->API."PUT/SERVER/Salon"{
    API->DB:"UPDATE"
  }
}

User->Site."Veut supprimer un salon"{
  Site->API."DELETE/SERVER/Salon"{
    API->DB:"DELETE"
  }
}

User->Site."Veut enlever un membre"{
  Site->API."DELETE/SERVER"{
    API->DB:"DELETE"
  }
}

User->Site."Veut envoyer un message sur le serveur"{
  Site->API."POST/SERVER/Message"{
    API->DB:"INSERT"
  }
}

User->Site."Recoit des messages"{
  Site->API."GET/SERVER/Message"{
    API->DB:"SELECT"
  }
}

User->Site."Veut créer un code d'accès"{
  Site->API."GET/SERVER/Code"{
    API->DB:"INSERT"
    API->Site:"Renvoie le code"
  }
}

User->Site."Veut rejoindre un serveur"{
  Site->API."POST/SERVER/Join"{
    API->DB:"INSERT"
  }
}

User->Site."Veut se désinscrire d'un serveur"{
  Site->API."DELETE/SERVER/Unjoin"{
    API->DB:"DELETE"
  }
}
```

# Diagramme du service Groupe

```
@actor User
Site
API as "API/GROUP"
@Database DB as Database

User->Site."Veut créer un groupe"{
  Site->API."POST/GROUP/Create"{
    API->DB:"INSERT"
    API->Site:"Interface du groupe"
  }
}

User->Site."Veut modifier les paramètres"{
  Site->API."PUT/GROUP/Param"{
    API->DB:"UPDATE"
  }
}

User->Site."Veut ajouter un membre"{
  Site->API."POST/GROUP/Add"{
    API->DB:"INSERT"
  }
}

User->Site."Veut bannir un membre"{
  Site->API."DELETE/GROUP/Ban"{
    API->DB:"DELETE"
  }
}

User->Site."Veut envoyer un message"{
  Site->API."POST/GROUP/Message"{
    API->DB:"INSERT"
  }
}

User->Site."Veut supprimer un message"{
  Site->API."DELETE/GROUP/Message"{
    API->DB:"INSERT"
  }
}

User->Site."Recoit les messages"{
  Site->API."GET/GROUP/Message"{
    API->DB:"SELECT"
  }
}

User->Site."Veut se désinscrire"{
  Site->API."DELETE/GROUP/Unjoin"{
    API->DB:"DELETE"
  }
}
```

# Diagramme du service Message

```
@actor User
Site
API as "API/PrvMsg"
@Database DB as Database

User->Site."Veut envoyer un message"{
  Site->API."POST/PrvMsg"{
    API->DB:"INSERT"
  }
}

User->Site."Veut supprimer un message"{
  Site->API."DELETE/PrvMsg"{
    API->DB:"DELETE"
  }
}

User->Site."Recoit des messages"{
  Site->API."GET/PrvMsg"{
    API->DB:"SELECT"
  }
}
```

