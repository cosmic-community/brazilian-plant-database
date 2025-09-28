import Link from 'next/link'
import { ArrowRight, Leaf, Calendar } from 'lucide-react'
import { getFeaturedSpecies } from '@/lib/cosmic'
import ConservationBadge from '@/components/ConservationBadge'

export default async function FeaturedSpecies() {
  const featuredSpecies = await getFeaturedSpecies()

  if (featuredSpecies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-600">No featured species available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredSpecies.map((species) => {
        const firstImage = species.metadata?.plant_images?.[0]
        const scientificName = species.metadata?.scientific_name
        const conservation = species.metadata?.conservation_status
        const floweringSeason = species.metadata?.flowering_season
        const family = species.metadata?.plant_family
        
        return (
          <article key={species.id} className="group bg-white rounded-xl shadow-lg overflow-hidden card-hover">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              {firstImage ? (
                <img
                  src={`${firstImage.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
                  alt={species.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-primary-400" />
                </div>
              )}
              
              {/* Conservation Badge Overlay */}
              {conservation && (
                <div className="absolute top-4 right-4">
                  <ConservationBadge status={conservation} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-3">
                <h3 className="text-xl font-bold text-secondary-900 mb-1">
                  {species.title}
                </h3>
                {scientificName && (
                  <p className="text-secondary-600 italic text-sm">
                    {scientificName}
                  </p>
                )}
              </div>

              {/* Family */}
              {family && (
                <div className="mb-3">
                  <Link 
                    href={`/families/${family.slug}`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
                  >
                    {family.title}
                  </Link>
                </div>
              )}

              {/* Description */}
              {species.metadata?.description && (
                <p className="text-secondary-600 text-sm mb-4 line-clamp-3">
                  {species.metadata.description.replace(/<[^>]*>/g, '').slice(0, 120)}...
                </p>
              )}

              {/* Flowering Season */}
              {floweringSeason && (
                <div className="flex items-center text-secondary-500 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Flowers: {floweringSeason}</span>
                </div>
              )}

              {/* View Details Link */}
              <Link 
                href={`/species/${species.slug}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors group"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}