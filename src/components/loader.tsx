import React from 'react'
import { ScaleLoader } from 'react-spinners'
function Loader() {
  return (
    <div className='flex-center w-full h-screen'>
        <ScaleLoader color="#fff" />
    </div>
  )
}

export default Loader