import { CardService } from "./services/CardService.js";

async function run(){
    const data = await CardService.findAll();
    console.log(data);
}

run();