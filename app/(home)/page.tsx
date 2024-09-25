'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileSearch, Clock, Shield, BarChart, Users, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import React from 'react';
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
    
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

function Header() {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-800">ReqTrack</h1>
        <nav className="hidden md:flex space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
        </nav>
        <Button asChild variant="outline" className="bg-white text-indigo-600 hover:bg-indigo-50">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-600 hover:text-indigo-600 transition-colors">
      {children}
    </Link>
  )
}

function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
            Revolutionize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Document Workflow
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            ReqTrack: The ultimate solution for tracking, managing, and expediting your documents with unparalleled efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-indigo-600 px-8 py-3 rounded-full">
              See How It Works
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Powerful Features for Seamless Tracking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileSearch className="h-8 w-8 text-indigo-600" />}
            title="Smart Document Search"
            description="Instantly locate any document with our advanced search and filtering capabilities."
          />
          <FeatureCard
            icon={<Clock className="h-8 w-8 text-indigo-600" />}
            title="Real-time Updates"
            description="Stay informed with instant notifications on your document's progress and status changes."
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8 text-indigo-600" />}
            title="Bank-level Security"
            description="Rest easy knowing your sensitive documents are protected with state-of-the-art encryption."
          />
          <FeatureCard
            icon={<BarChart className="h-8 w-8 text-indigo-600" />}
            title="Comprehensive Analytics"
            description="Gain valuable insights into processing times, bottlenecks, and efficiency metrics."
          />
          <FeatureCard
            icon={<Users className="h-8 w-8 text-indigo-600" />}
            title="Collaborative Workflows"
            description="Streamline approvals and feedback with built-in collaboration tools."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-indigo-600" />}
            title="Automated Processing"
            description="Leverage AI to automate routing, classification, and data extraction from your documents."
          />
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          How ReqTrack Transforms Your Workflow
        </h2>
        <div className="space-y-12">
          <WorkflowStep
            number={1}
            title="Upload and Classify"
            description="Securely upload your documents. Our AI automatically classifies and routes them appropriately."
          />
          <WorkflowStep
            number={2}
            title="Track and Monitor"
            description="Follow your document's journey in real-time with our intuitive dashboard and mobile app."
          />
          <WorkflowStep
            number={3}
            title="Collaborate and Approve"
            description="Seamlessly collaborate with team members, add comments, and approve documents within the platform."
          />
          <WorkflowStep
            number={4}
            title="Analyze and Optimize"
            description="Leverage powerful analytics to identify bottlenecks and continuously improve your processes."
          />
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="ReqTrack has cut our document processing time in half. It's a game-changer for our operations."
            author="Jane Doe"
            position="Operations Manager, TechCorp"
          />
          <TestimonialCard
            quote="The real-time tracking feature has dramatically improved our responsiveness to clients."
            author="John Smith"
            position="Client Services Director, LegalEase"
          />
          <TestimonialCard
            quote="Implementing ReqTrack was smooth, and the ROI was evident within weeks. Highly recommended!"
            author="Emily Chen"
            position="CTO, InnovateCo"
          />
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">
          Ready to Revolutionize Your Document Workflow?
        </h2>
        <p className="text-xl text-indigo-100 mb-8">
          Join thousands of organizations that have transformed their document management with ReqTrack.
          Start your free trial today and experience the future of efficient, secure document tracking.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input type="email" placeholder="Enter your work email" className="max-w-xs" />
          <Button type="submit" size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
            Start Free Trial
          </Button>
        </form>
      </div>
    </section>
  )
}

// function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
//         <div>
//           <h3 className="text-lg font-semibold mb-4">ReqTrack</h3>
//           <p className="text-gray-400">Revolutionizing document workflows</p>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Product</h4>
//           <ul className="space-y-2">
//             <li><Link href="#" className="text-gray-400 hover:text-white">Features</Link></li>
//             <li><Link href="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
//             <li><Link href="#" className="text-gray-400 hover:text-white">Use Cases</Link></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Company</h4>
//           <ul className="space-y-2">
//             <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
//             <li><Link href="#" className="text-gray-400 hover:text-white">Careers</Link></li>
//             <li><Link href="#" className="text-gray-400 hover:text-white">Contact</Link></li>
//           </ul>
//         </div>
//         <div>
//           <h4 className="text-lg font-semibold mb-4">Legal</h4>
//           <ul className="space-y-2">
//             <li><Link href="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
//             <li><Link href="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
//           </ul>
//         </div>
//       </div>
//       <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
//         <p>&copy; 2024 ReqTrack. All rights reserved.</p>
//       </div>
//     </footer>
//   )
// }

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="ml-4 text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

function WorkflowStep({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-start"
    >
      <div className="flex-shrink-0 bg-indigo-600 rounded-full p-3 text-white font-bold text-xl">
        {number}
      </div>
      <div className="ml-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

function TestimonialCard({ quote, author, position }: { quote: string; author: string; position: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md"
    >
      <p className="text-gray-600 mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </motion.div>
  )
}

 
