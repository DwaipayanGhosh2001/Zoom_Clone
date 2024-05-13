"use client";
import React from 'react'
import Image from 'next/image';

interface HomeCardProps {
    img: string;
    color: string;
    title: string;
    desc: string;
    handleClick: () => void;
}
//defining the type of each props passed from the Meeting List compoenent
function HomePageCard({img, title, desc, handleClick, color} : HomeCardProps) {
  return (
<div onClick={handleClick} className={` rounded-lg p-5 flex flex-col justify-between 
        w-full cursor-pointer min-h-[200px] ${color}`}>
            <div className='glassmorphism w-fit p-4 rounded-lg'>
                <Image src={img} width={24} height={24} alt="New Meeting"/>
            </div>
            <div>
                <h2 className=' text-xl text-semibold'>{title}</h2>
                <p className='font-normal text-[16px]'>{desc}</p>
            </div>
        </div>
  )
}

export default HomePageCard