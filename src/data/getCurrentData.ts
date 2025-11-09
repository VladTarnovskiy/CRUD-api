import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { IUser } from "../model";

export const getCurrentData = async (): Promise<IUser[]> => {
  const path = join(dirname(fileURLToPath(import.meta.url)), "data.json");

  const fileContent = await readFile(path, { encoding: "utf8" });
  try {
    const data = JSON.parse(fileContent);
    return data;
  } catch (err) {
    throw err;
  }
};
