export interface CityInventoryTab {
  key: string
  label: string
}

export const CITY_INVENTORY_TABS: CityInventoryTab[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'properties', label: 'Properties' },
  { key: 'stats', label: 'Stats' },
]

export interface FilterOption {
  value: string
  label: string
}

export interface FilterConfig {
  key: string
  label: string
  color: string
  options: FilterOption[]
}

export const FILTERS: FilterConfig[] = [
  {
    key: 'propertyType',
    label: 'Property Type',
    color: '#6B21A8',
    options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'villa', label: 'Villa' },
      { value: 'plot', label: 'Plot' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'penthouse', label: 'Penthouse' },
      { value: 'farmhouse', label: 'Farmhouse' },
    ],
  },
  {
    key: 'bhk',
    label: 'BHK',
    color: '#E91E8C',
    options: [
      { value: '1bhk', label: '1 BHK' },
      { value: '2bhk', label: '2 BHK' },
      { value: '3bhk', label: '3 BHK' },
      { value: '4bhk', label: '4 BHK' },
      { value: '5bhk', label: '5+ BHK' },
    ],
  },
  {
    key: 'budget',
    label: 'Budget',
    color: '#10B981',
    options: [
      { value: 'under50l', label: 'Under ₹50 L' },
      { value: '50l-1cr', label: '₹50 L – 1 Cr' },
      { value: '1cr-2cr', label: '₹1 Cr – 2 Cr' },
      { value: '2cr-5cr', label: '₹2 Cr – 5 Cr' },
      { value: '5cr-plus', label: '₹5 Cr+' },
    ],
  },
  {
    key: 'area',
    label: 'Area',
    color: '#3B82F6',
    options: [
      { value: 'under1000', label: 'Under 1,000 sq.ft' },
      { value: '1000-1500', label: '1,000 – 1,500 sq.ft' },
      { value: '1500-2000', label: '1,500 – 2,000 sq.ft' },
      { value: '2000-3000', label: '2,000 – 3,000 sq.ft' },
      { value: '3000-plus', label: '3,000+ sq.ft' },
    ],
  },
]

export interface Property {
  id: string
  name: string
  location: string
  type: string
  area: string
  status: string
  statusDetail: string
  price: string
  pricePerSqft: string
  image: string
  isFeatured?: boolean
  statusColor: 'brand' | 'warning'
}

export const PROPERTIES: Property[] = [
  {
    id: 'p-1',
    name: 'Prestige Beverly Hills',
    location: 'Gachibowli, Hyderabad',
    type: '3 BHK Apartment',
    area: '1860 sq.ft',
    status: 'Ready to Move',
    statusDetail: 'OC Received',
    price: '₹ 1.25 Cr',
    pricePerSqft: '₹ 6,720 / sq.ft',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    isFeatured: true,
    statusColor: 'brand'
  },
  {
    id: 'p-2',
    name: 'My Home Avatar',
    location: 'Tellapur, Hyderabad',
    type: '2 BHK Apartment',
    area: '1295 sq.ft',
    status: 'Under Construction',
    statusDetail: 'Poss. Dec 2025',
    price: '₹ 85 L',
    pricePerSqft: '₹ 6,560 / sq.ft',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=400&q=80',
    statusColor: 'warning'
  },
  {
    id: 'p-3',
    name: 'Aparna Zenon',
    location: 'Nallagandla, Hyderabad',
    type: '3 BHK Apartment',
    area: '1680 sq.ft',
    status: 'Under Construction',
    statusDetail: 'Poss. Jun 2026',
    price: '₹ 1.10 Cr',
    pricePerSqft: '₹ 6,550 / sq.ft',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=400&q=80',
    statusColor: 'warning'
  },
  {
    id: 'p-4',
    name: 'Hallmark 5A County',
    location: 'Kokapet, Hyderabad',
    type: '4 BHK Villa',
    area: '3200 sq.ft',
    status: 'Ready to Move',
    statusDetail: 'OC Received',
    price: '₹ 2.40 Cr',
    pricePerSqft: '₹ 7,500 / sq.ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    statusColor: 'brand'
  }
]
