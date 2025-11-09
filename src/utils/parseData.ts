import { IncomingMessage, ServerResponse } from "http";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const baseUrl = `http://localhost:${PORT}/`;

export const parseData = async (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          const parsedData = JSON.parse(body);
          resolve(parsedData);
        }
        resolve("");
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const getUrlIdParam = (url: string) => {
  const param = url.split("/");
  return param[3] && param.length === 4 ? param[3] : "";
};
