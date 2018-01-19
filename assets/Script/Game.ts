

const {ccclass, property} = cc._decorator;

let ws: WebSocket;
let index = 0;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    pointer: cc.Node = null;

    @property
    seed: number = 0;

    rotation: number = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    start () {
        let self: any = this;
        ws = new WebSocket("ws://localhost:9080/test/websocket");
        ws.onopen = function (event) {
            console.log("连接上了啊啊啊.");
        };
        ws.onmessage = function(event) {
            self.onMessage(event);
        };
        ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
        };

        setTimeout(function () {
            if (ws.readyState === WebSocket.OPEN) {
                //ws.send("Hello WebSocket, I'm a text message.");
            }
            else {
                console.log("WebSocket instance wasn't ready...");
            }
        }, 3);
    }

    update (dt) {
        index++;
        //console.log(index);
        ws.send(index+"");
    }

    public onClick() {
        ws.send(this.seed+"");
    }

    /**
     * onMessage
     */
    public onMessage(event: MessageEvent) {
        this.rotation = parseInt(event.data);
        console.log(this.rotation);

        this.pointer.rotation = this.rotation;
    }
}
