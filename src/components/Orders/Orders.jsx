import React, { useContext, useEffect, useState } from 'react'
import Style from './Orders.module.css'
import { UcartContext } from '../../Context/LogCartContext'
export default function Orders () {
  const [counter, setCounter] = useState(0)

  let { allOrders } = useContext(UcartContext)

  async function UserOrders (productId) {
    let response = await allOrders(productId)
    console.log(response)
  }

  useEffect(() => {
    UserOrders()
  }, [])

  return (
    <>
      <div className='flex flex-col justify-center text-green-500  items-center mt-52 text-6xl'>
        <h1 className='mb-10'>
          Transaction Successfully Completed
        </h1>
        <i className='fa-solid fa-check'></i>
      </div>
    </>
  )
}
