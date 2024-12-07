/**
 * Custom error class for project-related errors.
 * @class
 */
export class ProjectError extends Error {
  /**
   * Creates an instance of ProjectError.
   * @param {string} message - The error message.
   */
  constructor(message: string) {
    super(message);
  }
}

/**
 * Error class for project relation conflicts.
 * @class
 * @extends ProjectError
 */
export class ProjectRelationConflict extends ProjectError {}

/**
 * Error class for project not existing.
 * @class
 * @extends ProjectError
 */
export class ProjectDoesNotExist extends ProjectError {}

/**
 * Error class for project slug validation errors.
 * @class
 * @extends ProjectError
 */
export class ProjectSlugValidationError extends ProjectError {}

/**
 * Error class for project ID validation errors.
 * @class
 * @extends ProjectError
 */
export class ProjectIdValidationError extends ProjectError {}

/**
 * Error class for project insufficient permissions.
 * @class
 * @extends ProjectError
 */
export class ProjectInsufficientPermissionsError extends ProjectError {}

/**
 * Error class for project not being modified.
 * @class
 * @extends ProjectError
 */
export class ProjectNotModifiedError extends ProjectError {}

/**
 * Error class for project provided update data being invalid.
 * @class
 * @extends ProjectError
 */
export class ProjectUpdateDataValidationError extends ProjectError {}
