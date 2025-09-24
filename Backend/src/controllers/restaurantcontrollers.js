import Restaurant from "../models/restaurantModel.js";
// Get paginated and sorted restaurant list
import RestaurantItems from "../models/restaurantItemsModel.js";

export async function postRestaurantItems(req, res) {
    try {
        const data = req.body;
        if (!data || !data.id || !Array.isArray(data.food_items)) {
            return res.status(400).json({ message: "Invalid data. 'id' and 'food_items' required." });
        }
        const restaurantItems = new RestaurantItems({
            restaurant_id: data.id,
            rating: data.rating,
            name: data.name,
            cost_for_two: data.cost_for_two,
            cuisine: data.cuisine,
            image_url: data.image_url,
            reviews_count: data.reviews_count,
            opens_at: data.opens_at,
            location: data.location,
            items_count: data.items_count,
            food_items: data.food_items,
        });
        await restaurantItems.save();
        res.status(201).json({ message: "Restaurant items saved", restaurantItems });
    } catch (error) {
        console.error("Error saving restaurant items:", error);
        res.status(500).json({ message: "Server error" });
    }
}
    
export async function getRestaurantItems(req, res) {
    try {
        const { restaurantId } = req.params;
        const items = await RestaurantItems.findOne({ restaurant_id: restaurantId });
        if (!items) {
            return res.status(404).json({ message: "Items not found for this restaurant" });
        }
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching restaurant items:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getRestaurantList(req, res) {
    try {
        const { offset = 0, limit = 9, sort_by_rating = "Highest" } = req.query;
        const sortOrder = sort_by_rating === "Lowest" ? 1 : -1;
        const restaurants = await Restaurant.find({})
            .sort({ "user_rating.rating": sortOrder })
            .skip(Number(offset))
            .limit(Number(limit));
        const total = await Restaurant.countDocuments();
        res.status(200).json({ restaurants, total });
    } catch (error) {
        console.error("Error fetching restaurant list:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function postRestaurantList(req, res) {
    try {
        const restaurantArray = req.body;
        if (!Array.isArray(restaurantArray) || restaurantArray.length === 0) {
            return res.status(400).json({ message: "Array of restaurants required in request body" });
        }
        const insertedRestaurants = await Restaurant.insertMany(restaurantArray);
        res.status(201).json({ message: `${insertedRestaurants.length} restaurants inserted.`, restaurants: insertedRestaurants });
    } catch (error) {
        console.error("Error inserting restaurant list:", error);
        res.status(500).json({ message: "Server error" });
    }
}