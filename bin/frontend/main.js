import { InstanceService } from "./services/InstanceService.js";
import { SSEClient } from "./libs/sse-client.js";

async function run(){
    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");
    createInstanceButton.addEventListener("click", () => {
        const code = InstanceService.createInstance();
        code.then(function(data) {
            localStorage.setItem("code", data);
        }).catch(function(error) {
            console.error('Erreur lors de la récupération des données : ', error);
        });
    });

    const sseClient = new SSEClient("localhost:8080");
    sseClient.connect();
    //sseClient.subscribe("bids", pview.updateBid);
}

run();