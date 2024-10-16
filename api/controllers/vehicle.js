import Vehicle from "../models/Vehicle.js"
import Room from "../models/Room.js"

export const createVehicle = async (req,res,next) =>{
  const newVehicle = new Vehicle(req.body)

  try {
    const savedVehicle = await newVehicle.save()
    res.status(200).json(savedVehicle)
  } catch (err) {
    next(err)
  }
}
export const updateVehicle = async (req,res,next) =>{
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
       { $set: req.body},
        {new:true}
      )
    res.status(200).json(updatedVehicle)
  } catch (err) {
    next(err)
  }
}
export const deleteVehicle = async (req,res,next) =>{
  try {
    await Vehicle.findByIdAndDelete(
      req.params.id
      )
    res.status(200).json("vehicle has been deleted")
  } catch (err) {
    next(err)
  }
}
export const getVehicle = async (req,res,next) =>{
  try {
    const vehicle = await Vehicle.findById(
      req.params.id
      )
    res.status(200).json(vehicle )
  } catch (err) {
    next(err)
  }
}
export const getVehicles = async (req,res,next) =>{
  const { min, max,limit, ...others } = req.query;


  try {
    const vehicles = await Vehicle.find({
      ...others ,
      cheapestRent:{$gt:min |1, $lt:max ||999},
    }).limit(req.query.limit)
    res.status(200).json(vehicles)
  } catch (err){
    next(err)
  }
}
export const countByCity = async (req,res,next) =>{
  const cities = req.query.cities.split(",")

  try {
    const list = await Promise.all(cities.map(city=>{
      return Vehicle.countDocuments({city:city})
    }))
    res.status(200).json(list)
  } catch (err){
    next(err)
  }
}
export const countByType = async (req,res,next) =>{
  
  try {
    const motorscooterCount = await Vehicle.countDocuments({type:"motorscooter"})
    const motorcycleCount = await Vehicle.countDocuments({type:"motorcycle"})
    const carsCount = await Vehicle.countDocuments({type:"cars"})
    const minivanCount = await Vehicle.countDocuments({type:"minivan"})
    const truckCount = await Vehicle.countDocuments({type:"truck"})
    
    res.status(200).json([
      {type:"motorscooter", count: motorscooterCount},
      {type:"motorcycle", count: motorcycleCount},
      {type:"cars", count: carsCount},
      {type:"minivan", count: minivanCount},
      {type:"truck", count: truckCount},
    ])
  } catch (err){
    next(err)
  }
}

export const getVehicleRooms = async (req,res,next)=>{
  try{
    const vehicle = await Vehicle.findById(req.params.id)
    const list = await Promise.all(
      vehicle.rooms.map((room)=>{
      return Room.findById(room);
    })
  )
   res.status(200).json(list)
  }catch(err){
    next(err);
  }
}