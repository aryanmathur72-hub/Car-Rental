import Booking from "../models/Booking.js"
import Car from "../models/Car.js"


//function to check Availability of car for booking?

const checkAvailability = async (car, pickupDate, returnDate) => {
     const bookings = await Booking.find({
        car, 
         pickupDate: { $lt: returnDate },
    returnDate: { $gt: pickupDate }
     });

     return bookings.length === 0;

}

// api to check availability of cars for ginev date and location

export const checkAvailabilityofCar = async (req, res) => {
    try {
        const {location, pickupDate, returnDate} = req.body;

    // fetch all available cars for given location..
       const cars = await Car.find({location, isAvailable: true})

 //check car availability for the given date range using Promise
        const availableCarsPromises = cars.map(async (car) => {
         const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
         return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises);
        availableCars = availableCars.filter(car => car.isAvailable === true)
        res.json({success: true, availableCars})

        
    } catch (error) { 
        console.log(error.message);
        res.json({success: false, message: error.message })
    }
}

//api to create booking 

export const createBooking =  async (req, res) => {
    try { 
    const {_id} = req.user;
    const {car, pickupDate, returnDate} = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate);
    if(!isAvailable){
        return res.json({success: false, message: "car is not available"})
    }

    const carData = await Car.findById(car);
  

    // calculate price based on pickup and return date 

   
    const picked = new Date(Date.parse(pickupDate));
    const returned = new Date(Date.parse(returnDate));

  const NoOfDays = Math.max(1, Math.ceil((returned - picked) / (1000 * 60 * 60 * 24)));
  const pricePerDay = Number(carData.pricePerDay?.toString().replace(/[^0-9.]/g, '')) || 0;
  const price = pricePerDay * NoOfDays;

    
    
    await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price}); 
    res.json({success: true, message: "successfully booking"})

   } catch (error) {
     console.log(error.message);
        res.json({success: false, message: error.message })
    }
}

//api ot list user Bookings 
export const getUserBookings = async (req, res) => {
    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user: _id}).populate("car").sort({createdAt: -1})
        res.json({success: true, bookings});

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message })
        
    }
}

//api to get owner Bookings?

export const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"}); 
        }
        const bookings = await Booking.find({owner: req.user._id}

        ).populate('car user').select("-user.password").sort({createdAt: -1});
        
         res.json({success: true, bookings});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message })
        
    }
}

// api to owner update booking status 

export const changeBookingStatus = async (req, res) => {
    try {
        const {_id} = req.user;
       
        const { bookingId, status } = req.body;
       
       
        const booking = await Booking.findById(bookingId);
      
        if(booking.owner.toString() !== _id.toString()){
            return res.json({success:false, message:"Unauthorized"});
        }

        booking.status = status;
        await booking.save();

        res.json({success: true, message: "status Updated"});
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message })
        
    }
}
