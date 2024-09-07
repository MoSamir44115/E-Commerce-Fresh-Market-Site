import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { UcartContext } from '../../Context/LogCartContext'
import ParticlesComponent from '../TsPart/TsPart'
import { Link } from 'react-router-dom'

export default function Cart () {
  let {
    clearCart,
    getLoggedUserCart,
    updateProductCartCount,
    deleteProductItem,
    setCart,
    cart
  } = useContext(UcartContext)
  const [cartDetails, setCartDetails] = useState(null)

  async function getCartItems () {
    let response = await getLoggedUserCart()
    console.log(response)
    console.log(response.data)
    setCartDetails(response.data.data)
     setCart(response.data)
   
  }
  async function UpdateCartCount (productId, count) {
    let response = await updateProductCartCount(productId, count)
    console.log(response.data)
    setCartDetails(response.data.data)
    setCart(response.data)
  }

  async function deleteCartItem (productId) {
    let response = await deleteProductItem(productId)
    console.log(response.data)
    setCartDetails(response.data.data)
    setCart(response.data)
  }

  async function clearUserCart () {
    let response = await clearCart()
    console.log(response.data)
    setCartDetails(response.data.data)
    setCart(response?.data)
  }

  useEffect(() => {
    getCartItems()
  }, [cart])

  return (
    <>
      <div className='w-3/4 my-6  mt-10 mb-4  mx-auto px-4 flex items-center justify-between'>
        <h1 className='  text-4xl font-normal text-green-500'>Your Cart</h1>
      </div>
      <div className=' flex  items-center justify-between border rounded-md shadow py-6 px-4 w-3/4 mx-auto bg-gray-100'>
        <div>
          <h3 className='text-3xl font-normal text-gray-950'>
            Total Cart Price : {cartDetails?.totalCartPrice} EGP
          </h3>
          <h3
            onClick={() => clearUserCart()}
            href='#'
            className='mt-5 text-2xl  cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline'
          >
            Clear Cart
          </h3>
        </div>
        <Link to='/checkout'>
          <button
            type='button'
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-2xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
          >
            Check Out
          </button>
        </Link>
      </div>
      <div className='w-3/4 my-6 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-16 py-3'>
                <span className='sr-only'>Image</span>
              </th>
              <th scope='col' className='px-6 py-3'>
                Product
              </th>
              <th scope='col' className='px-6 py-3'>
                Qty
              </th>
              <th scope='col' className='px-6 py-3'>
                Price
              </th>
              <th scope='col' className='px-6 py-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.products.map(product => (
              <>
                <tr
                  key={product.product.id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                >
                  <td className='p-4'>
                    <img
                      src={product.product.imageCover}
                      className='w-16 md:w-32 max-w-full max-h-full'
                      alt={product.product.title}
                    />
                  </td>
                  <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                    {product.product.title}
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center'>
                      <button
                        onClick={() =>
                          UpdateCartCount(product.product.id, product.count - 1)
                        }
                        className='inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                        type='button'
                      >
                        <span className='sr-only'>Quantity button</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 2'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M1 1h16'
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() =>
                          UpdateCartCount(product.product.id, product.count + 1)
                        }
                        className='inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
                        type='button'
                      >
                        <span className='sr-only'>Quantity button</span>
                        <svg
                          className='w-3 h-3'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 18 18'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M9 1v16M1 9h16'
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className='px-6 py-4 font-semibold text-gray-900 dark:text-white'>
                    {product.price} EGP
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      onClick={() => deleteCartItem(product.product.id)}
                      href='#'
                      className='cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline'
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
      <ParticlesComponent id='particles'></ParticlesComponent>
    </>
  )
}
