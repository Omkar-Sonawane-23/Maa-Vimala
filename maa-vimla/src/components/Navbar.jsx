import React from 'react'
import logo from '../assets/logo.png'
const Navbar = () => {
  return (
    <>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="https://maa-vimla.com" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} class="h-8 bg-black" alt="maa-vimala-Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Maa-Vimla</span>
        </a>
        <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:scale-[1.12] transition-all duration-500 ">Login</button>
        </div>
    </div>
</nav>
<nav class="bg-gray-50 dark:bg-gray-700">
    <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center ">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-lg ">
                <li class="hover:scale-[1.25] transition-all duration-500">
                    <a href="#" class="text-gray-900 dark:text-white " aria-current="page">Home</a>
                </li>
                <li class="hover:scale-[1.12] transition-all duration-500">
                    <a href="#" class="text-gray-900 dark:text-white">About us</a>
                </li>
                <li class="hover:scale-[1.12] transition-all duration-500">
                    <a href="#" class="text-gray-900 dark:text-white">Services</a>
                </li>
                <li class="hover:scale-[1.12] transition-all duration-500">
                    <a href="#" class="text-gray-900 dark:text-white">FAQ's</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</>
  )
}

export default Navbar