import Link from 'next/link'
import { ArrowRight, Search, Leaf, TreePine, MapPin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-hero-pattern min-h-[600px] flex items-center">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/90 to-white/70 z-10"
        style={{
          backgroundImage: 'url(https://imgix.cosmicjs.com/869a3920-9c56-11f0-bba7-d56988718db7-photo-1558618666-fcd25c85cd64-1759055588196.jpg?w=1920&h=1080&fit=crop&auto=format,compress&overlay64=MDAwMDAwODA)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}
      />
      
      <div className="container-width section-padding relative z-20">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6 animate-fade-in">
            Discover Brazil's
            <span className="block gradient-text">Native Flora</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-secondary-600 mb-8 max-w-3xl animate-slide-up">
            Explore a comprehensive digital encyclopedia of Brazilian native plants, 
            featuring the iconic Ipê-amarelo and hundreds of other species with detailed 
            scientific information, conservation status, and traditional uses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up">
            <Link href="/species" className="btn-primary inline-flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Explore Species
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link href="/families" className="btn-secondary inline-flex items-center">
              <TreePine className="w-5 h-5 mr-2" />
              Browse Families
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-scale-in">
            <div className="flex items-center space-x-3 text-secondary-700">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">4+</div>
                <div className="text-sm">Plant Species</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-secondary-700">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <TreePine className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm">Plant Families</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-secondary-700">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm">Native Habitats</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}