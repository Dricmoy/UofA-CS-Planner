import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'

const Navbar = () => {
    const[nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }
  return (
    <div className='flex justify-between items-center h-40 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='w-full text-2xl font-serif text-[#ffffff]'>UALBERTA PLANNER</h1>
        <ul className='hidden md:flex'>
            <li className='p-4'>About</li>
            <li className='p-4'>Contact</li>
            <li className='p-4'>Updates</li>
            <li className='p-4'>Home</li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
            {!nav ? <AiOutlineClose size={30}/> : <AiOutlineMenuFold size={30}/>}
        </div>
        <div className= {!nav ? 'fixed left-0 top-0 w-[38%] h-full border-r border-r-gray-900 bg-gray-800 ease-in-out duration-500' : 'fixed left-[-100%]'}>
        <h1 className='w-full text-2xl font-bold text-[#ffffff] m-4'>UALBERTA PLANNER</h1>
           <ul className='pt-2 p-6 uppercase'>
            <li className='p-4 border-b border-gray-900'>Home</li>
            <li className='p-4 border-b border-gray-900'>About</li>
            <li className='p-4 border-b border-gray-900'>Updates</li>
            <li className='p-4 border-b border-gray-900'>Contact</li>
           </ul> 
        </div>
    </div>
  )
}

export default Navbar