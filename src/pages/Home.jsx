import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpodes"} heading={`Airpodes`} />
      <HorizontalCardProduct category={"watches"} heading={`Watches`} />

      <VerticalCardProduct category={"camera"} heading={`Camera`} />
      <VerticalCardProduct category={"earphones"} heading={`Earphones`} />
      <VerticalCardProduct category={"headphones"} heading={`Headphones`} />
      <VerticalCardProduct category={"mobile"} heading={`Smart Phones`} />
      <VerticalCardProduct category={"mouse"} heading={`Mouse`} />
      <VerticalCardProduct category={"playstation"} heading={`Play Station`} />
      <VerticalCardProduct category={"processor"} heading={`Processor`} />
      <VerticalCardProduct category={"speakers"} heading={`Speakers`} />
      
    </div>
  )
}

export default Home
