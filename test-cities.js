const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCities() {
  try {
    console.log('🔍 Checking cities in database...');
    
    const cities = await prisma.city.findMany({
      where: {
        name: {
          in: ['Jaipur', 'Udaipur']
        }
      },
      include: {
        state: true,
        country: true
      }
    });

    console.log('📍 Found cities:');
    cities.forEach(city => {
      console.log(`- ${city.name}: ${city.id} (State: ${city.state?.name}, Country: ${city.country.name})`);
    });

    if (cities.length === 0) {
      console.log('❌ No cities found! Running seed...');
      // You can run the seed here if needed
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCities();