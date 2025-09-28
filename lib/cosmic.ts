import { createBucketClient } from '@cosmicjs/sdk'
import { PlantSpecies, PlantFamily, Habitat, PlantUse, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Get all plant species with related data
export async function getAllPlantSpecies(): Promise<PlantSpecies[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'plant-species' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as PlantSpecies[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching plant species:', error);
    return [];
  }
}

// Get single plant species by slug
export async function getPlantSpeciesBySlug(slug: string): Promise<PlantSpecies | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'plant-species',
      slug
    }).depth(1);
    
    return response.object as PlantSpecies;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching plant species:', error);
    return null;
  }
}

// Get all plant families
export async function getAllPlantFamilies(): Promise<PlantFamily[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'plant-families' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.objects as PlantFamily[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching plant families:', error);
    return [];
  }
}

// Get single plant family by slug
export async function getPlantFamilyBySlug(slug: string): Promise<PlantFamily | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'plant-families',
      slug
    });
    
    return response.object as PlantFamily;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching plant family:', error);
    return null;
  }
}

// Get species by family
export async function getSpeciesByFamily(familyId: string): Promise<PlantSpecies[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'plant-species',
        'metadata.plant_family': familyId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as PlantSpecies[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching species by family:', error);
    return [];
  }
}

// Get all habitats
export async function getAllHabitats(): Promise<Habitat[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'habitats' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.objects as Habitat[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching habitats:', error);
    return [];
  }
}

// Get single habitat by slug
export async function getHabitatBySlug(slug: string): Promise<Habitat | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'habitats',
      slug
    });
    
    return response.object as Habitat;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    console.error('Error fetching habitat:', error);
    return null;
  }
}

// Get all plant uses
export async function getAllPlantUses(): Promise<PlantUse[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'plant-uses' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail']);
    
    return response.objects as PlantUse[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error fetching plant uses:', error);
    return [];
  }
}

// Search species by query
export async function searchPlantSpecies(query: string): Promise<PlantSpecies[]> {
  try {
    // Search by title and scientific name
    const titleResponse = await cosmic.objects
      .find({ 
        type: 'plant-species',
        title: { $regex: query, $options: 'i' }
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);

    const scientificResponse = await cosmic.objects
      .find({ 
        type: 'plant-species',
        'metadata.scientific_name': { $regex: query, $options: 'i' }
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);

    // Combine and deduplicate results
    const allResults = [...titleResponse.objects, ...scientificResponse.objects];
    const uniqueResults = allResults.filter((item, index, self) => 
      self.findIndex(t => t.id === item.id) === index
    );

    return uniqueResults as PlantSpecies[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    console.error('Error searching plant species:', error);
    return [];
  }
}

// Get featured species (first 3 with images)
export async function getFeaturedSpecies(): Promise<PlantSpecies[]> {
  try {
    const allSpecies = await getAllPlantSpecies();
    
    // Filter species that have images and sort by title
    const speciesWithImages = allSpecies
      .filter(species => species.metadata?.plant_images && species.metadata.plant_images.length > 0)
      .sort((a, b) => a.title.localeCompare(b.title))
      .slice(0, 3);
    
    return speciesWithImages;
  } catch (error) {
    console.error('Error fetching featured species:', error);
    return [];
  }
}