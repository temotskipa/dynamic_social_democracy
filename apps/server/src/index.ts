import Fastify from "fastify";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "node:url";

export function buildServer() {
  const app = Fastify({
    logger: true,
  });

  const io = new SocketIOServer(app.server, {
    cors: {
      origin: true,
    },
  });

  app.get("/health", async () => ({
    status: "ok",
    realtime: false,
  }));

  io.on("connection", (socket) => {
    socket.emit("server:ready", {
      realtime: false,
      connectedAt: new Date().toISOString(),
    });

    socket.on("session:join", (payload: { sessionId?: string } | undefined) => {
      if (!payload?.sessionId) {
        return;
      }

      socket.join(payload.sessionId);
      socket.emit("session:joined", {
        sessionId: payload.sessionId,
      });
    });
  });

  return { app, io };
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);

if (isDirectRun) {
  const port = Number(process.env.PORT ?? 3001);
  const { app } = buildServer();

  app.listen({
    host: "127.0.0.1",
    port,
  }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
