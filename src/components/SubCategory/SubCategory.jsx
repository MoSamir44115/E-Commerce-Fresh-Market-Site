import React, { useEffect, useState } from 'react'
import Style from './SubCategory.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ParticlesComponent from '../TsPart/TsPart'

export default function SubCategory () {
  const [counter, setCounter] = useState(0)
  const [productdetails, setProductDetails] = useState(null)
  const [productcategory, setProductCat] = useState([])
  const [imgsrc, setImgSrc] = useState('')

  function getImgSrc (e) {
    setImgSrc(e.target.src)
    console.log(e)
  }

  let { id, category } = useParams()

  function getProductDetails (id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        console.log(data.data)
        console.log(data.data.images)
        setProductDetails(data.data)
      })
      .catch(error => {})
  }
  function getProductRelated (category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data
        let related = allProducts.filter(
          product => product.category.name == category
        )
        console.log(related)
        setProductCat(related)
      })
      .catch(error => {})
  }

  useEffect(() => {
    getProductDetails(id)
    getProductRelated(category)
  }, [id, category])

  return (
    <>
      <div>
        <h1 className='px-5 mb-5 font-normal text-3xl mt-10 '>Sub Category</h1>
      </div>
      <div key={productcategory.id} className='flex flex-wrap flex-col md:flex-row items-center '>
        {productcategory.map(product => (
          <>
            <div key={product.id} className='px-5 md:w-1/6'>
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
                <button
                  type='button'
                  className='animate-bounce opacity-0 translate-y-[100%] transition-all  group-hover:opacity-100  group-hover:translate-y-0  my-3  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Add To Cart
                </button>
              </Link>
            </div>
          </>
        ))}
      </div>
      <ParticlesComponent id="particles"></ParticlesComponent>

    </>
  )
}
