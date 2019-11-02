import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import router from "./routes/router";

import bodyparser from 'body-parser';
import cors from 'cors';

const server = Server.instance;

//Body parser
server.app.use(bodyparser.urlencoded({extended:true}));
server.app.use(bodyparser.json());

//Cors
server.app.use(cors({origin:true, credentials:true}));


//rutas de servicios
server.app.use('/', router)

server.start(() => {
    console.log(`Servidor corriendo ${SERVER_PORT}`);
});