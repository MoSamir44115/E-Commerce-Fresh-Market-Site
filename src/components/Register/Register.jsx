import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext'
import ParticlesComponent from '../TsPart/TsPart'

export default function Register () {
  let naviagte = useNavigate()
  let [apierror, setApierror] = useState()
  let [isLoading, setLoading] = useState(false)
  let { userLogin, setuserLogin, setuserName, userName } =
    useContext(UserContext)

  async function handleRegister (formValues) {
    setLoading(true)
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
      .then(apiResponse => {
        localStorage.setItem('userToken', apiResponse.data.token)
        localStorage.setItem('userName', apiResponse.data.user.name)
        naviagte('/')
        setuserLogin(apiResponse.data.token)
        setuserName(apiResponse.data.user.name)
        setLoading(false)
        console.log(apiResponse)
      })
      .catch(apiResponse => {
        setLoading(false)
        setApierror(apiResponse?.response?.data?.message)
      })
    console.log(data.message)

    console.log(formValues)
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Name Must At Least 3 Characters')
      .required('Name Is Required'),
    email: Yup.string().email('Email Is Invalid').required('Email Is Required'),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        'Phone Must Be At Least 12 Numbers And Egyptian Mobile '
      )
      .required('Phone Is Required'),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{6,10}$/,
        'Password Must Start With Uppercase & Min Characters Are 6 '
      )
      .required('Password Is Required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Repassword Doesnt Match Password')
      .required('Repassword Is Required')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },

    validationSchema /** validationScheme is same name as the yup scheme above thats why it is validationschema  only both have same name  */,
    onSubmit: handleRegister
  })

  return (
    <>
      <div className='w-[50%] mx-auto'>
        {apierror ? (
          <div
            className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
            role='alert'
          >
            {apierror}
          </div>
        ) : null}
      </div>

      <div className='w-[50%] mx-auto '>
        <h1 className='text-green-600 font-bold text-4xl py-5'>Register Now</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='text'
              id='name'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='name'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Name
            </label>
          </div>
          {formik.errors.name && formik.touched.name ? (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {formik.errors.name}
            </div>
          ) : null}

          <div className='relative z-0 w-full mb-5 group'>
            <input
              type='email'
              id='email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='email'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Email
            </label>
          </div>

          {formik.errors.email && formik.touched.email ? (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {formik.errors.email}
            </div>
          ) : null}

          <div className='relative z-0 w-full mb-5 group'>
            <input
              autoComplete='on'
              type='password'
              id='password'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='password'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Password
            </label>
          </div>

          {formik.errors.password && formik.touched.password ? (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {formik.errors.password}
            </div>
          ) : null}

          <div className='relative z-0 w-full mb-5 group'>
            <input
              autoComplete='on'
              type='password'
              id='rePassword'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
              placeholder=''
            />
            <label
              htmlFor='rePassword'
              className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
            >
              Repassword
            </label>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {formik.errors.rePassword}
            </div>
          ) : null}

          <div className='relative z-0 w-full mb-5 group'>
            <input
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
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400'
              role='alert'
            >
              {formik.errors.phone}
            </div>
          ) : null}

          <button
            type='submit'
            className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
          >
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Submit'}
          </button>
        </form>
      </div>
      <ParticlesComponent id='particles'></ParticlesComponent>
    </>
  )
}
