import CallList from '@/components/callList'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Upcoming Meetings",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};
function Upcoming() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='font-bold text-2xl'>Upcoming Meetings</h1>
      <div>
        <CallList type='upcoming'/>
      </div>
    </section>
  )
}

export default Upcoming