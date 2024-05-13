import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./endCallButton";
import Loader from "./loader";

function MeetingRoom() {
  const router = useRouter();
    const searchParam = useSearchParams();
    const isPersonalRoom  = !!searchParam.get('personal');
    // The purpose of !! here is if its personal then the valriable will be false and then true. Vice versa for false.
  type CustomLayoutType = "grid" | " speaker-right" | "speaker-left";
  const [layout, setLayout] = useState<CustomLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);

  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();
    if(callingState !== CallingState.JOINED) return <Loader/>

  function CustomLayout() {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case " speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  }
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className={cn('mx-auto w-full max-w-[800px] ')}>
            <CustomLayout />
        </div>
        <div
          className={cn('h-[calc(100vh-86px)] hidden ml-4', {
            'block': showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        <div className="fixed flex-center gap-4 bottom-0 w-full flex-wrap mb-5 ">
          {" "}
          <CallControls onLeave={() => router.push('/')}/>
          <DropdownMenu>
            <DropdownMenuTrigger className=" hover:bg-[#4c535b] p-2 rounded-full ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white py-4 px-2 bg-dark-1 border-dark-1">
              {["Grid", "Speaker-left", "Speaker-right"].map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() =>
                    setLayout(item.toLowerCase() as CustomLayoutType)
                  }
                  className="hover:bg-[#4c535b]"
                >
                  {item}
                  <DropdownMenuSeparator className="border-dark-1 border-2" />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className=" hover:bg-[#4c535b] p-2 rounded-full ">
                <Users size={20} className="text-white"/>
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
}

export default MeetingRoom;
