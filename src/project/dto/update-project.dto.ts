import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./create-project.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

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
}
