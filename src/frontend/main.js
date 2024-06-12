import { InstanceService } from "./services/InstanceService.js";
import { InstanceView } from "./views/InstanceView.js";
import { SSEClient } from "./libs/sse-client.js";
import { GameView } from "./views/GameView.js";

const instanceView = new InstanceView();
const gameView = new GameView();
const sseClient = new SSEClient("localhost:8080");
sseClient.connect();

async function run(){  

    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");

    createInstanceButton.addEventListener("click", async () => {
        const code = await InstanceService.createInstance();
        sessionStorage.setItem("code", code);
        sessionStorage.setItem("player", "player1");
        sessionStorage.setItem("role", "operateur");
        sessionStorage.setItem("turn", "true");
        instanceView.deleteInstanceChoice();
        instanceView.createMenu();
        sseClient.subscribe("role"+code, changeRoles);
        sseClient.subscribe("gameChanged"+code, gameView.displayGame);
    });

    joinInstanceButton.addEventListener("click", async () => {
        const code = codeInstanceInput.value;
        const isCreated = await InstanceService.getInstance(code);
        if(isCreated){
            sessionStorage.setItem("code", code);
            sessionStorage.setItem("player", "player2");
            sessionStorage.setItem("role", "espion");
            sessionStorage.setItem("turn", "false");
            instanceView.deleteInstanceChoice();
            instanceView.createMenu();
            sseClient.subscribe("role"+code, changeRoles);
            sseClient.subscribe("gameChanged"+code, gameView.displayGame);
        }     
    });

    isConnectedToTurn();
}

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

function changeTurn(data){
    if(sessionStorage.getItem("turn") == "true") sessionStorage.setItem("turn", "false");
    else sessionStorage.setItem("turn", "true");
    gameView.updateTurn(data);
}

function isConnectedToTurn(){
    if(sessionStorage.getItem("idGame") != null){
        if(sessionStorage.getItem("lastIdGame") == null || sessionStorage.getItem("lastIdGame") != sessionStorage.getItem("idGame")){
            sseClient.subscribe("turn"+sessionStorage.getItem("idGame"), changeTurn);
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