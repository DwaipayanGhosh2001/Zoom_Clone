"use client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function MeetingSetup({
  setSetupComplete,
}: {
  setSetupComplete: (value: boolean) => void; //Here the value: boolean is given as it has a default value of boolean type
}) {
  const [isMicCamOn, setIsMicCamOn] = useState(false);
  // the useCall hook can be used to gte the details of the call.
  // This can only be used under the StreamCall component.
  const call = useCall();
  if (!call) throw new Error("Use call must be used with StreamCall");
  useEffect(() => {
    if (isMicCamOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
    // creating the toogle for mic and camera on and off together
  }, [isMicCamOn, call?.camera, call?.microphone]);
  return (
    <div className="flex-center text-white flex-col h-screen w-full max-w-[700px] mx-auto px-4">
      <h1 className="text-2xl pb-10">Meeting Setup</h1>
      <VideoPreview />
      <div className="flex-center gap-5 h-16">
        <label className="flex gap-4">
          <input
            type="checkbox"
            checked={isMicCamOn}
            onChange={(e) => setIsMicCamOn(e.target.checked)}
          />
          Join Meeting with Mic and Camera Off
        </label>
        <DeviceSettings />
      </div>
      
      {/* The button will join the stream call and will change the setupComplete state to true as it is passed through prop */}
      <Button
        onClick={() => {
          call.join();
          setSetupComplete(true);
        }}
        className="bg-green-500 rounded-lg px-5 py-2 hover:bg-blue-1"
      >
        Join Meeting
      </Button>
    </div>
  );
}

export default MeetingSetup;
