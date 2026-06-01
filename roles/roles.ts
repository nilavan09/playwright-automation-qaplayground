import dotenv from "dotenv";


dotenv.config();

export const adminusername = process.env.FULL_ACCESS_USER_NAME || "";
export const adminpassword = process.env.FULL_ACCESS_PASSWORD || "";

export const readonlyusername = process.env.READ_ONLY_USER_NAME || "";
export const readonlypassword = process.env.READ_ONLY_PASSWORD || "";