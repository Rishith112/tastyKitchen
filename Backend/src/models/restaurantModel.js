import mongoose from "mongoose";

const userRatingSchema = new mongoose.Schema({
    rating_text: String,
    rating_color: String,
    total_reviews: Number,
    rating: Number,
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
    has_online_delivery: Boolean,
    user_rating: userRatingSchema,
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    has_table_booking: Number,
    is_delivering_now: Number,
    cost_for_two: Number,
    cuisine: String,
    image_url: String,
    menu_type: String,
    location: String,
    opens_at: String,
    group_by_time: Boolean,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;