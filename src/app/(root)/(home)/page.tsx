import MeetingList from "@/components/meetinglist";
import Image from "next/image";
import React from "react";

function Home() {
  const nowdate = new Date();
  const time = nowdate.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'}); 
  const presentdate= (new Intl.DateTimeFormat('en-US', {dateStyle:"full"})).format(nowdate);
  return (
    <section className="size-full flex flex-col gap-10">
      <div className="h-[250px] w-full rounded-xl bg-hero bg-cover">
        {/* Here the bg-hero is a custom css class where the hero image is coming from tailwind config where image url is given 
      under backgroundImage object */}
        <div className="flex flex-col h-full py-8 px-4 lg:px-10 justify-between">
          <h2 className="glassmorphism w-fit px-4 lg:px-8 text-center text-base py-2 rounded-md">
            Upcoming Meeting at 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl lg:text-6xl">{time}</h1>
            <p className="text-lg font-semibold text-sky-1">{presentdate}</p>
          </div>
        </div>
      </div>
      <MeetingList />
    </section>
  );
}

export default Home;
