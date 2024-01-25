import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import ualberta from '../assets/newUalbertaLogo.png'

const Navbar = () => {
    const[nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }
  return (
    <div className='flex justify-between items-center h-40 max-w-[1240px] mx-auto px-4 text-white'>
        <img className = 'w-[100px]'src = {ualberta} alt="Ualberta Logo" />
        <h1 className='w-full text-2xl font-serif text-[#ffffff]'>UALBERTA PLANNER</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'><a href="#">Home</a></li>
            <li className='p-4'><a href="#">About</a></li>
            <li className='p-4'><a href="#">Updates</a></li>
            <li className='p-4'><a href="#">Contact</a></li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {nav ? <AiOutlineClose size={30}/> : <AiOutlineMenuFold size={30}/>}
        </div>
        <div className= {nav ? 'fixed left-0 top-0 w-[38%] h-full border-r border-r-gray-900 bg-gray-600 ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <img className = 'w-[150px]'src = {ualberta} alt="Ualberta Logo" />    
        
           <ul className='pt-2 p-6 uppercase'>
            <li className='p-4 border-b border-gray-900'><a href="#">Home</a></li>
            <li className='p-4 border-b border-gray-900'><a href="#">About</a></li>
            <li className='p-4 border-b border-gray-900'><a href="#">Updates</a></li>
            <li className='p-4 border-b border-gray-900'><a href="#">Contact</a></li>
           </ul> 
        </div>
    </div>
  )
}

export default Navbar