"use client";
import { TokenProvider } from "@/actions/stream.action";
import Loader from "@/components/loader";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  // here StreamVideoClient is the type provider for the Stream Video Client State

  const { user, isLoaded } = useUser();
  // This is a hook from the Next Clerk that provides the user info and if the user is currently loaded or not
  useEffect(() => {
    if (!user || !isLoaded) return;
    if (!apiKey) throw new Error("Stream API key is required");

    const client = new StreamVideoClient({
      apiKey: apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: TokenProvider
    });
    setVideoClient(client);
  }, [user, isLoaded]);

// until the videoClient is set up a loader will be displayed.
  if(!videoClient) return <Loader/>;

  return <StreamVideo client={videoClient}>
    {children}
  </StreamVideo>;
};

export default StreamVideoProvider;
