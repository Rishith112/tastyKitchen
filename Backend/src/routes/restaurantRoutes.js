import { Router } from "express";
import {getRestaurantList, postRestaurantList, getRestaurantItems, postRestaurantItems, } from "../controllers/restaurantcontrollers.js";
import {get} from "mongoose";




const routes = Router();

routes.post("/:restaurantId", postRestaurantItems); 
routes.get("/items/:restaurantId", getRestaurantItems); 


routes.get("/", getRestaurantList); 
routes.post("/", postRestaurantList); 


export default routes;  