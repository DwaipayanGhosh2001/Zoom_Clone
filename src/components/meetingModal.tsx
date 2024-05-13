//this is a dynamic model having conditional props that can be used in several cases.
import React, { ReactNode } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
  
interface MeetingModalProps{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    buttonText?: string;
    buttonIcon?: string;
    image?: string;
    children?:ReactNode;
    handleClick?: () => void;
    className?: string;
}
// The question marks are used for conditional porps that can be passed for different modal types
// The children can be used to add dynamic modal body

function MeetingModal({isOpen, onClose, title, buttonText, handleClick, buttonIcon, image, children, className} : MeetingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className='bg-dark-1 border-none p-6 w-full text-white '>
    <div className="flex flex-col gap-5">
    {image && (
        <div className='mx-auto'>
            <Image src={image} alt="image" width={72} height={72}/>
        </div>
    )}
    <h1 className={cn('text-2xl font-semibold text-center', className)}>{title}</h1>
        {children}
        <Button onClick={handleClick} className='bg-blue-1 text-lg w-80 px-10 mx-auto hover:bg-green-500 focus-visible:ring-0 focus-visible:ring-offset-0'>
            {buttonIcon && (
                 <Image src={buttonIcon} alt="button icon" width={13} height={13} className='me-2'/>
            )}
            {buttonText ? buttonText : 'Schedule Meeting'}
        </Button>
    </div>
  </DialogContent>
</Dialog>
  )
}

export default MeetingModal