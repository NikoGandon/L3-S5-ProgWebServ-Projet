>[!info] 
>Les serveurs sont un regroupement d'utilisateurs, possède une hiérarchie et des permissions.
>Possède des salons textuels.

> [!info] Comment un utilisateur peut en rejoindre
> Un serveur possédera des codes d'accès contrôlables par l'administration du serveur.
> Ces codes peuvent être temporaires comme constant (dans le cas où un administrateur ne le supprime pas).
> Ces codes ne peuvent être créées que par l'administration.

# Les codes d'accès

> [!info] Comment les codes sont créés
> Un administrateur peut demander la génération d'un code d'accès depuis les paramètres du serveur.
> Les codes sont générés automatiquement.
> Les codes seront simple pour faciliter un utilisateur à transmettre le code et à l'utiliser.

> [!note] Les limites d'un code
> Un code peut être généré en ayant une limite, qu'elle soit de temps ou d'utilisation

> [!info] rejoindre depuis l'[[InterCenter]]
> Si le propriétaire du serveur consent, son serveur peut se retrouver dans la liste du programme InterCenter.
> Un unique code, sans limite, sera alors attribué à ce serveur.
> Le propriétaire du serveur peut, à tout moment, demander le retrait de son serveur du programme InterCenter. Le code sera alors supprimé et ne pointera plus vers le dit serveur.

# Les administrateurs

> [!info] Attribuer le rôle d'administrateur à un utilisateur
> Seul le propriétaire a la capacité d'attribuer le rôle à un utilisateur.
> Seul le propriétaire a la capacité de révoquer le rôle d'un utilisateur.
> Aucun administrateur n'aura le pouvoir de modifier la hiérarchie du serveur

> [!info] Les rôles d'un administrateur
> Un administrateur peut créer des salons, modérer les messages envoyés, bannir des utilisateurs.


# Les logs

>[!info] Les log d'un serveur
>Chaque serveur contient son fichier de log, consultable depuis les informations du serveur.
>Par défaut, seul le propriétaire peut y avoir accès, mais il peut en donner l'accès aux autres administrateurs depuis les paramètres du serveur.

> [!example] Que contient un fichier log
> Un fichier log contient :
> - La création des codes d'accès et par qui cela a été demandé.
> - La suppression des codes d'accès et par l'administrateur à l'origine de la suppression.
> - La suppression des messages de qui et par qui.
> - Le bannissement d'un utilisateur, la raison donnée et l'administrateur l'ayant fait.
> - L'accès au rôle d'administrateur.
> - La révocation du rôle d'administrateur.
> - La modification des paramètres du serveurs et par qui

Les données des fichiers log sont horodatés.

# La structure des serveurs

>[!note] Les salons
>Les salons sont des chaînes textuels, un serveur peut en avoir jusqu'à 50.
>Chaque salons à son nom (et son identifiant privé).
>

Par défaut, un salon 'main' est créée en même temps que le serveur.

>[!question] Blocage d'un salon
>- Un salon peut être bloqué pour tout utilisateur sauf le propriétaire.
>- Si le propriétaire le décide, il peut également bloquer un salon pour les administrateurs.
>- Si un salon est bloqué par un administrateur, les autres administrateurs pourront toujours y avoir accès y écrire.
>- Un salon peut être caché des utilisateurs si un administrateur le souhaite.
>- Un salon peut être caché de tous si le propriétaire le souhaite.

