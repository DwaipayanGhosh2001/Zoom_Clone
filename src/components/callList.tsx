//@ts-nocheck
// This above line will avoid all typescript type errors
"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import MeetingCard from "./meetingCard";
import Loader from "./loader";
import toast from "react-hot-toast";
type CallType = "upcoming" | "ended" | "recordings";
function CallList({ type }: { type: CallType }) {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recorded, setRecorded] = useState<CallRecording[]>([]);
  const router = useRouter();

  const getCallData = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recorded;
      default:
        [];
    }
  };

  const getNoCallMessage = () => {
    switch (type) {
      case "upcoming":
        return "No Upcoming Meetings";
      case "ended":
        return "No Previous Meetings";
      case "recordings":
        return "No Recorded Meetings";
      default:
        "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );
        const recordings = data
          .filter((call) => call.recordings.length > 0) // this will filter out the recordings having length  > 0
          .flatMap((call) => call.recordings); // This will merge all the recordings in a single array

          setRecorded(recordings);
      } catch (error) {
        toast.error("Try again later!");
      }
    };
    if (type === "recordings") fetchData();
  }, [callRecordings, type]);

  const calls = getCallData();
  const noCallMessage = getNoCallMessage();

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            // Here meeting as Call means the meeting is of type Call
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 20) || //For upcoming and previous meeting
              meeting?.filename?.substring(0, 20) || //For recording
              "Personal Meeting"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              (meeting as CallRecording)?.start_time?.toLocaleString()
            }
            handleClick={
              type === "recordings"
                ? () => router.push(`${meeting.url}`)
                : () => router.push(`/meeting/${meeting.id}`)
            }
            buttonText={type === "upcoming" ? "Start" : "Play"}
            buttonIcon1={
              type === "recordings" ? "/icons/recordings.svg" : undefined
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            }
            isPreviousMeeting={type === "ended" ? true : false}
          />
        ))
      ) : (
        <>
          <div className="flex-center w-full flex-col gap-2">
            <h1 className=" text-2xl">{noCallMessage}</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default CallList;
