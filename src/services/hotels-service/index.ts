import { notFoundError, requestError, unauthorizedError } from "@/errors";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import { TicketStatus } from "@prisma/client";

async function getHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  if (ticket.status === TicketStatus.RESERVED && ticket.TicketType.isRemote === false) {
    throw requestError(402, "PAYMENT_REQUIRED");
  }

  if (ticket.TicketType.includesHotel === false) {
    throw unauthorizedError();
  }

  const hotels = await hotelsRepository.findHotels();

  return hotels;
}

async function getHotelById(userId: number, hotelId: number) {
  if (!hotelId) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if (
    ticket.status === TicketStatus.RESERVED &&
    ticket.TicketType.isRemote === false &&
    ticket.TicketType.includesHotel
  ) {
    throw requestError(402, "PAYMENT_REQUIRED");
  }

  if (ticket.TicketType.includesHotel === false) {
    throw unauthorizedError();
  }

  const hotels = await hotelsRepository.findHotelById(hotelId);

  return hotels;
}

const hotelsService = {
  getHotels,
  getHotelById,
};

export default hotelsService;
