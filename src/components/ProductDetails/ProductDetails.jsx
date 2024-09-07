import React, { useContext, useEffect, useState } from 'react'
import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import ParticlesComponent from '../TsPart/TsPart'
import { UcartContext } from '../../Context/LogCartContext'

export default function ProductDetails () {
  const [counter, setCounter] = useState(0)
  const [productdetails, setProductDetails] = useState(null)
  const [productcategory, setProductCat] = useState([])
  const [imgsrc, setImgSrc] = useState('')

  let { addProductToCart ,setCart ,cart } = useContext(UcartContext)

  async function addProduct (productId) {
    let response = await addProductToCart(productId)
    console.log(response)
    setCart(response.data)
  }

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
        setCart(response.data)
      })
      .catch(error => {})
  }

  useEffect(() => {
    getProductDetails(id)
    getProductRelated(category)
  }, [id, category])

  return (
    <>
      <div className='mt-20 flex flex-nowrap flex-col md:flex-row items-center'>
        <div className=' px-4  md:w-1/4 md:me-4 text-center'>
          <img
            className='w-full'
            src={imgsrc ? imgsrc : productdetails?.imageCover}
            alt={productdetails?.title}
          />
          <div className='cursor-pointer mt-2 flex flex-nowrap items-center'>
            {productdetails?.images?.map(img => (
              <li onClick={getImgSrc} key={img} className='px-1 list-none'>
                <img
                  className='w-120px'
                  src={img}
                  alt={productdetails?.title}
                />
              </li>
            ))}
          </div>
        </div>
        <div className='px-5 md:px-0 md:w-3/4 mt-4 md:mt-0'>
          <h1 className='pb-5 text-lg font-normal text-gray-950'>
            {productdetails?.title}
          </h1>
          <h2 className='pb-5 text-green-500'>
            {productdetails?.category.name}
          </h2>
          <p className='text-gray-700 font-light'>
            {productdetails?.description}
          </p>
          <div className='mt-4 flex flex-nowrap justify-between'>
            <span>{productdetails?.price} EGP</span>
            <span>{productdetails?.quantity} Quantity</span>
            <span>
              {productdetails?.ratingsAverage}
              <i className='ps-1 fas fa-star text-yellow-300 '></i>
            </span>
          </div>
          <button
            type='button'
            className='w-full mt-9  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
          >
            Add To Cart
          </button>
        </div>
      </div>
      <div>
        <h1 className='px-5 mb-5 font-normal text-3xl mt-10 '>
          Related Products
        </h1>
      </div>
      <div
        key={productcategory.id}
        className='flex flex-wrap flex-col md:flex-row items-center '
      >
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
              </Link>
              <button
                onClick={() => addProduct(product.id)}
                type='button'
                className='animate-bounce opacity-0 translate-y-[100%] transition-all  group-hover:opacity-100  group-hover:translate-y-0  my-3  focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
              >
                Add To Cart
              </button>
            </div>
          </>
        ))}
      </div>
      <ParticlesComponent id='particles'></ParticlesComponent>
    </>
  )
}
