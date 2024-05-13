import CallList from '@/components/callList'
import React from 'react'

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