import { InstanceService } from "../services/InstanceService.js";
import { GameService } from "../services/GameService.js";

export class InstanceView{
    constructor(){}

    deleteInstanceChoice(){
        const body = document.getElementsByTagName("body")[0];
        body.removeChild(document.getElementById("createInstanceButton"));
        body.removeChild(document.getElementById("joinInstanceButton"));
        body.removeChild(document.getElementById("codeInstanceInput"));
    }

    createMenu(){
        const body = document.getElementsByTagName("body")[0];
        const role = document.createElement("h3");
        role.innerHTML = "Rôle : " + sessionStorage.getItem("role");
        role.id = "role";
        body.appendChild(role);

        if(sessionStorage.getItem("player") === "player1"){
            const changeRole = document.createElement("button");
            changeRole.id = "changeRoles";
            changeRole.textContent = "Echanger les rôles";
            changeRole.addEventListener("click", async () => {
                await InstanceService.changeRoles(sessionStorage.getItem("code"));
            });
            const play = document.createElement("button");
            play.id = "play";
            play.textContent = "Lancer une partie";
            play.addEventListener("click", async () => {
                await GameService.createGame(sessionStorage.getItem("code"));
                this.deleteMenu();
            });

            body.appendChild(changeRole);
            body.appendChild(play);
        }
    }

    updateMenu(){
        const role = document.getElementById("role");
        role.innerHTML = "Rôle : " + sessionStorage.getItem("role");
    }

    deleteMenu(){
        const body = document.getElementsByTagName("body")[0];
        if(sessionStorage.getItem("player") === "player1"){
            body.removeChild(document.getElementById("changeRoles"));
            body.removeChild(document.getElementById("play"));
        }        
    }
}