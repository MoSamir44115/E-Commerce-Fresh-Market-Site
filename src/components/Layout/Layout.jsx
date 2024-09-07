import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout () {
  const [counter, setCounter] = useState(0)

  useEffect(() => {}, [])

  return (
    <>
      <Navbar></Navbar>
      <div className='container mt-20 mx-auto my-6 py-6'>
        <Outlet></Outlet>
      </div>
     
    </>
  )
}
