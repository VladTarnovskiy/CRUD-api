import * as dotenv from "dotenv";
import { createServer } from "http";
import { UserService } from "./service/user.service";
import { API_URL, requestError, serverError } from "./constant";
import { parseResponse } from "./utils/response";

dotenv.config();

const PORT = process.env.PORT || 3000;
const userService = new UserService();
const server = createServer((req, res) => {
  if (req.url?.startsWith(API_URL)) {
    try {
      switch (req.method) {
        case "GET":
          userService.getData(req, res);
          break;
        case "POST":
          userService.postRequest(req, res);
          break;
        case "PUT":
          userService.putRequest(req, res);
          break;
        case "DELETE":
          userService.deleteRequest(req, res);
          break;
        default:
          break;
      }
    } catch {
      parseResponse(500, serverError, res);
    }
  } else {
    parseResponse(404, requestError, res);
  }
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

process.on("SIGINT", async () => {
  server.close(() => process.exit());
});
