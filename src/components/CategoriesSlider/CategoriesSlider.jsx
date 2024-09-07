import React, { useEffect, useState } from 'react'
import Style from './CategoriesSlider.module.css'
import Slider from 'react-slick'
import axios from 'axios'

export default function CategoriesSlider () {
  const [categories, setCategories] = useState([])

  var settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3
  }

  function getCatSlider () {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then(({ data }) => {
        setCategories(data.data)
      })
      .catch(error => {})
  }

  useEffect(() => {
    getCatSlider()
  }, [])

  return (
    <>
      <div className='mt-20' key={categories._id}>
        <h2 className='pb-5 font-bold text-lg text-gray-950'>Shop Popular Categories</h2>
        <Slider key={categories._id} {...settings}>
          <div className='flex flex-nowrap'></div>
          {categories?.map(category => (
            <>
              <div>
                <img
                  className='category-img w-full'
                  src={category.image}
                  alt={category.name}
                />
                <h3 className='py-2 font-semibold text-lg'>{category.name}</h3>
              </div>
            </>
          ))}
        </Slider>
      </div>
    </>
  )
}
