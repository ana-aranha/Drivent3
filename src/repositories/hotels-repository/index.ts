import { prisma } from "@/config";
import { Hotel, Room } from "@prisma/client";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findHotelById(ticketId: number) {
  return prisma.hotel.findMany({
    where: {
      id: ticketId,
    },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  findHotels,
  findHotelById,
};

export default hotelsRepository;
