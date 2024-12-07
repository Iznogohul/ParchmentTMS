import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { Ticket } from "./ticket.schema";
import { forwardRef } from "@nestjs/common";

/**
 * ProjectDocument type that combines the Project class with Mongoose Document.
 *
 * @extends Document
 */
export type ProjectDocument = Project & Document;

/**
 * Project Schema represents the structure of a project in the database.
 *
 * This schema defines the project properties, such as `name`, `description`, `owner`, `members`, and `tickets`,
 * along with relationships to the `User` and `Ticket` models.
 *
 * @class Project
 * @property {string} name - The name of the project.
 * @property {string} description - A brief description of the project.
 * @property {Types.ObjectId} owner - The ID of the user who owns the project.
 * @property {Types.ObjectId[]} members - An array of IDs of users who are members of the project.
 * @property {boolean} isActive - A flag to indicate whether the project is active or not.
 * @property {UserDocument} createdBy - The user who created the project.
 * @property {UserDocument} [updatedBy] - The user who last updated the project (optional).
 * @property {Types.ObjectId[]} tickets - An array of ticket IDs associated with the project.
 */
@Schema({ timestamps: true })
export class Project {
  /**
   * The name of the project.
   *
   * @example "Project X"
   * @required
   */
  @Prop({ required: true })
  name: string;

  /**
   * A description of the project.
   *
   * @example "A project to manage user tasks"
   * @required
   */
  @Prop({ required: true })
  description: string;

  /**
   * The ID of the user who owns the project.
   *
   * @example "60c72b2f5b1b2c6f5e8c9999"
   * @required
   */
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: Types.ObjectId;

  /**
   * An array of IDs of users who are members of the project.
   *
   * @example ["60c72b2f5b1b2c6f5e8c8888", "60c72b2f5b1b2c6f5e8c7777"]
   * @optional
   */
  @Prop([{ type: Types.ObjectId, ref: User.name }])
  members: Types.ObjectId[];

  /**
   * A flag that indicates if the project is active or not.
   *
   * @default true
   */
  @Prop({ default: true })
  isActive: boolean;

  /**
   * The user who created the project.
   *
   * @example "60c72b2f5b1b2c6f5e8c6666"
   * @required
   */
  @Prop({ type: "ObjectId", ref: User.name, required: true })
  createdBy: UserDocument;

  /**
   * The user who last updated the project.
   *
   * @example "60c72b2f5b1b2c6f5e8c5555"
   * @optional
   */
  @Prop({ type: "ObjectId", ref: User.name })
  updatedBy: UserDocument;

  /**
   * An array of ticket IDs associated with the project.
   *
   * @example ["60c72b2f5b1b2c6f5e8c4444", "60c72b2f5b1b2c6f5e8c3333"]
   * @optional
   */
  @Prop({
    type: [{ type: Types.ObjectId, ref: forwardRef(() => Ticket.name) }],
  })
  tickets: Types.ObjectId[];
}

/**
 * ProjectSchema is the Mongoose schema for the `Project` class.
 *
 * This schema is used by Mongoose to interact with the database.
 *
 * @constant ProjectSchema
 */
export const ProjectSchema = SchemaFactory.createForClass(Project);
