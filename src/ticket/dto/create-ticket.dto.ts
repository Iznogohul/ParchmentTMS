import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsArray, IsMongoId } from "class-validator";
import { Types } from "mongoose";

/**
 * DTO for creating a ticket.
 *
 * This class defines the structure of the data required to create a new ticket in the system.
 * It includes properties like the ticket's title, description, assignees, project ID, status,
 * priority, and due date. The validation rules ensure that the input data meets the necessary criteria.
 *
 * @class CreateTicketDto
 */
export class CreateTicketDto {
  /**
   * The title of the ticket.
   *
   * @example 'Bug in login page'
   * @required
   * @type {string}
   */
  @ApiProperty({
    description: "The title of the ticket",
    type: String,
    example: "Bug in login page",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * A detailed description of the ticket.
   *
   * @example 'The login page does not load after clicking the login button.'
   * @required
   * @type {string}
   */
  @ApiProperty({
    description: "A detailed description of the ticket",
    type: String,
    example: "The login page does not load after clicking the login button.",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * The list of assignees for the ticket.
   *
   * This is an optional field that contains an array of user IDs assigned to the ticket.
   *
   * @example ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013']
   * @optional
   * @type {Types.ObjectId[]}
   */
  @ApiProperty({
    description: "The list of assignees for the ticket",
    type: [String],
    example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  assignees?: Types.ObjectId[];

  /**
   * The ID of the project this ticket belongs to.
   *
   * @example '507f1f77bcf86cd799439010'
   * @required
   * @type {Types.ObjectId}
   */
  @ApiProperty({
    description: "The ID of the project this ticket belongs to",
    type: String,
    example: "507f1f77bcf86cd799439010",
  })
  @IsMongoId()
  @IsNotEmpty()
  projectId: Types.ObjectId;

  /**
   * The current status of the ticket.
   *
   * This is an optional field that represents the current status of the ticket. Possible values
   * include 'open', 'in-progress', 'closed', etc.
   *
   * @example 'open'
   * @optional
   * @type {string}
   */
  @ApiProperty({
    description: "The current status of the ticket",
    type: String,
    example: "open",
    required: false,
  })
  @IsString()
  @IsOptional()
  status?: string;

  /**
   * The priority of the ticket.
   *
   * This is an optional field indicating the priority level of the ticket, which can be 'low', 'medium', or 'high'.
   *
   * @example 'high'
   * @optional
   * @type {string}
   */
  @ApiProperty({
    description: "The priority of the ticket",
    type: String,
    example: "high",
    required: false,
  })
  @IsString()
  @IsOptional()
  priority?: string;

  /**
   * The due date for completing the ticket.
   *
   * This is an optional field representing the date and time by which the ticket should be completed.
   *
   * @example '2024-12-31T23:59:59Z'
   * @optional
   * @type {Date}
   */
  @ApiProperty({
    description: "The due date for completing the ticket",
    type: String,
    format: "date-time",
    example: "2024-12-31T23:59:59Z",
    required: false,
  })
  @IsOptional()
  dueDate?: Date;
}
