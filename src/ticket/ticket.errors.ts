/**
 * Custom error class for ticket-related errors.
 * @class
 */
export class TicketError extends Error {
  /**
   * Creates an instance of TicketError.
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * Error class for ticket relation conflicts.
 * @class
 * @extends TicketError
 */
export class TicketRelationConflict extends TicketError {}

/**
 * Error class for ticket not existing.
 * @class
 * @extends TicketError
 */
export class TicketDoesNotExist extends TicketError {}

/**
 * Error class for ticket slug validation errors.
 * @class
 * @extends TicketError
 */
export class TicketSlugValidationError extends TicketError {}

/**
 * Error class for ticket ID validation errors.
 * @class
 * @extends TicketError
 */
export class TicketIdValidationError extends TicketError {}

/**
 * Error class for ticket insufficient permissions.
 * @class
 * @extends TicketError
 */
export class TicketInsufficientPermissionsError extends TicketError {}

/**
 * Error class for ticket not being modified.
 * @class
 * @extends TicketError
 */
export class TicketNotModifiedError extends TicketError {}
