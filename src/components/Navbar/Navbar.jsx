import React, { useContext, useEffect, useState } from 'react'
import Style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { UcartContext } from '../../Context/LogCartContext'

export default function Navbar () {
  const [counter, setCounter] = useState(0)

  let { setuserLogin, userLogin, userName, setuserName } =
    useContext(UserContext)
  let { cart } = useContext(UcartContext)
  console.log(cart)

  let naviagte = useNavigate()

  function logOut () {
    localStorage.removeItem('userToken')
    localStorage.removeItem('userName')
    setuserLogin(null)
    naviagte('/login')
  }
  

  useEffect(() => {}, [])

  return (
    <nav className='z-50 static md:fixed top-0 end-0 start-0  mx-auto  items-center bg-slate-100 border-gray-200 dark:bg-gray-900 justify-between '>
      <div className='flex flex-col  md:flex md:flex-row md:flex-nowrap items-center p-4'>
        <a
          href='/'
          className='my-4 w-[13rem] flex flex-col items-center space-x-3 rtl:space-x-reverse '
        >
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-green-500'>
            <i className='fa fa-shopping-cart'></i> FreshMarket
          </span>
        </a>
        <div className='flex flex-col md:flex-row-reverse items-center w-[15rem] sm:w-[67%]  md:w-[78.67%] lg:w-5/6  md:justify-between'>
          <div className='my-1'>
            <ul className='flex  md:ms-3 justify-between items-center'>
              {userLogin === null ? (
                <>
                  <li>
                    <NavLink
                      className='px-1 text-lg md:text-xs lg:text-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                      to='/register'
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className='px-1  text-lg md:text-xs lg:text-lg hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                      to='/login'
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className='hidden lg:flex me-10 '>
                    <p className='font-semibold'>
                      <span className='me-2 text-green-600'>Hi</span>
                      <span className='capitalize'>
                        {userName.toUpperCase()}
                      </span>
                    </p>
                  </li>
                  <li className='me-4'>
                    <NavLink to='/cart'>
                      <h3 className='z-10 absolute ms-4 bg-green-600 w-6 h-6 rounded-xl flex justify-center text-center text-white'>
                        {cart?.numOfCartItems}
                      </h3>
                      <i class='cursor-pointer mt-4   px-1 text-lg md:text-xs lg:text-2xl  hover:bg-gray-100 md:hover:bg-transparent md:border-0 fa-solid fa-cart-shopping  md:hover:text-green-700  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'></i>
                    </NavLink>
                  </li>

                  <li>
                    <span
                      onClick={logOut}
                      className='cursor-pointer px-1 text-lg md:text-xs lg:text-lg  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700  dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    >
                      Sign out
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='mt-1 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          <div className='hidden  md:flex md:flex-row  ' id='navbar-default'>
            <ul className='w-[30rem] md:w-auto font-medium flex flex-col p-4 md:p-0  rounded-lg md:flex md:flex-row md:space-x-8 md:mt-0 '>
              {userLogin !== null ? (
                <>
                  <li className='block'>
                    <NavLink
                      to='/'
                      className='block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white md:dark:text-green-500'
                      aria-current='page'
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/products'
                      className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/cart'
                      className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/brands'
                      className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/categories'
                      className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                    >
                      Categories
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
