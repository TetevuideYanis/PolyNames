export class CardService{
    static async findAll()
    {
        let data = null;
        const response = await fetch("http://localhost:8080/cardController");
        if(response.status === 200)
        {
            data = await response.json();
        }
        return data;
    }
}