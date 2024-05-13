import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignupPage() {
  return (
    <main className='h-screen flex-center w-full bg-dark-2'>
        <SignUp/>
    </main>
  )
}

export default SignupPage