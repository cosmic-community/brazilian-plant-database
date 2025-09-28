// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  thumbnail?: string;
  published_at?: string;
}

// Plant Family interface
export interface PlantFamily extends CosmicObject {
  type: 'plant-families';
  metadata: {
    family_name?: string;
    common_name?: string;
    description?: string;
    characteristics?: string[];
    species_count?: number;
  };
}

// Habitat interface  
export interface Habitat extends CosmicObject {
  type: 'habitats';
  metadata: {
    habitat_name?: string;
    location?: string;
    climate_type?: {
      key: string;
      value: string;
    };
    description?: string;
    environmental_conditions?: {
      rainfall?: string;
      temperature?: string;
      humidity?: string;
      elevation?: string;
      soil_type?: string;
    };
  };
}

// Plant Use interface
export interface PlantUse extends CosmicObject {
  type: 'plant-uses';
  metadata: {
    use_category?: string;
    use_type?: {
      key: string;
      value: string;
    };
    description?: string;
    traditional_knowledge?: string;
  };
}

// Plant Species interface
export interface PlantSpecies extends CosmicObject {
  type: 'plant-species';
  metadata: {
    scientific_name?: string;
    common_names?: string[];
    plant_family?: PlantFamily;
    description?: string;
    physical_characteristics?: {
      height?: string;
      trunk_diameter?: string;
      bark?: string;
      leaves?: string;
      flowers?: string;
      fruit?: string;
      flowering_period?: string;
    };
    native_habitats?: Habitat[];
    plant_uses?: PlantUse[];
    conservation_status?: {
      key: string;
      value: string;
    };
    flowering_season?: string;
    plant_images?: {
      url: string;
      imgix_url: string;
    }[];
  };
}

// API Response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Conservation status types
export type ConservationStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR';

// Use type categories
export type UseType = 'medicinal' | 'ornamental' | 'timber' | 'cultural' | 'food';

// Climate types
export type ClimateType = 'tropical' | 'subtropical' | 'temperate' | 'arid';

// Component prop types
export interface SpeciesCardProps {
  species: PlantSpecies;
  showDescription?: boolean;
  className?: string;
}

export interface FamilyCardProps {
  family: PlantFamily;
  className?: string;
}

export interface HabitatCardProps {
  habitat: Habitat;
  className?: string;
}

export interface UseCardProps {
  use: PlantUse;
  className?: string;
}

// Search and filter types
export interface SearchFilters {
  family?: string;
  habitat?: string;
  useType?: string;
  conservationStatus?: string;
  query?: string;
}

// Page props for Next.js dynamic routes
export interface SpeciesPageProps {
  params: Promise<{ slug: string }>;
}

export interface FamilyPageProps {
  params: Promise<{ slug: string }>;
}

export interface HabitatPageProps {
  params: Promise<{ slug: string }>;
}