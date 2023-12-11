"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_router_1 = __importDefault(require("./authentification/routes/user.router"));
const port = 5000;
const startServer = async () => {
    try {
        const server = (0, fastify_1.default)();
        const errorHandler = (error, address) => {
            server.log.error(error, address);
        };
        server.register(user_router_1.default, { prefix: '/user' });
        await server.listen({ port }, errorHandler);
    }
    catch (e) {
        console.error(e);
    }
};
process.on('unhandledRejection', (e) => {
    console.error(e);
    process.exit(1);
});
startServer();
//# sourceMappingURL=index.js.map