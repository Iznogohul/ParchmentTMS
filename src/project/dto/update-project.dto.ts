import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsOptional } from "class-validator";
import { Types } from "mongoose";

import { CreateProjectDto } from "./create-project.dto";

/**
 * DTO (Data Transfer Object) for updating an existing project.
 *
 * This class defines the structure and validation rules for the data required to update a project.
 * It extends the `CreateProjectDto` class, meaning it inherits the properties for `name`, `description`, and `members`,
 * with all properties being optional for updates.
 *
 * @class UpdateProjectDto
 */
export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  /**
   * The updated name of the project.
   *
   * This field is optional. If provided, it must be a string representing the new project name.
   *
   * @example 'New Project Name'
   * @optional
   * @type {string}
   */
  @ApiProperty({
    description: "The updated name of the project",
    example: "New Project Name",
    required: false,
  })
  name?: string;

  /**
   * The updated description of the project.
   *
   * This field is optional. If provided, it must be a string representing the new description of the project.
   *
   * @example 'Final Description'
   * @optional
   * @type {string}
   */
  @ApiProperty({
    description: "The updated description of the project",
    example: "Final Description",
    required: false,
  })
  description?: string;

  /**
   * The ID of the user who owns the project.
   *
   * This field is optional. If provided, it must be a valid MongoDB ObjectId that represents a user.
   * The `owner` field is typically set during project creation and is usually not updated.
   *
   * Example: '63e4e8d6e92f5e0b6f9a2f33'
   *
   * @example '63e4e8d6e92f5e0b6f9a2f33'
   * @optional
   * @type {Types.ObjectId}
   */
  @IsOptional()
  @IsMongoId()
  owner?: Types.ObjectId;

  /**
   * List of user IDs who are members of the project.
   *
   * This field is optional. If provided, it must be an array of MongoDB ObjectIds that represent
   * the users who should be members of the project.
   *
   * @example ['63e4e8d6e92f5e0b6f9a2f33', '63e4e8d6e92f5e0b6f9a2f34']
   * @optional
   * @type {Types.ObjectId[]}
   */
  @ApiProperty({
    description: "List of user IDs who are members of the project",
    example: ["63e4e8d6e92f5e0b6f9a2f33", "63e4e8d6e92f5e0b6f9a2f34"],
    type: [Types.ObjectId],
    required: false,
  })
  members?: Types.ObjectId[];

  /**
   * List of ticket IDs associated with the project.
   *
   * This field is optional. If provided, it must be an array of MongoDB ObjectIds that represent
   * the tickets associated with the project.
   *
   * @example ['63e4e8d6e92f5e0b6f9a2f35', '63e4e8d6e92f5e0b6f9a2f36']
   * @optional
   * @type {Types.ObjectId[]}
   */
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  tickets?: Types.ObjectId[];
}
