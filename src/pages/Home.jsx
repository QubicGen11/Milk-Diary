import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const milkVarieties = [
  {
    id: '01',
    name: 'Fresh Paneer',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/hatsun-paneer-07-01-2021-071-219989320-vhvva.png',
    description: 'Soft, fresh cottage cheese rich in protein and calcium'
  },
  {
    id: '02',
    name: 'Full Cream Milk',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732560314/arokya_milk_packet_vlcn8l.png',
    description: 'Rich in nutrients and naturally dairy-free'
  },
  {
    id: '03',
    name: 'Creamy Curd',
    image: 'https://res.cloudinary.com/defsu5bfc/image/upload/v1732559843/hatsun_ekx2nc.png', 
    description: 'Thick, creamy curd packed with probiotics and nutrients'
  }
];

const Home = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1572105697180-8d03f3a6b0f3?q=80&w=1896&auto=format&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Fresh Dairy Products
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 mb-8"
            >
              Quality milk products delivered fresh to your doorstep
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="/shop" 
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Milk Varieties Section */}
      <section className="py-20 bg-[#f5e6d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            A wide variety of plant based milk
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {milkVarieties.map((milk) => (
              <motion.div
                key={milk.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative bg-[#f5e6d3] rounded-3xl p-8 group cursor-pointer"
              >
                <div className="relative">
                  <motion.div
                    className="w-64 h-64 mx-auto rounded-full overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={milk.image}
                      alt={milk.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    {milk.id}
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-6"
                >
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">
                    {milk.name}
                  </h3>
                  <p className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {milk.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                {/* Add icon here */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
              <p className="text-gray-600">Daily fresh dairy products from local farms</p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                {/* Add icon here */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same day delivery to your doorstep</p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-20 h-20 mx-auto mb-4">
                {/* Add icon here */}
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
              <p className="text-gray-600">100% quality guarantee on all products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 