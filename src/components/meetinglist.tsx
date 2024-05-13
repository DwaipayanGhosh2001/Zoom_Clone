"use client";

import React, { useState } from "react";
import HomePageCard from "./homeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./meetingModal";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import ReactDatePicker from "react-datepicker";
import { Input } from "@/components/ui/input"


function MeetingList() {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    | "isScheduleMeeting"
    | "isJoiningMeeting"
    | "isInstantMeeting"
    | undefined
  >();
  // Creating the state for the meeting type and adding exact type using typeScript.
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [meetingValues, setMeetingValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!meetingValues.dateTime) {
        toast.error("Please provide a date and time");
        return;
      }
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);
      const startsAt =
        meetingValues.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      const description = meetingValues.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);
      if (!meetingValues.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success("Meeting Created!");
    } catch (error) {
      console.log(error);
      toast.error("Call creation failed");
      throw new Error("Call creation failed");
    }
  };
  // Creating the meeting link for the scheduled meeting
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <section className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Passing the image, title, description, function on Click and color of the box. These properties will
        be used by the HomePageCard component  */}
      <HomePageCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        desc="Start a instant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        color="bg-orange-1"
      />
      <HomePageCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        desc="Via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        color="bg-blue-1"
      />
      <HomePageCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        desc="Plan your meetings"
        handleClick={() => setMeetingState("isScheduleMeeting")}
        color="bg-violet-1"
      />
      <HomePageCard
        img="/icons/recordings.svg"
        title="View Recordings"
        desc="You recorded meetings"
        handleClick={() => router.push("recordings")}
        color="bg-yellow-1"
      />

      {!callDetails ? (
        // This modal will take the description and date and time to create the upcoming meeting. The body of the modal is passed as a children
        // to the created meetingModal component
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Create Meeting"
          buttonText="Schedule Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-1 text-base font-normal flex flex-col gap-3">
              Add Meeting Description
              <Textarea
                onChange={(e) => {
                  setMeetingValues({
                    ...meetingValues,
                    description: e.target.value,
                  });
                }}
                className="bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full rounded-lg"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-sky-1 text-base font-normal flex flex-col gap-3">
              Select Date and Time
              <ReactDatePicker
                selected={meetingValues.dateTime}
                onChange={(date) =>
                  setMeetingValues({ ...meetingValues, dateTime: date! })
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </label>
          </div>
        </MeetingModal>
      ) : (
        //This modal will oepn up when we have a meeting scheduled giving the meeting link
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title="Meeting Scheduled"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied!");
          }}
        >
          {" "}
        </MeetingModal>
      )}

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start Instant Meeting"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Paste the Meeting Link"
        buttonText="Join Meeting"
        handleClick={() => router.push(meetingValues.link)}
      >
        <Input
          type="text"
          placeholder="Meeting link"
          onChange={(e) => setMeetingValues({ ...meetingValues, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
    </section>
  );
}

export default MeetingList;
