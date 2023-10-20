const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8082 });
wss.broadcast = function(data) { wss.clients.forEach(client => client.send(data)); };
let i = 0;
wss.on("connection", (ws, req) => {
    if (req.headers.origin == 'https://nmgck847-80.asse.devtunnels.ms' || req.headers.origin == 'https://multiplayerpiano.net') {
        ws.on("message", data => {
            try {
                const ee = JSON.parse(data);
                if (ee.t == 'con') {
                    ws.send(`${data}`);
                } else if (ee.t == 'm') {
                    wss.broadcast(`${data}`);
                }
            } catch (e) {console.log(e)}
        });
    } else {
        ws.on("message", data => {
            try {
                const ee = JSON.parse(data);
                if (ee.secret == 'autoplayermewo') {
                    if (ee.t == 'con') {
                        ws.send(`${data}`);
                    } else if (ee.t == 'm') {
                        wss.broadcast(`${data}`);
                    }
                } else {
                    ws.close();
                }
            } catch (e) {console.log(e)}
        });
    }
});