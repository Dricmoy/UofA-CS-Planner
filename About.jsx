import React from 'react'
import ualberta from '../assets/newUalbertaLogo.png'

const About = () => {
  return (
    <div className='w-full bg-gray-200 px-4 py-16'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img src = {ualberta} alt="Ualberta Logo" />
            <div className='flex flex-col justify-center'>
                <h1 className='text-bold text-black font-bold font-serif justify-between items-center text-2xl uppercase' >Why did we make this website?</h1>
                <p className='py-4'>The creation of this course planner stems from the deficiency of the university course calendar system, which is often overrun by its slowness and lagginess. This alternative solution is made to make this process much smoother and enhance the overall user experience by recognizing the role an efficient course planning system plays in a student's academics. The slowness of the university course calendar system leads to frustration, restricting students from optimizing their time and making informed, mindful decisions about their classes. This course planner aims to manage these issues by providing an easy-to-understand, speedy, and user-friendly system that allows Ualberta students to easily steer through available courses, look through prerequisites, and construct a custom schedule made to address their individual academic needs. 
</p>
            </div>

        </div>

    </div>
  )
}

export default About