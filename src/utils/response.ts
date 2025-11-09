import { IncomingMessage, ServerResponse } from "http";
import { ErrorMessage, IUser } from "../model";

export const parseResponse = (
  statusCode: number,
  data: IUser[] | IUser | ErrorMessage,
  res: ServerResponse<IncomingMessage>
) => {
  res.writeHead(statusCode, {
    "Content-type": "application/json",
  });
  return res.end(JSON.stringify(data));
};
