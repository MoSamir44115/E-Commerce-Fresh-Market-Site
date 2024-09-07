import React, { useContext, useEffect, useState } from 'react'
import Style from './Products.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ClimbingBoxLoader, FadeLoader, HashLoader, RotateLoader } from 'react-spinners'
import ParticlesComponent from '../TsPart/TsPart'
import { UcartContext } from '../../Context/LogCartContext'
import toast from 'react-hot-toast'

export default function Products () {


  let { addProductToCart ,setCart , cart } = useContext(UcartContext)

  async function addProduct (productId) {
    let response = await addProductToCart(productId)
    if(response.data.status === 'success'){
      setCart(response.data)
      toast.success(response.data.message, {
        duration: 2000,
        position: 'top-right',
        icon: '👏',
        style: {
          backgroundColor: 'green',
          padding: '16px ',
          color: 'white'
        }
      })
    } else {
      toast.error(response.data.message, {
        duration: 2000,
        position: 'top-right',
        backgroundColor: 'green',
        icon: '👏',
        style: {
          border: '1px solid black',
          padding: '16px ',
          color: '#713200'
        }
      })
    }


    console.log(response)
  }

  function getRecent () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

  let { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent
  })

  console.log(data)
  // const [recentProducts, setRecentProducts] = useState([])

  // function getRecentProducts () {
  //   axios
  //     .get('https://ecommerce.routemisr.com/api/v1/products')
  //     .then(({ data }) => {
  //       setRecentProducts(data.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // }

  // useEffect(() => {
  //   getRecentProducts()
  // }, [])

  if (isLoading) {
    return (
      <div className='py-8 w-full flex justify-center'>
        <HashLoader color='green'></HashLoader>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='py-8 w-full flex justify-center'>
        <h3 className='text-4xl text-red-600 font-bold'>{error}</h3>
      </div>
    )
  }

  return (
    <>
      <div className=' md:mt-10 flex flex-wrap  px-4 py-8 items-center'>
        {data?.data?.data?.map(product => (
          <>
            <div className='group sm:w-1/2   md:w-1/4     lg:w-1/6 px-3 py-1  flex flex-col  justify-center itemsc'>
              <Link
                to={`/productdetails/${product.id}/${product.category.name}`}
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className='w-full  '
                />
                <h2 className=' mt-2 text-lg font-normal text-gray-950'>
                  {product.title.split('').slice(0, 20)}
                </h2>
                <h3 className='mt-2 text-green-600'>{product.category.name}</h3>
                <div className='flex flex-nowrap items-center justify-between'>
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}{' '}
                    <i className='ps-1 fas fa-star text-yellow-300 '></i>
                  </span>
                </div>
              </Link>
                <button
                onClick={()=>addProduct(product.id)}
                  type='button'
                  className='animate-bounce opacity-0 translate-y-[100%] transition-all  group-hover:opacity-100  group-hover:translate-y-0  my-3  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Add To Cart
                </button>
            </div>
          </>
        ))}
      </div>
      <ParticlesComponent id="particles"></ParticlesComponent>

    </>
  )
}
