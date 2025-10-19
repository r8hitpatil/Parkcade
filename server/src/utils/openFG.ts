// import the SDK
import { OpenFgaClient } from "@openfga/sdk";

const FGA_API_URL = process.env.FGA_API_URL;
const FGA_STORE_ID = process.env.FGA_STORE_ID;
const FGA_MODEL_ID = process.env.FGA_MODEL_ID;

if (!FGA_API_URL || !FGA_STORE_ID || !FGA_MODEL_ID) {
  throw new Error('Missing required OpenFGA environment variables: FGA_API_URL, FGA_STORE_ID');
}

// Build config object conditionally
const clientConfig: any = {
  apiUrl: FGA_API_URL,
  storeId: FGA_STORE_ID,
  authorizationModelId : FGA_MODEL_ID
};

export const fgaClient = new OpenFgaClient(clientConfig);