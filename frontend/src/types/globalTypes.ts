
enum MenuType  {
    VEG = "VEG",
    NON_VEG = "NON_VEG",
}

export interface UserRating {
rating: number;
rating_color: string;
rating_text: string;
total_reviews: number;
}

export interface RestaurantType {
cost_for_two: number;
cuisine:string;
group_by_time: boolean;
has_online_delivery: boolean 
has_table_booking: number;
id: string;
image_url: string;
is_delivering_now: number;
location: string;
menu_type: MenuType;
name:  string;
opens_at:  string;
user_rating: UserRating;
_id: string;
}

export interface RestaurantDetails {
    restaurants: RestaurantType[];
    total: number;
}

export interface FoodItemType {
    cost: number;
    food_type: string;
    id: string;
    image_url: string;
    name: string;
    rating: number;
    quantity?: number;
}

export interface FoodItems {
    cost_for_two: number;
    cuisine: string;
    food_items: FoodItemType[];
    image_url: string;
    items_count: number;
    location: string;
    name: string;
    opens_at: string;
    rating: number;
    restaurant_id: string;
    reviews_count: number;
    _id: string;
}


export interface ContextType {
    cartItems: FoodItemType[];
    totalItems: number;
    totalCost: number;
    addItemToCart: (item: FoodItemType) => void;
    removeItemFromCart: (itemId: string) => void;
    incrementItemQuantity: (itemId: string) => void;
    decrementItemQuantity: (itemId: string) => void;
    clearCart: () => void;
}
 