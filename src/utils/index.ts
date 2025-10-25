import { HttpException, HttpStatus } from "@nestjs/common";
import mongoose, { Types } from "mongoose";

import {
  ProjectDoesNotExist,
  ProjectIdValidationError,
  ProjectInsufficientPermissionsError,
  ProjectNotModifiedError,
  ProjectRelationConflict,
  ProjectSlugValidationError,
  ProjectUpdateDataValidationError,
} from "@/project/project.errors";
import { TicketDoesNotExist, TicketNotModifiedError, TicketRelationConflict, TicketSlugValidationError } from "@/ticket/ticket.errors";

/**
 * Compares two arrays for deep equality.
 *
 * This function checks if two arrays are identical in length and contents, comparing each element in order.
 *
 * @template T - The type of elements in the arrays.
 * @param {T[]} arr1 - The first array to compare.
 * @param {T[]} arr2 - The second array to compare.
 * @returns {boolean} - Returns `true` if both arrays are equal, `false` otherwise.
 */
function deepEqualArrays<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

/**
 * Checks whether there are any changes between the original and updated objects.
 *
 * This function compares the `original` object and the `updated` object (which may contain partial fields) to
 * determine if there are any differences. It handles arrays, `Date` objects, and simple field comparisons.
 *
 * @template T - The type of the object to compare.
 * @param {T} original - The original object before any changes.
 * @param {Partial<T>} updated - The updated object, possibly containing only some of the fields of `original`.
 * @returns {boolean} - Returns `true` if there are changes between the two objects, `false` otherwise.
 */
export function hasChanges<T>(original: T, updated: Partial<T>): boolean {
  for (const key in updated) {
    if (Array.isArray(updated[key]) && Array.isArray(original[key])) {
      if (!deepEqualArrays(updated[key], original[key])) {
        return true;
      }
    } else if (original[key] instanceof Date && updated[key] instanceof Date) {
      if (original[key].getTime() !== new Date(updated[key]).getTime()) {
        return true;
      }
    } else if (updated[key] !== original[key]) {
      return true;
    }
  }

  return false;
}

/**
 * Checks if a given string is a valid MongoDB ObjectId.
 *
 * This function uses Mongoose's `ObjectId.isValid` method to determine if the provided string
 * is a valid representation of a MongoDB ObjectId. MongoDB ObjectIds are 24-character hexadecimal
 * strings that are unique identifiers for documents in MongoDB collections.
 *
 * @param {string} id - The string to check for validity as a MongoDB ObjectId.
 * @returns {boolean} - Returns `true` if the string is a valid MongoDB ObjectId, `false` otherwise.
 *
 * @example
 * // Example usage:
 * const valid = isMongoDbIdValid("507f191e810c19729de860ea");
 * console.log(valid); // true
 *
 * const invalid = isMongoDbIdValid("invalid-id");
 * console.log(invalid); // false
 */
export function isMongoDbIdValid(id: string | Types.ObjectId): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

/**
 * Handles domain-specific errors and maps them to appropriate HTTP exceptions.
 *
 * This function checks if the error belongs to specific domain error classes (e.g., Ticket or Project errors) and
 * throws an `HttpException` with the correct HTTP status code and error message. If the error doesn't match any
 * known domain error, a generic internal server error is thrown.
 *
 * @param {unknown} error - The error object to handle.
 * @throws {HttpException} - Throws an appropriate `HttpException` based on the error type.
 */
export function handleDomainErrors(error: unknown): never {
  // Ticket Errors
  if (error instanceof TicketRelationConflict) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (error instanceof TicketDoesNotExist) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof TicketSlugValidationError) {
    throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
  } else if (error instanceof TicketNotModifiedError) {
    throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
  }

  // Project Errors
  if (error instanceof ProjectDoesNotExist) {
    throw new HttpException(error.message, HttpStatus.NOT_FOUND);
  } else if (error instanceof ProjectInsufficientPermissionsError) {
    throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
  } else if (error instanceof ProjectIdValidationError || error instanceof ProjectUpdateDataValidationError || error instanceof ProjectSlugValidationError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } else if (error instanceof ProjectRelationConflict) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  } else if (error instanceof ProjectNotModifiedError) {
    throw new HttpException(error.message, HttpStatus.NOT_MODIFIED);
  }

  // Default Error
  if (error instanceof Error) {
    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  console.error(error);
  throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
}
