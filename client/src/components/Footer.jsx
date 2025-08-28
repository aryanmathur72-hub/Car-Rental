import React from 'react'
import {assets} from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  return (
     <motion.div
         initial = {{ opacity: 0 , y: 40}}
         whileInView = {{ opacity: 1, y:0}}
         transition={{duration: 1, delay: 0.3 }}
         className='px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-600'>
            <div className='flex flex-wrap justify-between items-start gap-8 md:gap-6 border-borderColor'>
                <div className='max-w-80'>
                    <img src={assets.logo}  halt="logo" className='mb-4 h-8 md:h-9' />
                    <p className='text-sm'>
                        Premium car rental service with a wide selection of
                        luxury and everyday vehicles for all your driving needs.                                               
                    </p>
                    <div className='flex items-center gap-3 mt-4 '>
                       
                      <a href='#'> <img className='hover:-translate-y-2.5 duration-500' src={assets.instagram_logo}/> </a>
                      <a href='#'> <img className='hover:-translate-y-2.5 duration-300' src={assets.facebook_logo}/> </a>
                     <a href='#'>  <img className='hover:-translate-y-2.5 duration-300' src={assets.twitter_logo}/></a>
                      <a href='#'> <img className='hover:-translate-y-2.5 duration-300' src={assets.gmail_logo}/></a>
                        
                    </div>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>Quick Links</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm '>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>

                <div>
                    <p className='text-lg text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Insurance</a></li>
                    </ul>
                </div>

                <div className='max-w-80'>
                    <p className='text-lg text-gray-800'>CONTACT</p>
                    <p className='mt-3 text-sm'>
                      1234 luxury Drive</p>
                    <p className='mt-3 text-sm'>
                       San Francisco, CA 941
                    </p>
                     <p className='mt-3 text-sm'>
                       +1 (555) 123-4567
                    </p>
                    <div className='flex items-center mt-4'>
                        <input type="text" className='bg-white rounded-l border border-gray-300 h-9 px-3 outline-none' placeholder='Your email' />
                        <button className='flex items-center justify-cente cursor-pointer bg-amber-400 h-9 w-9 aspect-square rounded-r'>
                         <img src={assets.arrow_icon} className="w-7 h-3" />
                        </button>
                    </div>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="/">CarRental</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Cookies</a></li>
                </ul>
            </div>
        </motion.div>
  )
}

export default Footer
