import { InstanceService } from "./services/InstanceService.js";
import { InstanceView } from "./views/InstanceView.js";
import { SSEClient } from "./libs/sse-client.js";
import { GameView } from "./views/GameView.js";

const instanceView = new InstanceView();
const gameView = new GameView();

async function run(){
    const sseClient = new SSEClient("localhost:8080");
    sseClient.connect();

    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");

    createInstanceButton.addEventListener("click", async () => {
        const code = await InstanceService.createInstance();
        sessionStorage.setItem("code", code);
        sessionStorage.setItem("player", "player1");
        sessionStorage.setItem("role", "operateur");
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
            instanceView.deleteInstanceChoice();
            instanceView.createMenu();
            sseClient.subscribe("role"+code, changeRoles);
        }     
    });
}

function changeRoles(){
    if(sessionStorage.getItem("role") == "espion") sessionStorage.setItem("role", "operateur");
    else sessionStorage.setItem("role", "espion");
    instanceView.updateMenu();
}

run();