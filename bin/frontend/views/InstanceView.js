import { InstanceService } from "../services/InstanceService.js";
import { GameService } from "../services/GameService.js";

export class InstanceView{
    constructor(){}

    //fonction qui supprime le menu d'instance
    deleteInstanceChoice(){
        const body = document.getElementsByTagName("body")[0];
        body.removeChild(document.getElementById("createInstanceButton"));
        body.removeChild(document.getElementById("joinInstanceButton"));
        body.removeChild(document.getElementById("codeInstanceInput"));
    }

    //fonction qui créé le menu de la game
    createMenu(){
        const body = document.getElementsByTagName("body")[0];
        //un titre pour voir le role
        let role = document.getElementById("role");
        if(role == null){
            role = document.createElement("h3");
            role.innerHTML = "Rôle : " + sessionStorage.getItem("role");
            role.id = "role";
            body.appendChild(role);
        }
        
        sessionStorage.setItem("nombreCartesBleues", 0);

        if(sessionStorage.getItem("player") === "player1"){
            //si le joueur est l'hote alors on lui met des boutons de controle de role et de jeu
            const changeRole = document.createElement("button");
            changeRole.id = "changeRoles";
            changeRole.textContent = "Echanger les rôles";
            changeRole.classList.add("button");
            changeRole.addEventListener("click", async () => {
                //si on clique sur le bouton alors on demande de changer les roles
                await InstanceService.changeRoles(sessionStorage.getItem("code"));
            });
            const play = document.createElement("button");
            play.id = "play";
            play.textContent = "Lancer une partie";
            play.classList.add("button");
            play.addEventListener("click", async () => {
                //si on clique sur le bouton alors on demande de créer une nouvelle partie
                await GameService.createGame(sessionStorage.getItem("code"));
                this.deleteMenu();
            });

            body.appendChild(changeRole);
            body.appendChild(play);
        }
    }

    //fonction qui met à jour les roles s'ils changent
    updateMenu(){
        const role = document.getElementById("role");
        role.innerHTML = "Rôle : " + sessionStorage.getItem("role");
    }

    //fonction qu supprime les boutons de partie
    deleteMenu(){
        const body = document.getElementsByTagName("body")[0];
        if(sessionStorage.getItem("player") === "player1"){
            body.removeChild(document.getElementById("changeRoles"));
            body.removeChild(document.getElementById("play"));
        }        
    }

    //fonction qui affiche le code dè lobby
    showCode(code){
        const codeTitle = document.createElement("h2");
        codeTitle.innerHTML = "Code : " + code;
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(codeTitle);
    }
}