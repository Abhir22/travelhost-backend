import { PrismaClient, DESTINATIONTYPE_ENUM } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create Countries
  const india = await prisma.country.upsert({
    where: { name: 'India' },
    update: {},
    create: {
      name: 'India',
      isoCode: 'IN',
    },
  });

  const usa = await prisma.country.upsert({
    where: { name: 'United States' },
    update: {},
    create: {
      name: 'United States',
      isoCode: 'US',
    },
  });

  const thailand = await prisma.country.upsert({
    where: { name: 'Thailand' },
    update: {},
    create: {
      name: 'Thailand',
      isoCode: 'TH',
    },
  });

  const france = await prisma.country.upsert({
    where: { name: 'France' },
    update: {},
    create: {
      name: 'France',
      isoCode: 'FR',
    },
  });

  const japan = await prisma.country.upsert({
    where: { name: 'Japan' },
    update: {},
    create: {
      name: 'Japan',
      isoCode: 'JP',
    },
  });

  console.log('✅ Countries created');

  // Create States for India
  const westBengal = await prisma.state.upsert({
    where: { id: 'west-bengal-id' },
    update: {},
    create: {
      id: 'west-bengal-id',
      name: 'West Bengal',
      countryId: india.id,
    },
  });

  const maharashtra = await prisma.state.upsert({
    where: { id: 'maharashtra-id' },
    update: {},
    create: {
      id: 'maharashtra-id',
      name: 'Maharashtra',
      countryId: india.id,
    },
  });

  const rajasthan = await prisma.state.upsert({
    where: { id: 'rajasthan-id' },
    update: {},
    create: {
      id: 'rajasthan-id',
      name: 'Rajasthan',
      countryId: india.id,
    },
  });

  const kerala = await prisma.state.upsert({
    where: { id: 'kerala-id' },
    update: {},
    create: {
      id: 'kerala-id',
      name: 'Kerala',
      countryId: india.id,
    },
  });

  const goa = await prisma.state.upsert({
    where: { id: 'goa-id' },
    update: {},
    create: {
      id: 'goa-id',
      name: 'Goa',
      countryId: india.id,
    },
  });

  // Create States for other countries
  const california = await prisma.state.upsert({
    where: { id: 'california-id' },
    update: {},
    create: {
      id: 'california-id',
      name: 'California',
      countryId: usa.id,
    },
  });

  const bangkok = await prisma.state.upsert({
    where: { id: 'bangkok-id' },
    update: {},
    create: {
      id: 'bangkok-id',
      name: 'Bangkok',
      countryId: thailand.id,
    },
  });

  console.log('✅ States created');

  // Create Cities
  const kolkata = await prisma.city.upsert({
    where: { id: 'kolkata-id' },
    update: {},
    create: {
      id: 'kolkata-id',
      name: 'Kolkata',
      countryId: india.id,
      stateId: westBengal.id,
    },
  });

  const darjeeling = await prisma.city.upsert({
    where: { id: 'darjeeling-id' },
    update: {},
    create: {
      id: 'darjeeling-id',
      name: 'Darjeeling',
      countryId: india.id,
      stateId: westBengal.id,
    },
  });

  const mumbai = await prisma.city.upsert({
    where: { id: 'mumbai-id' },
    update: {},
    create: {
      id: 'mumbai-id',
      name: 'Mumbai',
      countryId: india.id,
      stateId: maharashtra.id,
    },
  });

  const pune = await prisma.city.upsert({
    where: { id: 'pune-id' },
    update: {},
    create: {
      id: 'pune-id',
      name: 'Pune',
      countryId: india.id,
      stateId: maharashtra.id,
    },
  });

  const jaipur = await prisma.city.upsert({
    where: { id: 'jaipur-id' },
    update: {},
    create: {
      id: 'jaipur-id',
      name: 'Jaipur',
      countryId: india.id,
      stateId: rajasthan.id,
    },
  });

  const kochi = await prisma.city.upsert({
    where: { id: 'kochi-id' },
    update: {},
    create: {
      id: 'kochi-id',
      name: 'Kochi',
      countryId: india.id,
      stateId: kerala.id,
    },
  });

  const panaji = await prisma.city.upsert({
    where: { id: 'panaji-id' },
    update: {},
    create: {
      id: 'panaji-id',
      name: 'Panaji',
      countryId: india.id,
      stateId: goa.id,
    },
  });

  console.log('✅ Cities created');

  // Create Sightseeing places
  const sightseeingPlaces = [
    {
      id: 'victoria-memorial-id',
      name: 'Victoria Memorial',
      cityId: kolkata.id,
    },
    {
      id: 'howrah-bridge-id',
      name: 'Howrah Bridge',
      cityId: kolkata.id,
    },
    {
      id: 'tiger-hill-id',
      name: 'Tiger Hill',
      cityId: darjeeling.id,
    },
    {
      id: 'gateway-of-india-id',
      name: 'Gateway of India',
      cityId: mumbai.id,
    },
    {
      id: 'hawa-mahal-id',
      name: 'Hawa Mahal',
      cityId: jaipur.id,
    },
  ];

  for (const sight of sightseeingPlaces) {
    await prisma.sightseeing.upsert({
      where: { id: sight.id },
      update: {},
      create: sight,
    });
  }

  console.log('✅ Sightseeing places created');

  // Create Hotel Types
  const hotelTypes = [
    { id: 'luxury-id', name: 'Luxury', description: 'Premium luxury hotels' },
    { id: 'business-id', name: 'Business', description: 'Business class hotels' },
    { id: 'budget-id', name: 'Budget', description: 'Budget-friendly hotels' },
    { id: 'resort-id', name: 'Resort', description: 'Resort and spa hotels' },
    { id: 'boutique-id', name: 'Boutique', description: 'Boutique hotels' },
  ];

  for (const type of hotelTypes) {
    await prisma.hotelType.upsert({
      where: { id: type.id },
      update: {},
      create: type,
    });
  }

  console.log('✅ Hotel types created');

  // Create Meal Categories
  const mealCategories = [
    { id: 'vegetarian-id', name: 'Vegetarian' },
    { id: 'non-vegetarian-id', name: 'Non-Vegetarian' },
    { id: 'vegan-id', name: 'Vegan' },
    { id: 'gluten-free-id', name: 'Gluten Free' },
    { id: 'continental-id', name: 'Continental' },
  ];

  for (const category of mealCategories) {
    await prisma.mealCategory.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  console.log('✅ Meal categories created');

  // Create Hotels
  const hotels = [
    {
      id: 'oberoi-grand-id',
      name: 'The Oberoi Grand Kolkata',
      rating: 5,
      cityId: kolkata.id,
      hotelTypeId: 'luxury-id',
      thumbnail: 'https://example.com/oberoi-grand.jpg',
    },
    {
      id: 'taj-bengal-id',
      name: 'Taj Bengal Kolkata',
      rating: 5,
      cityId: kolkata.id,
      hotelTypeId: 'luxury-id',
      thumbnail: 'https://example.com/taj-bengal.jpg',
    },
    {
      id: 'hyatt-regency-kolkata-id',
      name: 'Hyatt Regency Kolkata',
      rating: 4,
      cityId: kolkata.id,
      hotelTypeId: 'business-id',
      thumbnail: 'https://example.com/hyatt-kolkata.jpg',
    },
    {
      id: 'mayfair-darjeeling-id',
      name: 'Mayfair Darjeeling',
      rating: 4,
      cityId: darjeeling.id,
      hotelTypeId: 'resort-id',
      thumbnail: 'https://example.com/mayfair-darjeeling.jpg',
    },
    {
      id: 'windamere-hotel-id',
      name: 'Windamere Hotel Darjeeling',
      rating: 3,
      cityId: darjeeling.id,
      hotelTypeId: 'boutique-id',
      thumbnail: 'https://example.com/windamere.jpg',
    },
    {
      id: 'taj-mahal-palace-id',
      name: 'Taj Mahal Palace Mumbai',
      rating: 5,
      cityId: mumbai.id,
      hotelTypeId: 'luxury-id',
      thumbnail: 'https://example.com/taj-mumbai.jpg',
    },
    {
      id: 'trident-mumbai-id',
      name: 'Trident Mumbai',
      rating: 4,
      cityId: mumbai.id,
      hotelTypeId: 'business-id',
      thumbnail: 'https://example.com/trident-mumbai.jpg',
    },
    {
      id: 'rambagh-palace-id',
      name: 'Rambagh Palace Jaipur',
      rating: 5,
      cityId: jaipur.id,
      hotelTypeId: 'luxury-id',
      thumbnail: 'https://example.com/rambagh-palace.jpg',
    },
    {
      id: 'grand-hyatt-kochi-id',
      name: 'Grand Hyatt Kochi',
      rating: 5,
      cityId: kochi.id,
      hotelTypeId: 'luxury-id',
      thumbnail: 'https://example.com/grand-hyatt-kochi.jpg',
    },
    {
      id: 'taj-exotica-goa-id',
      name: 'Taj Exotica Resort & Spa Goa',
      rating: 5,
      cityId: panaji.id,
      hotelTypeId: 'resort-id',
      thumbnail: 'https://example.com/taj-exotica-goa.jpg',
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.upsert({
      where: { id: hotel.id },
      update: {},
      create: hotel,
    });
  }

  console.log('✅ Hotels created');

  // Create Hotel Rooms
  const hotelRooms = [
    {
      id: 'oberoi-standard-1',
      hotelId: 'oberoi-grand-id',
      roomType: 'Standard Room',
      roomNumber: '101',
      price: 15000,
      amenities: 'AC, WiFi, TV, Mini Bar',
      description: 'Elegant standard room with city view',
    },
    {
      id: 'oberoi-deluxe-1',
      hotelId: 'oberoi-grand-id',
      roomType: 'Deluxe Room',
      roomNumber: '201',
      price: 25000,
      amenities: 'AC, WiFi, TV, Mini Bar, Balcony',
      description: 'Spacious deluxe room with premium amenities',
    },
    {
      id: 'taj-bengal-suite-1',
      hotelId: 'taj-bengal-id',
      roomType: 'Suite',
      roomNumber: '301',
      price: 35000,
      amenities: 'AC, WiFi, TV, Mini Bar, Living Area, Butler Service',
      description: 'Luxurious suite with separate living area',
    },
    {
      id: 'hyatt-business-1',
      hotelId: 'hyatt-regency-kolkata-id',
      roomType: 'Executive Room',
      roomNumber: '401',
      price: 18000,
      amenities: 'AC, WiFi, TV, Work Desk, Business Center Access',
      description: 'Executive room perfect for business travelers',
    },
    {
      id: 'mayfair-resort-1',
      hotelId: 'mayfair-darjeeling-id',
      roomType: 'Deluxe Room',
      roomNumber: '501',
      price: 12000,
      amenities: 'AC, WiFi, TV, Mountain View, Spa Access',
      description: 'Mountain view room with spa facilities',
    },
  ];

  for (const room of hotelRooms) {
    await prisma.hotelRoom.upsert({
      where: { id: room.id },
      update: {},
      create: room,
    });
  }

  console.log('✅ Hotel rooms created');

  // Create Travel Types
  const travelTypes = [
    {
      id: 'adventure-kolkata',
      name: 'Adventure Tourism',
    },
    {
      id: 'cultural-kolkata',
      name: 'Cultural Tourism',
    },
    {
      id: 'heritage-kolkata',
      name: 'Heritage Tourism',
    },
    {
      id: 'eco-darjeeling',
      name: 'Eco Tourism',
    },
    {
      id: 'business-mumbai',
      name: 'Business Tourism',
    },
  ];

  for (const travelType of travelTypes) {
    await prisma.travelType.upsert({
      where: { id: travelType.id },
      update: {},
      create: travelType,
    });
  }

  console.log('✅ Travel types created');

  // Create Transfer Modes
  const transferModes = [
    {
      id: 'flight-kolkata',
      name: 'Flight',
    },
    {
      id: 'train-kolkata',
      name: 'Train',
    },
    {
      id: 'bus-kolkata',
      name: 'Bus',
    },
    {
      id: 'car-darjeeling',
      name: 'Car',
    },
    {
      id: 'taxi-mumbai',
      name: 'Taxi',
    },
  ];

  for (const transferMode of transferModes) {
    await prisma.transferMode.upsert({
      where: { id: transferMode.id },
      update: {},
      create: transferMode,
    });
  }

  console.log('✅ Travel modes created');

  // Create Destinations
  const destinations = [
    {
      id: 'kolkata-heritage',
      name: 'Kolkata Heritage Tour',
      destinationType: DESTINATIONTYPE_ENUM.DOMESTIC,
      description: 'Explore the rich heritage and culture of Kolkata with visits to historical monuments and cultural sites.',
      priceRange: '₹5,000 - ₹15,000',
      thumbnailPhoto: 'https://example.com/kolkata-heritage.jpg',
      bannerPhoto: 'https://example.com/kolkata-banner.jpg',
      countries: [india.id],
      states: [westBengal.id],
      cities: [kolkata.id],
    },
    {
      id: 'darjeeling-hills',
      name: 'Darjeeling Hill Station',
      destinationType: DESTINATIONTYPE_ENUM.DOMESTIC,
      description: 'Experience the scenic beauty of Darjeeling hills with tea gardens and mountain views.',
      priceRange: '₹8,000 - ₹20,000',
      thumbnailPhoto: 'https://example.com/darjeeling-hills.jpg',
      bannerPhoto: 'https://example.com/darjeeling-banner.jpg',
      countries: [india.id],
      states: [westBengal.id],
      cities: [darjeeling.id],
    },
    {
      id: 'mumbai-business',
      name: 'Mumbai Business Hub',
      destinationType: DESTINATIONTYPE_ENUM.DOMESTIC,
      description: 'Discover Mumbai, the financial capital of India, with its business districts and modern attractions.',
      priceRange: '₹10,000 - ₹30,000',
      thumbnailPhoto: 'https://example.com/mumbai-business.jpg',
      bannerPhoto: 'https://example.com/mumbai-banner.jpg',
      countries: [india.id],
      states: [maharashtra.id],
      cities: [mumbai.id],
    },
    {
      id: 'rajasthan-royal',
      name: 'Royal Rajasthan',
      destinationType: DESTINATIONTYPE_ENUM.DOMESTIC,
      description: 'Experience the royal heritage of Rajasthan with palaces, forts, and desert landscapes.',
      priceRange: '₹12,000 - ₹35,000',
      thumbnailPhoto: 'https://example.com/rajasthan-royal.jpg',
      bannerPhoto: 'https://example.com/rajasthan-banner.jpg',
      countries: [india.id],
      states: [rajasthan.id],
      cities: [jaipur.id],
    },
    {
      id: 'west-bengal-complete',
      name: 'Complete West Bengal Tour',
      destinationType: DESTINATIONTYPE_ENUM.DOMESTIC,
      description: 'A comprehensive tour covering multiple cities in West Bengal including Kolkata and Darjeeling.',
      priceRange: '₹15,000 - ₹40,000',
      thumbnailPhoto: 'https://example.com/west-bengal-complete.jpg',
      bannerPhoto: 'https://example.com/west-bengal-banner.jpg',
      countries: [india.id],
      states: [westBengal.id],
      cities: [kolkata.id, darjeeling.id], // Multiple cities
    },
  ];

  for (const destination of destinations) {
    const { countries, states, cities, ...destinationData } = destination;
    
    await prisma.destination.upsert({
      where: { id: destination.id },
      update: {},
      create: {
        ...destinationData,
        destinationCountries: {
          create: countries.map(countryId => ({ countryId }))
        },
        destinationStates: {
          create: states.map(stateId => ({ stateId }))
        },
        destinationCities: {
          create: cities.map(cityId => ({ cityId }))
        },
      },
    });
  }

  console.log('✅ Destinations created');

  // Create Package Types
  const packageTypes = [
    {
      id: 'honeymoon-id',
      name: 'Honeymoon Package',
      image: 'https://example.com/honeymoon.jpg',
      isInternational: false,
    },
    {
      id: 'family-id',
      name: 'Family Package',
      image: 'https://example.com/family.jpg',
      isInternational: false,
    },
    {
      id: 'adventure-id',
      name: 'Adventure Package',
      image: 'https://example.com/adventure.jpg',
      isInternational: false,
    },
    {
      id: 'business-id',
      name: 'Business Package',
      image: 'https://example.com/business.jpg',
      isInternational: false,
    },
    {
      id: 'international-id',
      name: 'International Package',
      image: 'https://example.com/international.jpg',
      isInternational: true,
    },
  ];

  for (const packageType of packageTypes) {
    await prisma.packageType.upsert({
      where: { id: packageType.id },
      update: {},
      create: packageType,
    });
  }

  console.log('✅ Package types created');

  // Create Meal Types
  const mealTypes = [
    { id: 'breakfast-id', name: 'Breakfast', description: 'Morning meal' },
    { id: 'lunch-id', name: 'Lunch', description: 'Afternoon meal' },
    { id: 'dinner-id', name: 'Dinner', description: 'Evening meal' },
    { id: 'snacks-id', name: 'Snacks', description: 'Light refreshments' },
    { id: 'all-meals-id', name: 'All Meals', description: 'Complete meal package' },
  ];

  for (const mealType of mealTypes) {
    await prisma.mealType.upsert({
      where: { id: mealType.id },
      update: {},
      create: mealType,
    });
  }

  console.log('✅ Meal types created');

  // Create Package Categories
  const packageCategories = [
    { id: 'romantic-id', name: 'Romantic', icon: '💕' },
    { id: 'family-fun-id', name: 'Family Fun', icon: '👨‍👩‍👧‍👦' },
    { id: 'adventure-sports-id', name: 'Adventure Sports', icon: '🏔️' },
    { id: 'cultural-id', name: 'Cultural', icon: '🏛️' },
    { id: 'beach-id', name: 'Beach', icon: '🏖️' },
  ];

  for (const category of packageCategories) {
    await prisma.packageCategory.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  console.log('✅ Package categories created');

  // Create Package Activities
  const packageActivities = [
    { id: 'sightseeing-id', name: 'Sightseeing', image: 'https://example.com/sightseeing.jpg' },
    { id: 'trekking-id', name: 'Trekking', image: 'https://example.com/trekking.jpg' },
    { id: 'water-sports-id', name: 'Water Sports', image: 'https://example.com/watersports.jpg' },
    { id: 'photography-id', name: 'Photography', image: 'https://example.com/photography.jpg' },
    { id: 'shopping-id', name: 'Shopping', image: 'https://example.com/shopping.jpg' },
  ];

  for (const activity of packageActivities) {
    await prisma.packageActivity.upsert({
      where: { id: activity.id },
      update: {},
      create: activity,
    });
  }

  console.log('✅ Package activities created');

  // Create Package Snapshots
  const packageSnapshots = [
    { id: 'accommodation-id', name: 'Accommodation', icon: '🏨' },
    { id: 'transport-id', name: 'Transportation', icon: '🚗' },
    { id: 'meals-id', name: 'Meals', icon: '🍽️' },
    { id: 'guide-id', name: 'Tour Guide', icon: '👨‍🏫' },
    { id: 'activities-id', name: 'Activities', icon: '🎯' },
  ];

  for (const snapshot of packageSnapshots) {
    await prisma.packageSnapshot.upsert({
      where: { id: snapshot.id },
      update: {},
      create: snapshot,
    });
  }

  console.log('✅ Package snapshots created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });