import { PartialType } from "@nestjs/mapped-types";
import { CreateTicketDto } from "./create-ticket.dto";
import { IsString, IsOptional, IsMongoId, IsArray, IsDate } from "class-validator";
import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

/**
 * DTO (Data Transfer Object) for updating a ticket.
 *
 * This class defines the structure of the data required to update an existing ticket.
 * It extends the `CreateTicketDto` class, making all fields optional, and includes additional validation
 * to ensure the correct data types are provided for the update operation.
 *
 * @class UpdateTicketDto
 */
export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  /**
   * The title of the ticket.
   *
   * This field is optional for updating. If provided, it must be a string.
   *
   * @example 'Bug in login page'
   * @optional
   * @type {string}
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The title of the ticket.",
    example: "Bug in login page",
  })
  title?: string;

  /**
   * The description of the ticket.
   *
   * This field is optional for updating. If provided, it must be a string.
   *
   * @example 'The login page does not load after clicking the login button.'
   * @optional
   * @type {string}
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The description of the ticket.",
    example: "The login page does not load after clicking the login button.",
  })
  description?: string;

  /**
   * The list of assignees for the ticket.
   *
   * This field is optional for updating. If provided, it must be an array of valid MongoDB ObjectIds.
   *
   * @example ['507f1f77bcf86cd799439012', '507f1f77bcf86cd799439013']
   * @optional
   * @type {Types.ObjectId[]}
   */
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({
    description: "List of assignees for the ticket.",
    example: ["507f1f77bcf86cd799439012", "507f1f77bcf86cd799439013"],
  })
  assignees?: Types.ObjectId[];

  /**
   * The priority of the ticket.
   *
   * This field is optional for updating. If provided, it must be one of the specified values: 'low', 'medium', or 'high'.
   *
   * @example 'high'
   * @optional
   * @type {string}
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The priority of the ticket.",
    example: "high",
    enum: ["low", "medium", "high"],
  })
  priority?: string;

  /**
   * The status of the ticket.
   *
   * This field is optional for updating. If provided, it must be one of the specified values:
   * 'open', 'pending', 'in-progress', 'in-qa', 'staging', 'uat', 'production', 'wont-do', or 'closed'.
   *
   * @example 'in-progress'
   * @optional
   * @type {string}
   */
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The status of the ticket.",
    example: "in-progress",
    enum: ["open", "pending", "in-progress", "in-qa", "staging", "uat", "production", "wont-do", "closed"],
  })
  status?: string;

  /**
   * The due date for completing the ticket.
   *
   * This field is optional for updating. If provided, it must be a valid date.
   *
   * @example '2024-12-31T23:59:59.000Z'
   * @optional
   * @type {Date}
   */
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    description: "The due date for completing the ticket.",
    example: "2024-12-31T23:59:59.000Z",
  })
  dueDate?: Date;
}
