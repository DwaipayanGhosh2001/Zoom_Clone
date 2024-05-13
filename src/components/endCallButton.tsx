"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function EndCallButton() {
    const router = useRouter();
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

    if(!isMeetingOwner) null;
  return (
    <Button onClick={async() => { await call?.endCall(); router.replace('/') }} className="bg-red-500 px-4 py-2">
        End Call for All
    </Button>
  )
}

export default EndCallButton;
