import { UpdateTicketDto } from "../dto/update-ticket.dto";

/**
 * Sanitizes the updateTicketDto object to ensure it only contains allowed fields and values.
 *
 * @param {UpdateTicketDto} updateTicketDto - The data to update the ticket with.
 * @returns {Partial<UpdateTicketDto>} - The sanitized update data.
 */
export function sanitizeUpdateTicketDto(updateTicketDto: UpdateTicketDto): Partial<UpdateTicketDto> {
  const allowedFields = ["title", "description", "assignees", "priority", "status", "dueDate"];
  const sanitizedUpdate: Partial<UpdateTicketDto> = {};
  for (const key of Object.keys(updateTicketDto)) {
    if (allowedFields.includes(key)) {
      sanitizedUpdate[key] = updateTicketDto[key];
    }
  }
  return sanitizedUpdate;
}
