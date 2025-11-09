import { IUser } from "../model";

export const isReqDataValid = (data: IUser): boolean => {
  const checkKeys: Array<keyof IUser> = ["username", "age", "hobbies"];
  return (
    checkKeys.every((item) => Boolean(data[item])) &&
    Array.isArray(data.hobbies)
  );
};
