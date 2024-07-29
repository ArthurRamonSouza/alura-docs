import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import "./dbConnect.js";

const app = express();
const port = process.env.PORT || 3000;

const currentPath = url.fileURLToPath(import.meta.url); // get current path
const publicDir = path.join(path.dirname(currentPath), "../public"); // get public directory path

app.use(express.static(publicDir)); // Use the public directory to serve static files

const httpServer = http.createServer(app); // Create a HTTP server

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const websocket = new Server(httpServer); // Create a websocket server

export default websocket;
