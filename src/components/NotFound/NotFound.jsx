import React, { useEffect, useState } from 'react'
import Style from './NotFound.module.css'
import error from '../../assets/images/error.svg'
export default function NotFound () {
  const [counter, setCounter] = useState(0)

  useEffect(() => {}, [])

  return (
    <>
      <div className='md:mx-28 flex justify-center'>
        <img className='w-full' src={error} alt='error_msg' />
      </div>
    </>
  )
}
