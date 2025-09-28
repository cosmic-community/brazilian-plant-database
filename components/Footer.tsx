import Link from 'next/link'
import { Leaf, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container-width section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold">Brazilian Plants</span>
            </Link>
            <p className="text-secondary-300 text-sm leading-relaxed">
              A comprehensive digital encyclopedia showcasing Brazil's rich botanical heritage 
              and native plant species.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/species" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Plant Species
                </Link>
              </li>
              <li>
                <Link 
                  href="/families" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Plant Families
                </Link>
              </li>
              <li>
                <Link 
                  href="/habitats" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Habitats
                </Link>
              </li>
              <li>
                <Link 
                  href="/uses" 
                  className="text-secondary-300 hover:text-primary-400 transition-colors"
                >
                  Traditional Uses
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-secondary-400 text-sm">Conservation Status Guide</span>
              </li>
              <li>
                <span className="text-secondary-400 text-sm">Plant Family Classifications</span>
              </li>
              <li>
                <span className="text-secondary-400 text-sm">Habitat Information</span>
              </li>
              <li>
                <span className="text-secondary-400 text-sm">Traditional Knowledge</span>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-secondary-300 text-sm leading-relaxed mb-4">
              This database celebrates Brazil's incredible biodiversity, featuring native species 
              from the Atlantic Forest to the Cerrado Savanna.
            </p>
            <div className="flex items-center text-secondary-300 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-400 fill-current" />
              <span>for nature lovers</span>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondary-400 text-sm">
              © {currentYear} Brazilian Plant Database. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-secondary-400 text-sm">
                Powered by{' '}
                <a 
                  href="https://www.cosmicjs.com" 
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cosmic
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}