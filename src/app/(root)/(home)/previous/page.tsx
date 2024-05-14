import CallList from '@/components/callList'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Previous Meetings",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};
function Previous() {
  return (
    <section className='flex flex-col gap-10 size-full text-white'>
      <h1 className='font-bold text-2xl'>Previous Meetings</h1>
      <div>
        <CallList type='ended'/>
      </div>
    </section>
  )
}

export default Previous