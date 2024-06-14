import { InstanceService } from "./services/InstanceService.js";
import { InstanceView } from "./views/InstanceView.js";
import { SSEClient } from "./libs/sse-client.js";
import { GameView } from "./views/GameView.js";

//initialisation des classes utilisées
const instanceView = new InstanceView();
const gameView = new GameView();
const sseClient = new SSEClient("localhost:8080");
sseClient.connect();

async function run(){  

    //création des boutons d'instances
    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");

    //click du bouton de création d'instance
    createInstanceButton.addEventListener("click", async () => {
        //demande au serveur
        const code = await InstanceService.createInstance();
        //on set les items dont on aura besoin
        sessionStorage.setItem("code", code);
        sessionStorage.setItem("player", "player1");
        sessionStorage.setItem("role", "operateur");
        sessionStorage.setItem("turn", "true");
        //on supprime le menu
        instanceView.deleteInstanceChoice();
        //on affiche le code
        instanceView.showCode(code);
        //on créé un autre menu pour la game
        instanceView.createMenu();
        //on s'abonne au canaux
        sseClient.subscribe("role"+code, changeRoles);
        sseClient.subscribe("gameCharged"+code, gameView.displayGame);
        sseClient.subscribe("endGame"+code, instanceView.createMenu);
    });

    //click du bouton joindre instance
    joinInstanceButton.addEventListener("click", async () => {
        const code = codeInstanceInput.value;
        const isCreated = await InstanceService.getInstance(code);
        if(isCreated){
            sessionStorage.setItem("code", code);
            sessionStorage.setItem("player", "player2");
            sessionStorage.setItem("role", "espion");
            sessionStorage.setItem("turn", "false");
            instanceView.deleteInstanceChoice();
            instanceView.showCode(code);
            instanceView.createMenu();
            sseClient.subscribe("role"+code, changeRoles);
            sseClient.subscribe("gameCharged"+code, gameView.displayGame);
            sseClient.subscribe("endGame"+code, instanceView.createMenu);
        }     
    });

    isConnectedToTurn();
}

//fonction qui change les roles
function changeRoles(){
    if(sessionStorage.getItem("role") == "espion"){
        sessionStorage.setItem("turn", "true");
        sessionStorage.setItem("role", "operateur");
    } 
    else{
        sessionStorage.setItem("turn", "false");
        sessionStorage.setItem("role", "espion");
    } 
    instanceView.updateMenu();
}

//fontion qui change le tour
function changeTurn(data){
    if(sessionStorage.getItem("turn") == "true") sessionStorage.setItem("turn", "false");
    else sessionStorage.setItem("turn", "true");
    gameView.updateTurn(data);
}

//fonction qui regarde si l'id de la game est initialisé afin de s'abonner aux canaux le nécessitant
function isConnectedToTurn(){
    if(sessionStorage.getItem("idGame") != null){
        if(sessionStorage.getItem("lastIdGame") == null || sessionStorage.getItem("lastIdGame") != sessionStorage.getItem("idGame")){
            sseClient.subscribe("turn"+sessionStorage.getItem("idGame"), changeTurn);
            sseClient.subscribe("gameChanged" + sessionStorage.getItem("idGame"), gameView.displayGame);
            sessionStorage.setItem("lastIdGame", sessionStorage.getItem("idGame"));
        }
        else{
            setTimeout(isConnectedToTurn, 1000);
        }
    }
    else{
        setTimeout(isConnectedToTurn, 1000);
    }
}

run();
