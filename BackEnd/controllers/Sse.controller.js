import { addClient, removeClient } from "../utils/sseManager.js";

export const sseConnect = (req, reply) => {
    const { email, role } = req.user;
    const res = reply.raw;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();
    res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
    addClient(email, res, role);
    req.raw.on("close", () => {
        removeClient(email);
    });
};