import { SignIn } from '@clerk/nextjs'
import React from 'react'

function SigninPage() {
  return (
    <main className='h-screen flex-center w-full bg-dark-2'>
        <SignIn />
    </main>
  )
}
export default SigninPage;