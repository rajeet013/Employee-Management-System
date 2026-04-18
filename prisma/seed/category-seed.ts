import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      {
        name: 'Jewelry',
        slug: 'jewelry',
        description:
          'Explore our handcrafted, customizable jewelry made with premium materials and sustainable practices.',
        featured: true,
      },
      {
        name: 'Suits & Shirts',
        slug: 'suits-shirts',
        description:
          'Design your own custom-fitted suits and shirts with luxurious fabrics and tailored elegance.',
        featured: true,
      },
      {
        name: 'Shoes',
        slug: 'shoes',
        description:
          'Customize stylish, comfortable shoes crafted from top-quality leather and designed to fit perfectly.',
        featured: true,
      },
      {
        name: 'Art Work & Home Decor',
        slug: 'art-decor',
        description:
          'Discover unique artisan-made home decor and art pieces that bring culture and warmth into your space.',
        featured: true,
      },
    ],
    skipDuplicates: true, // Ensures seeding doesn't fail if rerun
  });
}

main()
  .then(() => console.log('Categories seeded successfully.'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
