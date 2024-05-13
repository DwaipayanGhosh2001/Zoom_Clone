//this is a server side implementation of the video stream function. 
// We will create the stream user and token from the server side.

"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const TokenProvider = async () => {
    // the current logged in user details is taken from clerk currentUser hook
    const user = await currentUser();
    // conditions to throw exception
    if (!user) throw new Error("User is not logged in");
    if (!apiKey) throw new Error("Stream Api Key is not available");
    if (!apiSecret) throw new Error("Stream Api Secret is not available");

    // A new server side StreamClient is generated.
    const client = new StreamClient(apiKey, apiSecret);
    // The expiry time of the Client which is for 1 hour.
    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
    // the issued time of the token.
    const issued = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issued);
    return token;
}
