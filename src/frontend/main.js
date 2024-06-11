import { InstanceService } from "./services/InstanceService.js";
import { SSEClient } from "./libs/sse-client.js";

async function run(){
    const sseClient = new SSEClient("localhost:8080");
    sseClient.connect();

    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");

    createInstanceButton.addEventListener("click", async () => {
        const promise = InstanceService.createInstance();
        promise.then(function(data) {
            localStorage.setItem("code", data);            
        }).catch(function(error) {
            console.error('Erreur lors de la récupération des données : ', error);
        });
        const code = localStorage.getItem("code");
        const promise2 = await InstanceService.incrementPlayerNumber(code);
        console.log(promise2);
    });
    //sseClient.subscribe("bids", pview.updateBid);
}

run();