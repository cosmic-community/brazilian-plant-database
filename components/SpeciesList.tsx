import Link from 'next/link'
import { Leaf, Calendar, MapPin } from 'lucide-react'
import { getAllPlantSpecies } from '@/lib/cosmic'
import ConservationBadge from '@/components/ConservationBadge'

export default async function SpeciesList() {
  const species = await getAllPlantSpecies()

  if (species.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-600">No plant species found in the database.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {species.map((plant) => {
        const firstImage = plant.metadata?.plant_images?.[0]
        const scientificName = plant.metadata?.scientific_name
        const conservation = plant.metadata?.conservation_status
        const floweringSeason = plant.metadata?.flowering_season
        const family = plant.metadata?.plant_family
        const habitats = plant.metadata?.native_habitats || []
        
        return (
          <Link
            key={plant.id}
            href={`/species/${plant.slug}`}
            className="group block bg-white rounded-lg shadow-md overflow-hidden card-hover"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              {firstImage ? (
                <img
                  src={`${firstImage.imgix_url}?w=400&h=240&fit=crop&auto=format,compress`}
                  alt={plant.title}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-secondary-100 to-secondary-200 flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-secondary-400" />
                </div>
              )}
              
              {/* Conservation Badge */}
              {conservation && (
                <div className="absolute top-3 right-3">
                  <ConservationBadge status={conservation} size="small" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
                {plant.title}
              </h3>
              
              {scientificName && (
                <p className="text-secondary-600 italic text-sm mb-2">
                  {scientificName}
                </p>
              )}

              {/* Family */}
              {family && (
                <p className="text-primary-600 text-sm font-medium mb-2">
                  {family.title}
                </p>
              )}

              {/* Details */}
              <div className="space-y-2">
                {floweringSeason && (
                  <div className="flex items-center text-secondary-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{floweringSeason}</span>
                  </div>
                )}
                
                {habitats.length > 0 && (
                  <div className="flex items-center text-secondary-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {habitats.slice(0, 2).map(h => h.title).join(', ')}
                      {habitats.length > 2 && ` +${habitats.length - 2} more`}
                    </span>
                  </div>
                )}
              </div>

              {/* Description Preview */}
              {plant.metadata?.description && (
                <p className="text-secondary-600 text-sm mt-3 line-clamp-2">
                  {plant.metadata.description.replace(/<[^>]*>/g, '').slice(0, 100)}...
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}