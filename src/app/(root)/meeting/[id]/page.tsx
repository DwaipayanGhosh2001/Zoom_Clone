"use client";
import Loader from "@/components/loader";
import MeetingRoom from "@/components/meetingRoom";
import MeetingSetup from "@/components/meetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

function Meeting({ params : {id} }: { params: { id: string } }) {
  const { user, isLoaded } = useUser();
  const {call, isCallLoading} = useGetCallById(id);
  const [setupComplete, setSetupComplete] = useState(false);

  if(!isLoaded || isCallLoading) return <Loader/>;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!setupComplete ? <MeetingSetup setSetupComplete={setSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
}

export default Meeting;
