"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Heart,
  Star,
  Clock,
  LogOut,
  User,
  ShoppingCart,
} from "lucide-react";
import Login from "./LoginPage";
import { useNavigate } from "react-router-dom";
const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
    price: 12.99,
    image:
      "https://cdn.loveandlemons.com/wp-content/uploads/2019/09/margherita-pizza-1080x1080.jpg",
    rating: 4.5,
    cookTime: "25-30 min",
    category: "Italian",
    isLiked: false,
  },
  {
    id: 2,
    name: "Chicken Burger",
    description:
      "Juicy grilled chicken with lettuce, tomato, and special sauce",
    price: 9.99,
    image:
      "https://tse4.mm.bing.net/th/id/OIP.m93SV6ox1swkqRaBnEzbHgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.3,
    cookTime: "15-20 min",
    category: "American",
    isLiked: true,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with parmesan cheese and croutons",
    price: 8.5,
    image:
      "https://www.jocooks.com/wp-content/uploads/2020/07/caesar-salad-1-12.jpg",
    rating: 4.2,
    cookTime: "10-15 min",
    category: "Healthy",
    isLiked: false,
  },
  {
    id: 4,
    name: "Sushi Platter",
    description: "Assorted fresh sushi rolls with wasabi and ginger",
    price: 18.99,
    image:
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
    rating: 4.7,
    cookTime: "20-25 min",
    category: "Japanese",
    isLiked: true,
  },
  {
    id: 5,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with creamy frosting",
    price: 6.99,
    image:
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
    rating: 4.6,
    cookTime: "5 min",
    category: "Dessert",
    isLiked: false,
  },
  {
    id: 6,
    name: "Pad Thai",
    description: "Traditional Thai noodles with shrimp and peanuts",
    price: 11.5,
    image: "https://www.jocooks.com/wp-content/uploads/2019/07/pad-thai-1.jpg",
    rating: 4.4,
    cookTime: "20-25 min",
    category: "Thai",
    isLiked: false,
  },
];

export default function HomePage({ user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [likedItems, setLikedItems] = useState(
    foodItems.reduce((acc, item) => ({ ...acc, [item.id]: item.isLiked }), {})
  );

  const users = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const toggleLike = (itemId) => {
    setLikedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const filteredItems = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-orange-500">FoodieApp</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </button>

              {localStorage.getItem("user") ? (
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium sm:block">
                      {JSON.parse(localStorage.getItem("user")).username  || "Guest"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem("user");
                      window.location.reload();
                    }}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
             Welcome back, {users?.username || "Guest"}!
            👋
          </h2>
          <p className="text-gray-600">What would you like to eat today?</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleLike(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedItems[item.id]
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-orange-500">
                    ${item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{item.cookTime}</span>
                  </div>
                </div>

                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No food items found matching your search.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
