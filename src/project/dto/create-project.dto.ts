import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsArray } from "class-validator";
import { Types } from "mongoose";

/**
 * DTO (Data Transfer Object) for creating a new project.
 *
 * This class defines the structure and validation rules for the data required to create a new project.
 * It includes validation decorators to ensure the correct data types and constraints for each field.
 *
 * @class CreateProjectDto
 */
export class CreateProjectDto {
  /**
   * The name of the project.
   *
   * This field is required and must be a non-empty string.
   *
   * @example 'New Project'
   * @type {string}
   * @required
   */
  @ApiProperty({
    description: "The name of the project",
    example: "New Project",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * A brief description of the project.
   *
   * This field is required and must be a non-empty string.
   *
   * @example 'This is a sample project.'
   * @type {string}
   * @required
   */
  @ApiProperty({
    description: "A brief description of the project",
    example: "This is a sample project.",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * List of project members.
   *
   * This field is optional and should contain MongoDB ObjectIds for each member of the project.
   * If provided, it must be an array of valid MongoDB ObjectIds.
   *
   * @example ['63e4e8d6e92f5e0b6f9a2f33', '63e4e8d6e92f5e0b6f9a2f34']
   * @optional
   * @type {Types.ObjectId[]}
   */
  @ApiProperty({
    description: "List of project members (MongoDB ObjectIds)",
    example: ["63e4e8d6e92f5e0b6f9a2f33", "63e4e8d6e92f5e0b6f9a2f34"],
    required: false,
  })
  @IsOptional()
  @IsArray()
  members?: Types.ObjectId[];
}
