import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

/**
 * Represents a user in the ticket management system.
 *
 * The User schema defines the structure of the user documents stored in MongoDB,
 * including properties such as username, password, email, name, role, and active status.
 */
@Schema({ timestamps: true })
export class User {
  /** The unique username for the user. */
  @Prop({ required: true, unique: true })
  username: string;

  /** The hashed password for the user. */
  @Prop({ required: true })
  password: string;

  /** The unique email address for the user. */
  @Prop({ required: true, unique: true })
  email: string;

  /** The name of the user. */
  @Prop({ required: true })
  name: string;

  /**
   * The role of the user in the system.
   * Determines permissions and access levels. Defaults to "user".
   */
  @Prop({ default: "user", enum: ["user", "admin", "manager"] })
  role: string;

  /**
   * Indicates whether the user account is active.
   * Inactive accounts may be restricted from accessing the system.
   */
  @Prop({ default: true })
  isActive: boolean;
}

/**
 * The Mongoose schema for the User.
 * This schema is used to create and manage user documents in the MongoDB database.
 */
export const UserSchema = SchemaFactory.createForClass(User);

/**
 * The type representing a hydrated User document.
 * This type is used to work with user documents retrieved from MongoDB.
 */
export type UserDocument = HydratedDocument<User>;
