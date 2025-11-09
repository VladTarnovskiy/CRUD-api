import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getCurrentData } from "./getCurrentData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const deleteUser = async (userId: string) => {
  try {
    const currentData = await getCurrentData();
    const updatedUsers = currentData.filter((user) => user.id !== userId);
    const path = join(__dirname, "data.json");
    await writeFile(path, JSON.stringify(updatedUsers));
  } catch (err) {
    throw new Error();
  }
};
