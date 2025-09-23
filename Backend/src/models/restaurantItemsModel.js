import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    food_type: String,
    image_url: String,
    id: String,
    rating: Number,
}, { _id: false });

const restaurantItemsSchema = new mongoose.Schema({
    restaurant_id: { type: String, required: true, unique: true },
    rating: Number,
    name: String,
    cost_for_two: Number,
    cuisine: String,
    image_url: String,
    reviews_count: Number,
    opens_at: String,
    location: String,
    items_count: Number,
    food_items: [foodItemSchema],
});

const RestaurantItems = mongoose.model("RestaurantItems", restaurantItemsSchema);

export default RestaurantItems;
