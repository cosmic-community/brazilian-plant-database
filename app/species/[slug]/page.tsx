// app/species/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Leaf, Calendar, Shield, TreePine } from 'lucide-react'
import { getPlantSpeciesBySlug } from '@/lib/cosmic'
import { SpeciesPageProps } from '@/types'
import ConservationBadge from '@/components/ConservationBadge'
import ImageGallery from '@/components/ImageGallery'
import CharacteristicsList from '@/components/CharacteristicsList'

export async function generateMetadata({ params }: SpeciesPageProps): Promise<Metadata> {
  const { slug } = await params
  const species = await getPlantSpeciesBySlug(slug)

  if (!species) {
    return {
      title: 'Species Not Found',
    }
  }

  const firstImage = species.metadata?.plant_images?.[0]?.imgix_url
  
  return {
    title: species.title,
    description: species.metadata?.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Learn about ${species.title}, a Brazilian native plant species.`,
    openGraph: {
      title: species.title,
      description: species.metadata?.description?.replace(/<[^>]*>/g, '').slice(0, 160) || `Learn about ${species.title}, a Brazilian native plant species.`,
      images: firstImage ? [{
        url: `${firstImage}?w=1200&h=630&fit=crop&auto=format,compress`,
        width: 1200,
        height: 630,
        alt: species.title,
      }] : [],
    },
  }
}

export default async function SpeciesDetailPage({ params }: SpeciesPageProps) {
  const { slug } = await params
  const species = await getPlantSpeciesBySlug(slug)

  if (!species) {
    notFound()
  }

  const commonNames = species.metadata?.common_names || []
  const scientificName = species.metadata?.scientific_name
  const family = species.metadata?.plant_family
  const habitats = species.metadata?.native_habitats || []
  const uses = species.metadata?.plant_uses || []
  const conservation = species.metadata?.conservation_status
  const images = species.metadata?.plant_images || []
  const characteristics = species.metadata?.physical_characteristics
  const floweringSeason = species.metadata?.flowering_season

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="border-b border-secondary-100">
        <div className="container-width section-padding py-4">
          <Link 
            href="/species"
            className="inline-flex items-center text-secondary-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Species
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="bg-hero-pattern border-b border-secondary-100">
        <div className="container-width section-padding py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-secondary-900 mb-2">
                {species.title}
              </h1>
              
              {scientificName && (
                <p className="text-xl italic text-secondary-600 mb-4">
                  {scientificName}
                </p>
              )}

              {commonNames.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-secondary-700 mb-2">
                    Common Names:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {commonNames.map((name, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-6">
                {family && (
                  <Link 
                    href={`/families/${family.slug}`}
                    className="flex items-center text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    <TreePine className="w-4 h-4 mr-2" />
                    {family.title}
                  </Link>
                )}

                {conservation && (
                  <ConservationBadge status={conservation} />
                )}

                {floweringSeason && (
                  <div className="flex items-center text-secondary-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{floweringSeason}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Main Image */}
            {images.length > 0 && (
              <div className="relative">
                <img
                  src={`${images[0].imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={species.title}
                  width={600}
                  height={400}
                  className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-12">
        <div className="container-width section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              {species.metadata?.description && (
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                    Description
                  </h2>
                  <div 
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: species.metadata.description }}
                  />
                </section>
              )}

              {/* Physical Characteristics */}
              {characteristics && (
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                    Physical Characteristics
                  </h2>
                  <CharacteristicsList characteristics={characteristics} />
                </section>
              )}

              {/* Image Gallery */}
              {images.length > 1 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-secondary-900 mb-6">
                    Image Gallery
                  </h2>
                  <ImageGallery images={images} alt={species.title} />
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Native Habitats */}
              {habitats.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Native Habitats
                  </h3>
                  <div className="space-y-3">
                    {habitats.map((habitat) => (
                      <Link
                        key={habitat.id}
                        href={`/habitats/${habitat.slug}`}
                        className="block p-4 border border-secondary-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all duration-200"
                      >
                        <h4 className="font-medium text-secondary-900 mb-2">
                          {habitat.title}
                        </h4>
                        {habitat.metadata?.location && (
                          <p className="text-sm text-secondary-600">
                            {habitat.metadata.location}
                          </p>
                        )}
                        {habitat.metadata?.climate_type && (
                          <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {habitat.metadata.climate_type.value}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* Plant Uses */}
              {uses.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2" />
                    Traditional Uses
                  </h3>
                  <div className="space-y-3">
                    {uses.map((use) => (
                      <div
                        key={use.id}
                        className="p-4 border border-secondary-200 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-secondary-900">
                            {use.title}
                          </h4>
                          {use.metadata?.use_type && (
                            <span className={`px-2 py-1 text-xs rounded-full use-${use.metadata.use_type.key}`}>
                              {use.metadata.use_type.value}
                            </span>
                          )}
                        </div>
                        {use.metadata?.description && (
                          <p className="text-sm text-secondary-600 mb-2">
                            {use.metadata.description}
                          </p>
                        )}
                        {use.metadata?.traditional_knowledge && (
                          <div className="border-t border-secondary-100 pt-2 mt-2">
                            <p className="text-xs text-secondary-500 italic">
                              Traditional Knowledge: {use.metadata.traditional_knowledge}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Conservation Info */}
              {conservation && (
                <section className="bg-secondary-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Conservation Status
                  </h3>
                  <ConservationBadge status={conservation} size="large" />
                  <div className="mt-4 text-sm text-secondary-600">
                    <p>
                      This species is currently classified as <strong>{conservation.value}</strong> 
                      according to conservation status guidelines.
                    </p>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}