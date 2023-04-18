import { Server } from "http";
import configKeys from "../../config";

const serverConfig = (server:Server) => {
    const startServer = () => {
        server.listen(configKeys.port, () => {
            console.log(`Server listening on Port ${configKeys.port}`);
        })
    }
    return {
        startServer
    }
}

export default serverConfig