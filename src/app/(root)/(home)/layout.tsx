//This file will hold the layout for the pages inside the Home folder.
// The Home page will have a sidebar as well as a top bar that will not be in the meeting page so a different layout for it. 

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'
export const metadata: Metadata = {
  title: "Yoom Calls",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};
function HomeLayout({children} : {children : ReactNode}) {
    //Here using TS the children type is defined as ReactNode.
  return (
    <main className='relative'>
        <Navbar/>

        <div className="flex">
          <Sidebar/> 
          <section className='flex flex-1 flex-col min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
            <div className="w-full text-white">
            {children}
            </div>
          </section>
        </div>
        
        Footer
    </main>
  )
}

export default HomeLayout