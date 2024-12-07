import { UserDocument } from "@/schemas/user.schema";

/**
 * Extends the Express Request object to include the authenticated user's information.
 *
 * @interface ExpressRequestWithUser
 */
export interface ExpressRequestWithUser extends Request {
  /**
   * The user associated with the request, represented as a UserDocument.
   *
   * @type {UserDocument}
   */
  user: UserDocument;
}
