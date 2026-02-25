import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // Check and create admin user
    const adminEmail = "admin@kellyos.com";
    const adminExists = await prisma.users.findUnique({
      where: { email: adminEmail },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      await prisma.users.create({
        data: {
          id: randomUUID(),
          email: adminEmail,
          password: hashedPassword,
          firstName: "Admin",
          lastName: "User",
          role: "ADMIN",
          isActive: true,
          updatedAt: new Date(),
        },
      });
      console.log("✅ Admin user created");
    } else {
      console.log("✓ Admin user already exists");
    }

    // Check and create owner user
    const ownerEmail = "pkingori14@gmail.com";
    const ownerExists = await prisma.users.findUnique({
      where: { email: ownerEmail },
    });

    if (!ownerExists) {
      const hashedPassword = await bcrypt.hash("owner@2026", 10);
      await prisma.users.create({
        data: {
          id: randomUUID(),
          email: ownerEmail,
          password: hashedPassword,
          firstName: "Peter",
          lastName: "Kingori",
          role: "OWNER",
          isActive: true,
          updatedAt: new Date(),
        },
      });
      console.log("✅ Owner user created");
    } else {
      console.log("✓ Owner user already exists");
    }

    console.log("🎉 Seeding completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
