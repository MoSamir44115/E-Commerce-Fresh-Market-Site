import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ClimbingBoxLoader, FadeLoader, HashLoader, RotateLoader } from 'react-spinners'
import ParticlesComponent from '../TsPart/TsPart'

export default function Categories () {
  function getCategories () {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
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
            <div className='group sm:w-1/2   md:w-1/4     lg:w-1/6 px-3 py-3  flex flex-col  justify-center itemsc'>
              <Link
                to={`/subcategory/${product.id}/${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className='w-full aspect-square '
                />
                <h2 className=' mt-2 text-lg font-normal text-gray-950'>
                  {product.name.split('').slice(0, 20)}
                </h2>
                <h3 className='mt-2 text-green-600'>{product.name}</h3>
              </Link>
            </div>
          </>
          
        ))}
      </div>
      <ParticlesComponent id="particles"></ParticlesComponent>
    </>
  )
}
