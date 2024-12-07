import { Body, Controller, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";

import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { UserService } from "src/user/user.service";
import { User } from "src/schemas/user.schema";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ExpressRequestWithUser } from "./interfaces/user.interface";

/**
 * Controller for user authentication and management, including registration and login.
 *
 * @class AuthController
 */
@ApiBearerAuth()
@ApiTags("Authentication")
@Controller("/api/v1/")
export class AuthController {
  /**
   * Creates an instance of AuthController.
   *
   * @param {AuthService} authService - Service for handling authentication logic.
   * @param {UserService} userService - Service for user-related operations.
   */
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Registers a new user.
   *
   * @param {RegisterUserDto} registerUserDto - Data transfer object containing registration information.
   * @returns {Promise<Partial<User>>} A promise that resolves to the newly registered user's data.
   * @throws {BadRequestException} When the request data is invalid.
   * @throws {ConflictException} When a user with the same username or email already exists.
   * @method register
   */
  @Post("register")
  @ApiResponse({
    status: 201,
    description: "User successfully registered.",
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request.",
  })
  @ApiResponse({
    status: 409,
    description: "User with this username or email already exists.",
  })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<Partial<User>> {
    return this.userService.register(registerUserDto);
  }

  /**
   * Authenticates a user and returns a JWT token.
   *
   * @param {LoginUserDto} loginUserDto - Data transfer object containing login credentials.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   * @throws {BadRequestException} When the request data is invalid.
   * @throws {UnauthorizedException} When the credentials are invalid.
   * @throws {NotFoundException} When the user is not found.
   * @method login
   */
  @Post("login")
  @ApiResponse({
    status: 201,
    description: "User successfully logged in.",
    schema: {
      example: { accessToken: "jwt.token.here" },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request.",
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials.",
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginUserDto);
  }

  /**
   * Updates the user's name.
   *
   * @param {UpdateUserDto} updateUserDto - Data transfer object containing the new username information.
   * @param {ExpressRequestWithUser} req - The request object, which includes the authenticated user data.
   * @returns {Promise<Partial<User>>} A promise that resolves to the updated user's data.
   * @throws {ForbiddenException} When the user is not authorized to update the name.
   * @method updateUserName
   */
  @UseGuards(JwtAuthGuard)
  @Put("users/name")
  async updateUserName(@Body() updateUserDto: UpdateUserDto, @Request() req: ExpressRequestWithUser): Promise<Partial<User>> {
    return this.userService.updateUserName(req.user._id, updateUserDto);
  }
}
