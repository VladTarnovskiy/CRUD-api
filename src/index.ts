import * as dotenv from "dotenv";
import { createServer } from "http";
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = createServer((req, res) => {
  try {
    switch (req.method) {
      case "GET":
        break;
      case "POST":
        break;
      case "PUT":
        break;
      case "DELETE":
        break;
      default:
        break;
    }
  } catch {}
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

process.on("SIGINT", async () => {
  server.close(() => process.exit());
});
