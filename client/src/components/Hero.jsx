import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const Hero = () => {

  const [pickuplocation, setPickuplocation] = useState();

  const {pickupDate, setPickupDate, returnDate, navigate ,setReturnDate} = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/cars?pickuplocation=' + pickuplocation + '&pickupDate='
       + pickupDate + '&returnDate=' + returnDate)
  }


  return (

    <motion.div 
       initial = {{ opacity: 0}}
       animate = {{ opacity: 1}}
       transition={{duration: 0.8 }}
       className='h-screen flex flex-col items-center justify-center gap-14
       bg-light text-center'
      >

      <motion.h1 
       initial = {{y:50, opacity: 0}}
       animate = {{y: 0, opacity: 1}}
       transition={{duration: 0.8, delay: 0.2}}
       className='text-4xl md:text-5xl font-semibold'>
       Luxury Cars on Rent
      </motion.h1>

     <motion.form 
      
       initial = {{scale:0.95, opacity: 0, y: 50}}
       animate = {{scale: 1, opacity: 1, y: 0}}
       transition={{duration: 0.6, delay: 0.4}}
       onSubmit={handleSearch} 
       className='flex flex-col md:flex-row items-start md:items-center
          justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200
         bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)]'>
            
          <div className='flex flex-col md:flex-row items-start md:items-center
             gap-10 min-md:ml-8'>

             <div className='flex flex-col items-start gap-2'>

                 <select required value={pickuplocation} onChange={(e) => setPickuplocation(e.target.value)}>
                 
                    <option value="">Pickup Location</option>
                    {cityList.map((city) => <option key={city} value={city}> {city} </option>)}
                 </select>

                 <p className='px-1 text-sm text-gray-500'>{ pickuplocation ? pickuplocation : 
                  "Please select location"}</p>
             </div>

             <div className='flex flex-col items-start gap-2'>
                 <label htmlFor='pickup-date'>Pick-up Date</label>
                 <input 
                    className='text-sm text-gray-500' 
                    value={pickupDate}
                    onChange={e=> setPickupDate(e.target.value)}
                    type='date' 
                    id='pickup-date' 
                    min={new Date().toISOString().split('T')[0]}
                  />
             </div>

             <div className='flex flex-col items-start gap-2'>
                <label htmlFor='return-date'>Return Date</label>
                <input 
                  value={returnDate}
                  onChange={e=> setReturnDate(e.target.value)}
                  className='text-sm text-gray-500' 
                  type='date' 
                  id='return-date'
                /> 
             </div>
             
             <motion.button  
               whileHover={{scale: 1.05}}
               whileTap={{scale: 0.95}}
               className=" flex justify-center bg-primary text-white rounded-full w-30
                h-10 items-center cursor-pointer gap-3 hover:bg-primary-dull max-sm:mt-4 px-9 py-3">
               <img src={assets.search_icon} alt='Search' className='brightness-300'/>
               Search
             </motion.button>
         </div>  
     </motion.form>

      <motion.img 
        initial = {{y:100, opacity:0}}
        animate = {{y:0, opacity: 1}}
        transition={{duration: 0.8, delay: 0.6}}
        src={assets.main_car} 
        alt='car' 
        className='max-h-70' /> 
      
    </motion.div>
  )
}

export default Hero
