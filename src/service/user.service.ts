import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { getCurrentData } from "../data/getCurrentData";
import { IUser } from "../model";
import {
  API_URL,
  idError,
  existUserError,
  requestError,
  dataError,
} from "../constant";
import { getUrlIdParam, parseData } from "../utils/parseData";
import { parseResponse } from "../utils/response";
import { createUsers } from "../data/createUser";
import { generateUserID } from "../utils/userId";
import { isReqDataValid } from "../utils/isReqDataValid";

export class UserService {
  public getData = async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => {
    const idParam = getUrlIdParam(req.url!);
    const currentData = await getCurrentData();

    if (req.url === API_URL) {
      parseResponse(200, currentData, res);
    } else if (req.url?.startsWith(API_URL) && idParam) {
      const filteredData = currentData.filter(
        (user: IUser) => user.id === idParam
      );
      if (!validate(idParam)) {
        parseResponse(400, idError, res);
      } else if (filteredData.length > 0) {
        parseResponse(200, filteredData, res);
      } else {
        parseResponse(404, existUserError, res);
      }
    } else {
      parseResponse(404, requestError, res);
    }
  };

  public postRequest = async (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
  ) => {
    try {
      if (req.url === API_URL) {
        const userData: any = await parseData(req);
        if (isReqDataValid(userData)) {
          userData.id = generateUserID();
          createUsers(userData);
          parseResponse(200, userData, res);
        } else {
          parseResponse(404, dataError, res);
        }
      } else {
        parseResponse(404, requestError, res);
      }
    } catch {
      throw new Error();
    }
  };
}
