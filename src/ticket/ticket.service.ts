import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Ticket } from "@/schemas/ticket.schema";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";
import { Project } from "@/schemas/project.schema";
import { ProjectDoesNotExist, ProjectIdValidationError } from "@/project/project.errors";
import { plainToClass } from "class-transformer";
import { TicketDoesNotExist, TicketError, TicketIdValidationError, TicketInsufficientPermissionsError, TicketNotModifiedError } from "./ticket.errors";
import { hasChanges, isMongoDbIdValid } from "@/utils";
import { sanitizeUpdateTicketDto } from "./utils/ticket.utils";

/**
 * Service class for managing ticket-related operations within projects.
 * Provides methods for creating, updating, retrieving, and deleting tickets.
 */
@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private readonly ticketModel: Model<Ticket>,
    @InjectModel(Project.name) private readonly projectModel: Model<Project>, // Inject Project model
  ) {}

  /**
   * Creates a new ticket for a project.
   *
   * @param {CreateTicketDto} createTicketDto - The data required to create a ticket.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user creating the ticket.
   * @returns {Promise<Ticket>} - The created ticket object.
   * @throws {ProjectDoesNotExist} - Throws if the project with the provided ID doesn't exist.
   * @throws {ProjectIdValidationError} - Throws if the provided project ID is invalid.
   */
  public async create(createTicketDto: CreateTicketDto, userId: mongoose.Types.ObjectId): Promise<Ticket> {
    if (!isMongoDbIdValid(createTicketDto.projectId)) {
      throw new ProjectIdValidationError(`Invalid project id: \"${createTicketDto.projectId}\"`);
    }
    const project = await this.projectModel.findById(createTicketDto.projectId).exec();
    if (!project) {
      throw new ProjectDoesNotExist(`Project with id \"${createTicketDto.projectId}\" doesn't exist.`);
    }
    const ticket = plainToClass(Ticket, createTicketDto);
    const newTicket = new this.ticketModel({
      ...ticket,
      createdBy: userId,
    });
    const createdTicket = await newTicket.save();
    project.tickets.push(createdTicket._id);
    await project.save();
    return createdTicket;
  }

  /**
   * Retrieves all tickets accessible by the given user.
   *
   * @param {mongoose.Types.ObjectId} userId - The ID of the user requesting the tickets.
   * @returns {Promise<Ticket[]>} - A list of tickets accessible by the user.
   * @throws {TicketDoesNotExist} - Throws if no tickets are found.
   */
  public async findAll(userId: mongoose.Types.ObjectId): Promise<Ticket[]> {
    const tickets = await this.ticketModel
      .find({
        $or: [{ createdBy: userId }, { members: { $in: [userId] } }, { assignees: { $in: [userId] } }],
      })
      .select("-__v")
      .exec();
    if (tickets.length <= 0) {
      throw new TicketDoesNotExist("Tickets are empty!");
    }
    return tickets;
  }

  /**
   * Retrieves a single ticket by its ID for the specified project and user.
   *
   * @param {string} projectId - The ID of the project containing the ticket.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user requesting the ticket.
   * @returns {Promise<Ticket>} - The ticket that matches the provided ID.
   * @throws {ProjectIdValidationError} - Throws if the provided project ID is invalid.
   * @throws {TicketDoesNotExist} - Throws if the ticket is not found or if the user does not have access.
   */
  public async findOne(projectId: string, userId: mongoose.Types.ObjectId): Promise<Ticket> {
    if (!isMongoDbIdValid(projectId)) {
      throw new ProjectIdValidationError("Provided id is not valid");
    }
    const ticket = await this.ticketModel
      .findOne({
        _id: projectId,
        $or: [{ createdBy: userId }, { members: { $in: [userId] } }, { assignees: { $in: [userId] } }],
      })
      .select("-__v -_id")
      .exec();
    if (!ticket) {
      throw new TicketDoesNotExist("Ticket not found or you do not have access");
    }
    return ticket;
  }

  /**
   * Updates an existing ticket.
   *
   * @param {string} ticketId - The ID of the ticket to update.
   * @param {UpdateTicketDto} updateTicketDto - The data to update the ticket with.
   * @returns {Promise<Ticket>} - The updated ticket object.
   * @throws {TicketIdValidationError} - Throws if the provided ticket ID is invalid.
   * @throws {TicketDoesNotExist} - Throws if the ticket does not exist.
   * @throws {TicketNotModifiedError} - Throws if no changes are detected during the update.
   */
  public async update(ticketId: string, updateTicketDto: UpdateTicketDto): Promise<Ticket> {
    if (!isMongoDbIdValid(ticketId)) {
      throw new TicketIdValidationError("Provided id is not valid");
    }
    const ticket = await this.ticketModel.findById(ticketId).exec();
    if (!ticket) {
      throw new TicketDoesNotExist(`Ticket with id \"${ticketId}\" doesn't exist.`);
    }
    if (!hasChanges(ticket, updateTicketDto)) {
      throw new TicketNotModifiedError("No changes detected");
    }
    const sanitizedUpdate = sanitizeUpdateTicketDto(updateTicketDto);
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(
        ticketId,
        { $set: sanitizedUpdate },
        {
          new: true,
          runValidators: true,
        },
      )
      .select("-__v")
      .exec();
    return updatedTicket;
  }

  /**
   * Deletes a ticket by its ID.
   *
   * @param {string} ticketId - The ID of the ticket to delete.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user attempting to delete the ticket.
   * @returns {Promise<number>} - The number of deleted tickets.
   * @throws {TicketIdValidationError} - Throws if the provided ticket ID is invalid.
   * @throws {TicketDoesNotExist} - Throws if the ticket does not exist.
   * @throws {TicketInsufficientPermissionsError} - Throws if the user does not have permissions to delete the ticket.
   * @throws {TicketError} - Throws if an error occurs during ticket deletion.
   */
  public async delete(ticketId: string, userId: mongoose.Types.ObjectId): Promise<number> {
    if (!isMongoDbIdValid(ticketId)) {
      throw new TicketIdValidationError("Provided id is not valid");
    }
    const ticket = await this.ticketModel.findOne({ _id: ticketId }).select("-__v -_id");
    if (!ticket) {
      throw new ProjectDoesNotExist(`Ticket with id \"${ticketId}\" doesn't exist.`);
    }

    if (!ticket.createdBy._id.equals(userId)) {
      throw new TicketInsufficientPermissionsError(`You are not authorized to delete this ticket.`);
    }

    const result = await this.ticketModel.deleteOne({ _id: ticketId }).exec();
    if (result.deletedCount === 0) {
      throw new TicketError(`Didn't delete ticket with \"${ticketId}\" .`);
    }
    return result.deletedCount;
  }
}
