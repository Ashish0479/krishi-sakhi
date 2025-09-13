// import React from "react";
// import ashish from '../../assets/ashish.jpeg';
// import pulkit from '../../assets/pulkit.jpeg';
// import farmland from '../../assets/farmland.jpg';
// import { useNavigate } from "react-router-dom";

// export default function AboutUs() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen flex flex-col relative bg-fixed bg-cover bg-center"
//       style={{ backgroundImage: `url(${farmland})` }}
//     >
//       {/* Gradient overlay for parallax effect */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20 pointer-events-none" />

//       {/* Navbar */}
//       <header className="relative z-10 h-16 px-6 flex items-center justify-between bg-green-700/95 text-white shadow-md">
//         <div className="text-2xl font-extrabold flex items-center gap-2">
//           🌾 <span onClick={() => navigate("/")}>Krishi Sakhi</span>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="relative z-10 flex-1 p-6 flex flex-col items-center">
//         <div className="max-w-5xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center">
//           <h1 className="text-4xl font-bold text-green-700 mb-6">About Krishi Sakhi</h1>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//             🌱 Krishi Sakhi is your personal farming companion. Our goal is to empower farmers with timely, personalized guidance on crop care, weather updates, pest management, and more.  
//           </p>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//             🚀 Built with modern technology like AI and real-time weather insights, Krishi Sakhi helps smallholder farmers make informed decisions to improve yield and reduce losses.
//           </p>
//           <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//             👥 Created by passionate developers and agricultural enthusiasts, our platform combines knowledge, innovation, and local insights to support every farmer's journey.
//           </p>
//         </div>

//         {/* Our Mission Section */}
//         <div className="max-w-5xl w-full mt-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center">
//           <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
//           <p className="text-gray-700 text-lg leading-relaxed">
//             At Krishi Sakhi, our mission is simple: provide accessible, personalized, and practical guidance to farmers, helping them optimize crop production, reduce risks, and embrace sustainable farming practices.  
//           </p>
//         </div>

//         {/* Creators Section */}
//         <section className="max-w-5xl w-full mt-16 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 text-center">
//           <h2 className="text-3xl font-bold text-green-700 mb-8">Meet the Creators</h2>
//           <div className="flex flex-wrap justify-center gap-12">
//             {/* Creator 1 */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src={ashish}
//                 alt="Ashish Kaushik"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4"
//               />
//               <h3 className="text-xl font-semibold text-green-700">Ashish Kaushik</h3>
//               <p className="text-gray-700">Full Stack Developer | MERN | AIML Enthusiast</p>
//             </div>

//             {/* Creator 2 */}
//             <div className="flex flex-col items-center text-center">
//               <img
//                 src=""
//                 alt="Pulkit Kaushik"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mb-4"
//               />
//               <h3 className="text-xl font-semibold text-green-700">Pulkit Kaushik</h3>
//               <p className="text-gray-700">Java Backend | Spring Boot Pro | Logic Lover</p>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="relative z-10 bg-green-700/95 text-white p-6 text-center mt-12">
//         <p>🌾 Krishi Sakhi &copy; 2025. All Rights Reserved.</p>
//       </footer>
//     </div>
//   );
// }
