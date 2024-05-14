"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";


function PersonalRoomPage() {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const router = useRouter();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}`;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if(!client || !user) return ;
    if(!call){
      const newCall = client.call('default',meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const Table = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <div className="flex flex-col gap-2 lg:gap-8 lg:flex-row">
        <h1 className="font-medium   text-sky-1 text-lg lg:min-w-32">
          {title}
        </h1>
        <h2 className="truncate text-base max:sm:max-w-[320px] ">
          {description}
        </h2>
      </div>
    );
  };
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="font-bold text-2xl"> Personal Room</h1>
      <div className="flex flex-col w-full lg:max-w[900px] gap-8">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting Id" description={`${meetingId!}`} />
        <Table title="Invitation Link" description={`${meetingLink!}`} />
      </div>
      <div className="flex gap-5">
        <Button onClick={startRoom} className="bg-blue-1 px-4 py-2 rounded-lg">
          Start Meeting
        </Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied to clipboard");
          }}
          className="bg-dark-3 px-4 py-2 rounded-lg"
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
}

export default PersonalRoomPage;
