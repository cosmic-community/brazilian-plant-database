import { Suspense } from 'react'
import Hero from '@/components/Hero'
import FeaturedSpecies from '@/components/FeaturedSpecies'
import StatsSection from '@/components/StatsSection'
import CategoriesGrid from '@/components/CategoriesGrid'
import Loading from '@/components/Loading'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Statistics Section */}
      <Suspense fallback={<Loading />}>
        <StatsSection />
      </Suspense>
      
      {/* Featured Species */}
      <section className="py-16 bg-secondary-50">
        <div className="container-width section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Featured Species
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Discover some of Brazil's most iconic native plants, from the magnificent Ipê-amarelo 
              to the historic Pau-brasil that gave the country its name.
            </p>
          </div>
          <Suspense fallback={<Loading />}>
            <FeaturedSpecies />
          </Suspense>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-16">
        <div className="container-width section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Navigate through our comprehensive database organized by plant families, 
              native habitats, and traditional uses.
            </p>
          </div>
          <CategoriesGrid />
        </div>
      </section>
    </div>
  )
}