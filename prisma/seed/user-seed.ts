import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	const [
		hashedPasswordCustomer,
		hashedPasswordAdmin,
		hashedPasswordSuperadmin
	] = await Promise.all([
		bcrypt.hash('customer123', 10),
		bcrypt.hash('Admin@Ariimpex+-Arif*#', 10),
		bcrypt.hash('Joythegreatone1421', 10)
	]);

	const customer = await prisma.user.upsert({
		where: { email: 'customer@example.com' },
		update: {},
		create: {
			email: 'customer@example.com',
			firstName: 'John',
			lastName: 'Doe',
			password: hashedPasswordCustomer,
			role: UserRole.CUSTOMER
			//emailVerified: new Date(),
		}
	});

	const admin = await prisma.user.upsert({
		where: { email: 'ariimpex07@gmail.com' },
		update: {},
		create: {
			email: 'ariimpex07@gmail.com',
			firstName: 'Arif',
			lastName: 'Ahmed',
			password: hashedPasswordAdmin,
			role: UserRole.ADMIN
			//emailVerified: new Date(),
		}
	});

	const superadmin = await prisma.user.upsert({
		where: { email: 'joy_ahmed_007@yahoo.com' },
		update: {},
		create: {
			email: 'joy_ahmed_007@yahoo.com',
			firstName: 'Joy',
			lastName: 'Ahmed',
			password: hashedPasswordSuperadmin,
			role: UserRole.SUPERADMIN
			//emailVerified: new Date(),
		}
	});

	console.log({ customer, admin, superadmin });
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
