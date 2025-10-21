// import the SDK
import { OpenFgaClient } from "@openfga/sdk";
import { env } from "./env";

// Build config object conditionally
const clientConfig: any = {
  apiUrl: env.FGA_API_URL,
  storeId: env.FGA_STORE_ID,
  authorizationModelId : env.FGA_MODEL_ID
};

export const fgaClient = new OpenFgaClient(clientConfig);