import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Request, UseGuards } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { ExpressRequestWithUser } from "./interfaces/ticket.interface";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { Ticket } from "@/schemas/ticket.schema";
import { handleDomainErrors } from "@/utils";

/**
 * Controller for handling HTTP requests related to tickets.
 * Provides CRUD operations for ticket management.
 */
@ApiBearerAuth()
@ApiTags("Ticket Management")
@Controller("/api/v1/tickets")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  /**
   * Retrieves all tickets accessible by the authenticated user.
   *
   * @param {ExpressRequestWithUser} req - The request object, containing the user.
   * @returns {Promise<Ticket[]>} - A list of tickets accessible to the user.
   * @throws {any} - Handles domain errors.
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: ExpressRequestWithUser): Promise<Ticket[]> {
    try {
      const userId = req.user._id;
      req.user = null; // Nullify the user object after usage to avoid unintended side effects
      return await this.ticketService.findAll(userId);
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Retrieves a specific ticket by its ID for the authenticated user.
   *
   * @param {string} id - The ID of the ticket to retrieve.
   * @param {ExpressRequestWithUser} req - The request object, containing the user.
   * @returns {Promise<Ticket>} - The ticket object requested.
   * @throws {any} - Handles domain errors.
   */
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string, @Request() req: ExpressRequestWithUser): Promise<Ticket> {
    try {
      const userId = req.user._id;
      req.user = null; // Nullify the user object after usage to avoid unintended side effects
      const ticket = await this.ticketService.findOne(id, userId);
      return ticket;
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Creates a new ticket for the authenticated user.
   *
   * @param {CreateTicketDto} createTicketDto - The data required to create a new ticket.
   * @param {ExpressRequestWithUser} req - The request object, containing the user.
   * @returns {Promise<{ statusCode: HttpStatus, message: string, data: Ticket }>} - Response object with status, message, and the created ticket.
   * @throws {any} - Handles domain errors.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<{
    statusCode: HttpStatus;
    message: string;
    data: Ticket;
  }> {
    try {
      const userId = req.user._id;
      req.user = null; // Nullify the user object after usage to avoid unintended side effects
      const createdTicket = await this.ticketService.create(createTicketDto, userId);
      return {
        statusCode: HttpStatus.CREATED,
        message: "Ticket created successfully",
        data: createdTicket,
      };
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Updates an existing ticket by its ID.
   *
   * @param {string} id - The ID of the ticket to update.
   * @param {UpdateTicketDto} updateTicketDto - The updated data for the ticket.
   * @returns {Promise<Ticket>} - The updated ticket object.
   * @throws {any} - Handles domain errors.
   */
  @Patch(":id")
  @ApiOperation({ summary: "Update an existing ticket by ID" })
  @ApiParam({
    name: "id",
    description: "The ID of the ticket to update",
    type: String,
  })
  @ApiBody({
    type: UpdateTicketDto,
    description: "The updated data for the ticket",
  })
  @ApiResponse({
    status: 200,
    description: "Ticket successfully updated",
    type: Ticket,
  })
  @ApiResponse({
    status: 304,
    description: "Ticket not modified",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  async update(@Param("id") id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    try {
      const updatedTicket = await this.ticketService.update(id, updateTicketDto);
      return updatedTicket;
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Deletes a ticket by its ID.
   *
   * @param {string} id - The ID of the ticket to delete.
   * @param {ExpressRequestWithUser} req - The request object, containing the user.
   * @returns {Promise<{ result: string }>} - Response object with the result status of the delete operation.
   * @throws {any} - Handles domain errors.
   */
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string, @Request() req: ExpressRequestWithUser): Promise<{ result: string }> {
    try {
      const userId = req.user._id;
      req.user = null; // Nullify the user object after usage to avoid unintended side effects
      await this.ticketService.delete(id, userId);
      return { result: "success" };
    } catch (error) {
      handleDomainErrors(error);
    }
  }
}
