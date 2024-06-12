export class GameService{
    static async createGame(code) {
        let data = null;
        const response = await fetch("http://localhost:8080/createGame/"+code);
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }
}