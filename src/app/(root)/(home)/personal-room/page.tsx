import React from 'react'
import PersonalRoomPage from './personalRoompage'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Personal Room",
  description: "Video Calling Web Application",
  icons:{
    icon:"/icons/logo.svg"
  }
};

function PersonalRoom() {
  return (
    <PersonalRoomPage />
  )
}

export default PersonalRoom