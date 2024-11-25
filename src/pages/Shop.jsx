import React, { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  "All",
  "Milk",
  "Yogurt",
  "Ice Cream",
  "Butter",
  "Cheese",
  "Ghee"
];

const products = [
  {
    id: 1,
    name: 'Fresh Milk',
    price: '₹60',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732560314/arokya_milk_packet_vlcn8l.png',
    category: 'Milk',
    description: 'Farm-fresh milk, rich in nutrients'
  },
  {
    id: 2,
    name: 'Natural Yogurt',
    price: '₹40',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Yogurt',
    description: 'Creamy and probiotic-rich yogurt'
  },
  {
    id: 3,
    name: 'Vanilla Ice Cream',
    price: '₹150',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Ice Cream',
    description: 'Classic vanilla flavor'
  },
  {
    id: 4,
    name: 'Butter',
    price: '₹220',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561206/hastun_cooking_butter_vlueoj.png',
    category: 'Butter',
    description: 'Pure and creamy butter'
  },
  {
    id: 5,
    name: 'Paneer',
    price: '₹180',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732558453/Paneer_ezidtj.png',
    category: 'Cheese',
    description: 'Fresh cottage cheese'
  },
  {
    id: 6,
    name: 'Pure Ghee',
    price: '₹550',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732559843/hatsun_ekx2nc.png',
    category: 'Ghee',
    description: 'Traditional clarified butter'
  },
  // Add more products with similar structure...
  {
    id: 7,
    name: 'Chocolate Ice Cream',
    price: '₹180',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Ice Cream',
    description: 'Rich chocolate flavor'
  },
  // Add more products...
  {
    id: 8,
    name: 'Strawberry Ice Cream',
    price: '₹170',
    image: 'hhttps://images.jdmagicbox.com/quickquotes/images_main/hatsun-butter-07-01-2021-094-219989343-s9fs5.jpg',
    category: 'Ice Cream',
    description: 'Sweet and fruity strawberry delight'
  },
  {
    id: 9,
    name: 'Low-Fat Milk',
    price: '₹65',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732560314/arokya_milk_packet_vlcn8l.png',
    category: 'Milk',
    description: 'Healthy low-fat option'
  },
  {
    id: 10,
    name: 'Greek Yogurt',
    price: '₹80',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Yogurt',
    description: 'Thick and creamy Greek-style yogurt'
  },
  {
    id: 11,
    name: 'Salted Butter',
    price: '₹230',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561206/hastun_cooking_butter_vlueoj.png',
    category: 'Butter',
    description: 'Perfect for cooking and spreading'
  },
  {
    id: 12,
    name: 'Mozzarella Cheese',
    price: '₹250',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732558453/Paneer_ezidtj.png',
    category: 'Cheese',
    description: 'Ideal for pizzas and pasta'
  },
  {
    id: 13,
    name: 'Premium Ghee',
    price: '₹600',
    image: 'https://content.jdmagicbox.com/quickquotes/images_main/arokya-milk-and-milk-products-14-01-2021-001-220018752-q4j1s.png?impolicy=queryparam&im=Resize=(360,360),aspect=fit',
    category: 'Ghee',
    description: 'Extra pure premium quality ghee'
  },
  {
    id: 14,
    name: 'Fruit Yogurt',
    price: '₹45',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Yogurt',
    description: 'Mixed fruit flavored yogurt'
  },
  {
    id: 15,
    name: 'Butterscotch Ice Cream',
    price: '₹160',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png',
    category: 'Ice Cream',
    description: 'Rich butterscotch flavor'
  },
  // ... add more products as needed
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5e6d3] pt-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white py-12 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">Our Products</h1>
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300"
            >
              <div className="relative aspect-w-16 aspect-h-12 group">
                <motion.img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-contain p-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 
                        transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Shop; 