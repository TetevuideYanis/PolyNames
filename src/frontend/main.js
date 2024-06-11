import { InstanceService } from "./services/InstanceService.js";
import { SSEClient } from "./libs/sse-client.js";

async function run(){
    const sseClient = new SSEClient("localhost:8080");
    sseClient.connect();

    const createInstanceButton = document.getElementById("createInstanceButton");
    const joinInstanceButton = document.getElementById("joinInstanceButton");
    const codeInstanceInput = document.getElementById("codeInstanceInput");

    createInstanceButton.addEventListener("click", async () => {
        const code = await InstanceService.createInstance();
        localStorage.setItem("code", code);
        localStorage.setItem("player", "operateur")
    });
    //sseClient.subscribe("bids", pview.updateBid);
}

run();