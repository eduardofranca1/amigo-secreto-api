import "dotenv/config";
import express from "express";
import cors from "cors";
import https from "https";
import http from "http";
import siteRoutes from "./routes/site";
import { requestIntercepter } from "./utils/requestIntercepter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// '*' = todas as requisições de todos os tipos entrando em todas as urls vão passar pelo requestIntercepter
app.all("*", requestIntercepter);

// app.use("/admin", adminRoutes);
app.use("/", siteRoutes);

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`server is running at ${port}`);
  });
};

const devServer = http.createServer(app);
if (process.env.NODE_ENV === "production") {
  // TODO: Configurar SSL
  // TODO: rodar server na 80 e na 443
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000;
  runServer(serverPort, devServer);
}
