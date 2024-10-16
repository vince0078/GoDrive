import express from "express";
import Vehicle from "../models/Vehicle.js";
import { countByCity, countByType, createVehicle, deleteVehicle, getVehicle, getVehicleRooms, getVehicles, updateVehicle } from "../controllers/vehicle.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/",verifyAdmin, createVehicle);

//UPDATE
router.put("/:id",verifyAdmin, updateVehicle)

//DELETE
router.delete("/:id",verifyAdmin, deleteVehicle)

//GET
router.get("/find/:id", getVehicle)
//GET ALL
router.get("/", getVehicles)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/room/:id", getVehicleRooms)


export default router