import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "./user.schema";
import { Project } from "./project.schema";

/**
 * TicketDocument type that combines the Ticket class with Mongoose Document.
 *
 * @extends Document
 */
export type TicketDocument = Ticket & Document;

/**
 * Ticket Schema represents the structure of a ticket in the database.
 *
 * This schema defines the ticket properties, such as `title`, `description`, `assignees`, `projectId`, `status`,
 * and `priority`, along with relationships to the `User` and `Project` models.
 *
 * @class Ticket
 * @property {string} title - The title of the ticket.
 * @property {string} description - A description of the ticket.
 * @property {Types.ObjectId} createdBy - The ID of the user who created the ticket.
 * @property {Types.ObjectId[]} assignees - An array of IDs of users assigned to the ticket.
 * @property {Types.ObjectId} projectId - The ID of the project this ticket belongs to.
 * @property {string} status - The current status of the ticket.
 * @property {string} priority - The priority level of the ticket.
 * @property {Date} [dueDate] - The due date for the ticket (optional).
 */
@Schema({ timestamps: true })
export class Ticket {
  /**
   * The title of the ticket.
   *
   * @example "Fix login issue"
   * @required
   */
  @Prop({ required: true })
  title: string;

  /**
   * A description of the ticket.
   *
   * @example "The user is unable to log in with valid credentials"
   * @required
   */
  @Prop({ required: true })
  description: string;

  /**
   * The ID of the user who created the ticket.
   *
   * @example "60c72b2f5b1b2c6f5e8c9999"
   * @required
   */
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

  /**
   * An array of IDs of users assigned to the ticket.
   *
   * @example ["60c72b2f5b1b2c6f5e8c8888", "60c72b2f5b1b2c6f5e8c7777"]
   * @optional
   */
  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  assignees: Types.ObjectId[];

  /**
   * The ID of the project this ticket belongs to.
   *
   * @example "60c72b2f5b1b2c6f5e8c6666"
   * @required
   */
  @Prop({ type: Types.ObjectId, ref: Project.name, required: true })
  projectId: Types.ObjectId;

  /**
   * The current status of the ticket.
   *
   * @default 'open'
   * @enum ['open', 'pending', 'in-progress', 'in-qa', 'staging', 'uat', 'production', 'wont-do', 'closed']
   */
  @Prop({
    default: "open",
    enum: ["open", "pending", "in-progress", "in-qa", "staging", "uat", "production", "wont-do", "closed"],
  })
  status: string;

  /**
   * The priority level of the ticket.
   *
   * @default 'medium'
   * @enum ['low', 'medium', 'high']
   */
  @Prop({ default: "medium", enum: ["low", "medium", "high"] })
  priority: string;

  /**
   * The due date for the ticket.
   *
   * @example "2024-12-31T23:59:59Z"
   * @optional
   * @default null
   */
  @Prop({ default: null })
  dueDate: Date;
}

/**
 * TicketSchema is the Mongoose schema for the `Ticket` class.
 *
 * This schema is used by Mongoose to interact with the database.
 *
 * @constant TicketSchema
 */
export const TicketSchema = SchemaFactory.createForClass(Ticket);
