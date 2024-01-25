import React from 'react'
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <div className='text-white'>
    <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-gray-600 font-bold p-2'>STRUGGLING WITH COURSE DECISIONS AND PLANNING?</p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 font-serif'>PLAN YOUR COURSES WITH EASE</h1>
        <div>
            <p className='uppercase font-bold'>Every Course Avaliable For:</p>
            <ReactTyped className = 'text-gray-400 font-bold'strings={['Computer Science', 'Biology', 'Mathematics', 'Philosophy', 'Physics', 'Language Subjects', 'Business','Chemistry']} typeSpeed={100} backSpeed={60} loop/>
        </div>
        <div>
            <button className='bg-gray-600 w-[150px] rounded font-bold mx-auto self-center h-8 my-6 text-black'>Start Planning</button>
        </div>

    </div>
    </div>
  )
}

export default Hero