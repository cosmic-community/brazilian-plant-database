# Brazilian Plant Database

![App Preview](https://imgix.cosmicjs.com/869a3920-9c56-11f0-bba7-d56988718db7-photo-1558618666-fcd25c85cd64-1759055588196.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive digital encyclopedia showcasing Brazilian native plants, featuring detailed information about species, habitats, uses, and conservation status. This interactive platform serves researchers, botanists, educators, and nature enthusiasts exploring Brazil's rich botanical heritage.

## ✨ Features

- 🌿 **Comprehensive Species Database** - Detailed profiles of Brazilian plant species with scientific information
- 🏛️ **Taxonomy Browser** - Explore plant families with characteristics and species counts  
- 🌍 **Habitat Explorer** - Discover native environments from rainforests to savannas
- 📚 **Traditional Knowledge** - Cultural significance and indigenous uses
- 🔍 **Advanced Search** - Find plants by name, family, habitat, or conservation status
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🖼️ **Visual Gallery** - High-resolution botanical photography
- 🎯 **Interactive Navigation** - Seamless browsing between related content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68d90c8de4b13704227fbc24&clone_repository=68d91029e4b13704227fbc4f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a company website with services, team members, testimonials, and case studies", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Images**: Optimized with imgix
- **Icons**: Lucide React
- **Runtime**: Bun

## 🚀 Getting Started

### Prerequisites

- Bun (latest version)
- Node.js 18+
- A Cosmic account with your content

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd brazilian-plant-database
```

2. **Install dependencies**
```bash
bun install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📖 Cosmic SDK Examples

### Fetching Plant Species with Related Data
```typescript
import { cosmic } from '@/lib/cosmic'

async function getPlantSpecies() {
  try {
    const response = await cosmic.objects
      .find({ type: 'plant-species' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1) // Include related objects
    
    return response.objects
  } catch (error) {
    console.error('Error fetching plant species:', error)
    return []
  }
}
```

### Querying by Conservation Status
```typescript
async function getEndangeredSpecies() {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'plant-species',
        'metadata.conservation_status.key': 'EN' 
      })
      .depth(1)
    
    return response.objects
  } catch (error) {
    return []
  }
}
```

## 🌐 Cosmic CMS Integration

This application connects to your Cosmic bucket to display:

- **Plant Species**: Scientific names, descriptions, characteristics, and images
- **Plant Families**: Taxonomic classifications with species counts
- **Habitats**: Native environments with climate and location data  
- **Plant Uses**: Traditional and modern applications
- **Conservation Data**: Protection status and environmental concerns

The content model uses object relationships to connect species with their families, habitats, and uses, creating a rich interconnected database of botanical information.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the dashboard
3. Deploy automatically

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in site settings
3. Deploy with build command: `bun run build`

### Manual Deployment
1. Build the application: `bun run build`
2. Upload the `.next` folder to your hosting provider
3. Set environment variables on your server

## 📝 Content Management

Access your Cosmic dashboard to:
- Add new plant species with detailed metadata
- Upload high-resolution botanical images
- Create habitat and usage information
- Manage taxonomic relationships
- Update conservation status data

For more information, visit the [Cosmic documentation](https://www.cosmicjs.com/docs).
<!-- README_END -->