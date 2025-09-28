import { Suspense } from 'react'
import { Metadata } from 'next'
import SpeciesList from '@/components/SpeciesList'
import SearchBar from '@/components/SearchBar'
import Loading from '@/components/Loading'

export const metadata: Metadata = {
  title: 'Plant Species',
  description: 'Browse our comprehensive database of Brazilian native plant species with detailed scientific information, images, and conservation status.',
}

export default function SpeciesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-hero-pattern border-b border-secondary-100">
        <div className="container-width section-padding py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary-900 mb-4">
              Plant Species Database
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
              Explore our comprehensive collection of Brazilian native plants, featuring detailed 
              scientific information, stunning photography, and conservation data.
            </p>
            <SearchBar placeholder="Search by species name or scientific name..." />
          </div>
        </div>
      </div>

      {/* Species List */}
      <section className="py-12">
        <div className="container-width section-padding">
          <Suspense fallback={<Loading />}>
            <SpeciesList />
          </Suspense>
        </div>
      </section>
    </div>
  )
}