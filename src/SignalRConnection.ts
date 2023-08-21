import * as signalR from "@microsoft/signalr";
const URL = "http://localhost:5160/Chat";
class Connector{
    private connection: signalR.HubConnection;
    static instance: Connector;
    events: (onMessageReceived: any) => void;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onMessageReceived: any) => {
            this.connection.on("GetChat", (message) => {
                onMessageReceived(message);
            });
        };
    }
    public getChat = (messages: string[]) => {
        this.connection.send("GetChat", messages).then(_ => console.log("Sent :D"))
    }
    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }

}
export default Connector.getInstance;