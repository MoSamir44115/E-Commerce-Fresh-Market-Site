import React, { useContext, useEffect, useState } from 'react'
import Style from './CheckOut.module.css'
import { useFormik } from 'formik'

import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'
import ParticlesComponent from '../TsPart/TsPart'
import { UcartContext } from '../../Context/LogCartContext'

export default function CheckOut () {
  let { checkOut , cartId } = useContext(UcartContext)

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },

    onSubmit: () =>
      handleCheckOut(cartId, 'http://localhost:5173')
  })

  async function handleCheckOut (cartId, url) {
    let { data } = await checkOut(cartId, url, formik.values)
    if (data.status === 'success') {
      window.location.href = data.session.url
    }
    console.log(data.session.url)
  }

  return (
    <>
      <div className='w-[50%] mx-auto '>
        <h1 className='text-green-600 font-bold text-4xl py-5'>Check Out</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              id='details'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.details}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='details'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Details
            </label>
          </div>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              autoComplete='on'
              type='tel'
              id='phone'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='phone'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Phone
            </label>
          </div>

          <div className='relative z-0 w-full mb-5 group'>
            <input
              autoComplete='on'
              type='text'
              id='city'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.city}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='city'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              City
            </label>
          </div>
          <div className='flex items-center '>
            <button
              type='submit'
              className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
      <ParticlesComponent id='particles'></ParticlesComponent>
    </>
  )
}
