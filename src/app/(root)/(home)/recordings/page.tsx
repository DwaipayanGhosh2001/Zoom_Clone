import CallList from '@/components/callList'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Recordings",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};
function Recordings() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='font-bold text-2xl'>Recorded Meetings</h1>
      <div>
        <CallList type='recordings'/>
      </div>
    </section>
  )
}

export default Recordings