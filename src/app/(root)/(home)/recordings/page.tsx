import CallList from '@/components/callList'
import React from 'react'

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