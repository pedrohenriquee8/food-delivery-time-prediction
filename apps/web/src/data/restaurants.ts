import type { Banner, RestaurantSection } from '../types'

const burgerHouse: RestaurantSection['restaurants'][number] = {
  id: 'burger-house',
  name: 'Burger House',
  imageUrl:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=225&fit=crop',
  rating: 4.6,
  reviewCount: '40 mil+',
  distance: '1,2 km',
  estimatedTime: '18 min',
  deliveryFee: 'Entrega grátis acima de R$ 35',
  promotion: 'Item grátis em pedidos acima de R$ 50',
  categoryIds: ['hamburgueres', 'fast-food'],
}

const tacoStation: RestaurantSection['restaurants'][number] = {
  id: 'taco-station',
  name: 'Taco Station',
  imageUrl:
    'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=225&fit=crop',
  rating: 4.5,
  reviewCount: '28 mil+',
  distance: '0,8 km',
  estimatedTime: '15 min',
  deliveryFee: 'Taxa de entrega R$ 4,99',
  promotion: '20% off no primeiro pedido',
  categoryIds: ['mexicana', 'latina'],
}

const theMelted: RestaurantSection['restaurants'][number] = {
  id: 'the-melted',
  name: 'The Melted',
  imageUrl:
    'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=225&fit=crop',
  rating: 4.7,
  reviewCount: '15 mil+',
  distance: '2,1 km',
  estimatedTime: '22 min',
  deliveryFee: 'Entrega grátis acima de R$ 40',
  promotion: 'Combo duplo por R$ 29,90',
  categoryIds: ['hamburgueres', 'sanduiches', 'fast-food'],
}

const wingSpot: RestaurantSection['restaurants'][number] = {
  id: 'wing-spot',
  name: 'Wing Spot',
  imageUrl:
    'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&h=225&fit=crop',
  rating: 4.4,
  reviewCount: '12 mil+',
  distance: '1,5 km',
  estimatedTime: '20 min',
  deliveryFee: 'Taxa de entrega R$ 6,99',
  promotion: 'Asas em dobro às quartas',
  categoryIds: ['frango', 'fast-food'],
}

const pizzaClub: RestaurantSection['restaurants'][number] = {
  id: 'pizza-club',
  name: 'Pizza Club',
  imageUrl:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=225&fit=crop',
  rating: 4.8,
  reviewCount: '55 mil+',
  distance: '1,0 km',
  estimatedTime: '25 min',
  deliveryFee: 'Entrega grátis acima de R$ 45',
  promotion: '2ª pizza pela metade do preço',
  categoryIds: ['pizza'],
}

const chickenExpress: RestaurantSection['restaurants'][number] = {
  id: 'chicken-express',
  name: 'Chicken Express',
  imageUrl:
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=225&fit=crop',
  rating: 4.3,
  reviewCount: '32 mil+',
  distance: '0,6 km',
  estimatedTime: '14 min',
  deliveryFee: 'Taxa de entrega R$ 3,99',
  promotion: 'Balde família com 15% off',
  categoryIds: ['frango', 'fast-food'],
}

const freshBowl: RestaurantSection['restaurants'][number] = {
  id: 'fresh-bowl',
  name: 'Fresh Bowl',
  imageUrl:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=225&fit=crop',
  rating: 4.9,
  reviewCount: '8 mil+',
  distance: '1,8 km',
  estimatedTime: '19 min',
  deliveryFee: 'Entrega grátis acima de R$ 30',
  promotion: 'Bowl do dia com desconto',
  categoryIds: ['saudavel'],
}

const coffeeCorner: RestaurantSection['restaurants'][number] = {
  id: 'coffee-corner',
  name: 'Coffee Corner',
  imageUrl:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=225&fit=crop',
  rating: 4.6,
  reviewCount: '22 mil+',
  distance: '0,4 km',
  estimatedTime: '12 min',
  deliveryFee: 'Taxa de entrega R$ 2,99',
  promotion: 'Café + pão de queijo por R$ 12',
  categoryIds: ['cafe', 'cafe-manha'],
}

const sushiWave: RestaurantSection['restaurants'][number] = {
  id: 'sushi-wave',
  name: 'Sushi Wave',
  imageUrl:
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=225&fit=crop',
  rating: 4.7,
  reviewCount: '18 mil+',
  distance: '2,4 km',
  estimatedTime: '28 min',
  deliveryFee: 'Entrega grátis acima de R$ 60',
  promotion: 'Combinado especial R$ 49,90',
  categoryIds: ['saudavel'],
}

const pastaLab: RestaurantSection['restaurants'][number] = {
  id: 'pasta-lab',
  name: 'Pasta Lab',
  imageUrl:
    'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=225&fit=crop',
  rating: 4.5,
  reviewCount: '9 mil+',
  distance: '1,3 km',
  estimatedTime: '24 min',
  deliveryFee: 'Taxa de entrega R$ 5,49',
  promotion: 'Massa artesanal com molho grátis',
  categoryIds: ['comida-caseira'],
}

const bbqNation: RestaurantSection['restaurants'][number] = {
  id: 'bbq-nation',
  name: 'BBQ Nation',
  imageUrl:
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=225&fit=crop',
  rating: 4.6,
  reviewCount: '26 mil+',
  distance: '3,0 km',
  estimatedTime: '30 min',
  deliveryFee: 'Entrega grátis acima de R$ 55',
  promotion: 'Ribs com acompanhamento grátis',
  categoryIds: ['carnes'],
}

const sweetTreats: RestaurantSection['restaurants'][number] = {
  id: 'sweet-treats',
  name: 'Sweet Treats',
  imageUrl:
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=225&fit=crop',
  rating: 4.8,
  reviewCount: '11 mil+',
  distance: '0,9 km',
  estimatedTime: '16 min',
  deliveryFee: 'Taxa de entrega R$ 4,49',
  promotion: 'Sobremesa grátis acima de R$ 40',
  categoryIds: ['sobremesas'],
}

export const restaurantSections: RestaurantSection[] = [
  {
    id: 'low-delivery-fee',
    title: 'Entrega por menos de R$ 10',
    restaurants: [burgerHouse, tacoStation, chickenExpress, coffeeCorner],
  },
  {
    id: 'national-favorites',
    title: 'Favoritos nacionais',
    restaurants: [pizzaClub, theMelted, wingSpot, bbqNation],
  },
  {
    id: 'nearby-popular',
    title: 'Mais pedidos perto de você',
    restaurants: [freshBowl, sushiWave, pastaLab, sweetTreats],
  },
]

export const promotionalBanners: Banner[] = [
  {
    id: 'first-order',
    variant: 'pink',
    title: '40% de desconto no primeiro pedido',
    code: 'NOVO40',
    ctaLabel: 'Saiba mais',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&h=200&fit=crop',
  },
  {
    id: 'subscription',
    variant: 'teal',
    title: 'R$ 0 em taxas de entrega',
    subtitle: 'Ofertas exclusivas para membros',
    ctaLabel: 'Assinar',
    badge: 'FoodPass',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
  },
]
