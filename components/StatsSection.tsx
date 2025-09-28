import { getAllPlantSpecies, getAllPlantFamilies, getAllHabitats, getAllPlantUses } from '@/lib/cosmic'

export default async function StatsSection() {
  const [species, families, habitats, uses] = await Promise.all([
    getAllPlantSpecies(),
    getAllPlantFamilies(),
    getAllHabitats(),
    getAllPlantUses()
  ])

  const stats = [
    { label: 'Plant Species', value: species.length, icon: '🌿' },
    { label: 'Plant Families', value: families.length, icon: '🏛️' },
    { label: 'Native Habitats', value: habitats.length, icon: '🌍' },
    { label: 'Traditional Uses', value: uses.length, icon: '📚' }
  ]

  return (
    <section className="py-12 bg-white border-b border-secondary-100">
      <div className="container-width section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-secondary-900 mb-1">
                {stat.value}
              </div>
              <div className="text-secondary-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}