import React from 'react'

const Navbar = () => {
  return (
   <nav className='flex justify-around text-white bg-violet-900 py-3 w-full'>
    <div className='logo'>
      <span className='font-bold text-xl mx-9'>iTask</span>
    </div>
      <ul className='flex gap-10 mx-9 text-lg'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>

      </ul>
   </nav>
  )
}

export default Navbar
