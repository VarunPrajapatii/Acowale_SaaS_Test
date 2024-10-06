const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create an admin user
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'securepassword',
      role: 'admin',
    },
  });

  // Create a regular user
  await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'userpassword',
      role: 'user',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
