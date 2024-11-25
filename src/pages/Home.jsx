import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

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

const faqs = [
  {
    question: "What makes Arokya milk products special?",
    answer: "Arokya milk products are known for their high quality and purity. Our milk is sourced from select dairy farms, undergoes rigorous quality testing, and is processed using state-of-the-art technology to ensure maximum freshness and nutritional value."
  },
  {
    question: "What varieties of Hatsun ice creams are available?",
    answer: "Hatsun offers a wide range of ice cream flavors including vanilla, chocolate, strawberry, butterscotch, and premium varieties like Belgian chocolate and fruit-based flavors. We also have special ice cream cakes and party packs available."
  },
  {
    question: "Tell me about Arun's dairy product range",
    answer: "Arun offers a comprehensive range of dairy products including fresh milk, flavored milk, curd, buttermilk, ghee, paneer, and ice creams. All products are made from pure milk sourced from our network of dairy farmers and processed in modern facilities."
  },
  {
    question: "How is the quality of paneer maintained?",
    answer: "Our paneer is made from fresh, pure milk using traditional methods combined with modern technology. It's rich in protein, has the perfect soft texture, and is packaged hygienically to maintain freshness. We ensure strict quality control at every step of production."
  },
  {
    question: "What special features does your ghee have?",
    answer: "Our ghee is made using the traditional 'bilona' method, where cream is collected and churned into butter, then clarified to make pure ghee. It has a rich golden color, granular texture, and authentic aroma that enhances the taste of any dish."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full py-6 flex justify-between items-center text-left"
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-blue-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <MinusIcon className="h-6 w-6 text-pink-500" />
          ) : (
            <PlusIcon className="h-6 w-6 text-blue-900" />
          )}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const carouselImages = [
    {
      src: "https://res.cloudinary.com/defsu5bfc/image/upload/v1732561206/hastun_cooking_butter_vlueoj.png",
      alt: "Cooking Butter"
    },
    {
      src: "https://res.cloudinary.com/defsu5bfc/image/upload/v1732561139/arun_icecream_zjzseo.png", 
      alt: "Arun Ice Cream"
    },
    {
      src: "https://res.cloudinary.com/defsu5bfc/image/upload/v1732558453/Paneer_ezidtj.png",
      alt: "Paneer"
    },
    {
      src: "https://res.cloudinary.com/defsu5bfc/image/upload/v1732561370/table_butter_qoqaas.png",
      alt: "Table Butter"
    },
    {
      src: "https://res.cloudinary.com/defsu5bfc/image/upload/v1732559843/hatsun_ekx2nc.png",
      alt: "Hatsun"
    }
  ];

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

      {/* Featured Product Section */}
      <section className="py-20 bg-[#f5e6d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <span className="text-green-600 font-medium">Skillset</span>
              <h2 className="text-5xl font-bold text-[#2F4858] leading-tight">
                #1 ONLY PURE MILK<br />
              </h2>
              <p className="text-gray-600 text-lg">
                We have been working in this industry for more than 30 year with trust and honesty. 
                All hands must be on deck if we are to achieve our goal.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-8 py-3 border-2 border-[#2F4858] text-[#2F4858] font-medium rounded-lg hover:bg-[#2F4858] hover:text-white transition-colors duration-300"
              >
                MORE PRODUCTS
              </motion.button>
            </motion.div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-green-200 rounded-full blur-3xl opacity-20 transform -rotate-6"></div>
              <motion.img
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                src="https://res.cloudinary.com/defsu5bfc/image/upload/v1732560606/arokya_pink_yertwt.png" // Replace with your image
                alt="Organic Milk Bottle"
                className="relative z-10 mx-auto h-[600px] object-contain"
              />
            </motion.div>

            {/* Right Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8 md:col-start-2"
            >
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2F4858] mb-2">100% ORGANIC PRODUCT</h3>
                  <p className="text-gray-600">Content farm is a company that employ large numbers countdown.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2F4858] mb-2">100% ORGANIC PRODUCT</h3>
                  <p className="text-gray-600">Content farm is a company that employ large numbers countdown.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2F4858] mb-2">100% ORGANIC PRODUCT</h3>
                  <p className="text-gray-600">Content farm is a company that employ large numbers countdown.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milk Varieties Section */}
      <section className="py-20 bg-[#f5e6d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-blue-900 mb-16"
          >
            A wide variety of our Products
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

  

      {/* FAQ Section */}
      <section className="py-20 bg-[#f5e6d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* FAQ Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="carousel-images relative h-96 w-full overflow-hidden rounded-3xl">
                {carouselImages.map((image, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-full h-full"
                    initial={{ opacity: 0, x: 300 }}
                    animate={{
                      opacity: currentImage === index ? 1 : 0,
                      x: currentImage === index ? 0 : -300,
                    }}
                    transition={{
                      opacity: { duration: 0.5 },
                      x: { duration: 0.5 },
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                ))}
                
                {/* Add carousel indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentImage === index ? 'bg-blue-600 w-4' : 'bg-blue-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-8 shadow-lg">
                <h3 className="text-3xl font-bold text-blue-900">FAQ&apos;s</h3>
              </div>
            </motion.div>

            {/* FAQ List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customers Talk Section */}
      <section className="py-20 bg-[#f5e6d3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real experiences from our valued customers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                className="flex mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Exceptional Quality & Taste</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "I've tried many dairy products, but Arokya's quality is unmatched. The milk is fresh, 
                  and their paneer is absolutely divine. It's become an essential part of my daily cooking!"
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">Praneeth Joseph,</span>
                  <span className="ml-2 text-gray-500">Food Enthusiast</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                className="flex mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Ice Cream Selection</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "The variety of ice cream flavors is amazing! My family especially loves the Belgian 
                  chocolate and butterscotch. The quality is consistent, and the taste is simply incredible."
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">David Manoj,</span>
                  <span className="ml-2 text-gray-500">Ice Cream Connoisseur</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div 
                className="flex mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fresh & Healthy Products</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  "As a health-conscious person, I appreciate the purity of Arokya's products. Their curd 
                  is perfectly set, and the ghee has that authentic homemade taste. Simply outstanding!"
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900">Justin Sanju,</span>
                  <span className="ml-2 text-gray-500">Wellness Coach</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg">Experience the difference with our premium dairy products</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 - Fresh Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
                <motion.div 
                  className="relative bg-white rounded-full p-6 w-24 h-24 mx-auto border-2 border-blue-100 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">Fresh Products</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Sourced daily from local farms, ensuring the highest quality and freshness in every product</p>
            
            </motion.div>
            
            {/* Feature 2 - Fast Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
                <motion.div 
                  className="relative bg-white rounded-full p-6 w-24 h-24 mx-auto border-2 border-green-100 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-green-600 transition-colors">Fast Delivery</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Same-day delivery service to ensure your dairy products arrive fresh at your doorstep</p>
           
            </motion.div>
            
            {/* Feature 3 - Quality Assured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-pink-100 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
                <motion.div 
                  className="relative bg-white rounded-full p-6 w-24 h-24 mx-auto border-2 border-pink-100 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3 group-hover:text-pink-600 transition-colors">Quality Assured</h3>
              <p className="text-gray-600 max-w-xs mx-auto">100% quality guarantee with rigorous testing and premium standards for all products</p>
             
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 