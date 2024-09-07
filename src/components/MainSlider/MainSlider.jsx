import React, { useEffect, useState } from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick'
import MainSliderImg1 from '../../assets/images/slider-image-3.jpeg'
import MainSliderImg2 from '../../assets/images/slider-image-2.jpeg'
import MainSliderImg3 from '../../assets/images/slider-image-1.jpeg'
import MainSliderImg4 from '../../assets/images/banner-4.jpeg'
import MainSliderImg5 from '../../assets/images/blog-img-2.jpeg'
import MainSliderImg6 from '../../assets/images/blog-img-1.jpeg'
import MainSliderImg7 from '../../assets/images/grocery-banner-2.jpeg'

export default function MainSlider () {
  const [counter, setCounter] = useState(0)
  const [mainslider, setMainSlider] = useState([])

  var settings = {
    arrows:false,
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  useEffect(() => {}, [])

  return (
    <>
      <div className='flex flex-nowrap py-5'>
        <div className='w-3/4'>
        <Slider {...settings}>
          <img className='h-[500px] w-full' src={MainSliderImg1} alt='main-slider-img1' />
          <img className='h-[500px] w-full' src={MainSliderImg2} alt='main-slider-img2' />
          <img className='h-[500px] w-full' src={MainSliderImg3} alt='main-slider-img3' />
          <img className='h-[500px] w-full' src={MainSliderImg6} alt='main-slider-img6' />
          <img className='h-[500px] w-full' src={MainSliderImg7} alt='main-slider-img6' />
          
        </Slider>
        </div>
        <div className='w-1/4'>
          <div>
            <img className='h-[250px] w-full' src={MainSliderImg4} alt='main-slider-img-4' />
          </div>
          <div>
            <img className='h-[250px] w-full' src={MainSliderImg5} alt='main-slider-img-5' />
          </div>
        </div>
      </div>
    </>
  )
}
