import faker from "@faker-js/faker";
import { prisma } from "@/config";
import { Room } from "@prisma/client";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
    include: {
      Rooms: true,
    },
  });
}

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.name.findName(),
      capacity: faker.datatype.number(),
      hotelId: hotelId,
    },
  });
}

/* model Hotel {
  id        Int      @id @default(autoincrement())
  name      String
  image     String
  Rooms     Room[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Room {
  id        Int       @id @default(autoincrement())
  name      String
  capacity  Int
  hotelId   Int
  Hotel     Hotel     @relation(fields: [hotelId], references: [id])
  Booking   Booking[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
} */
