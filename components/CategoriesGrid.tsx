import Link from 'next/link'
import { TreePine, MapPin, Leaf, BookOpen } from 'lucide-react'

const categories = [
  {
    title: 'Plant Families',
    description: 'Explore taxonomic classifications and characteristics of Brazilian plant families.',
    href: '/families',
    icon: TreePine,
    color: 'bg-blue-500'
  },
  {
    title: 'Native Habitats',
    description: 'Discover the diverse ecosystems where Brazilian plants naturally thrive.',
    href: '/habitats',
    icon: MapPin,
    color: 'bg-green-500'
  },
  {
    title: 'Plant Uses',
    description: 'Learn about traditional and modern applications of Brazilian native plants.',
    href: '/uses',
    icon: BookOpen,
    color: 'bg-purple-500'
  },
  {
    title: 'All Species',
    description: 'Browse our complete database of Brazilian plant species with detailed profiles.',
    href: '/species',
    icon: Leaf,
    color: 'bg-amber-500'
  }
]

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="group block p-6 bg-white rounded-xl shadow-lg card-hover border border-secondary-100"
        >
          <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <category.icon className="w-6 h-6 text-white" />
          </div>
          
          <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.title}
          </h3>
          
          <p className="text-secondary-600 text-sm">
            {category.description}
          </p>
        </Link>
      ))}
    </div>
  )
}