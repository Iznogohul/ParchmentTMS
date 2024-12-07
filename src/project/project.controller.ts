import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { Project } from "@/schemas/project.schema";
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { ExpressRequestWithUser } from "./interfaces/project.interface";
import { handleDomainErrors } from "@/utils";

/**
 * Controller class for managing project-related operations.
 * Provides endpoints for creating, updating, retrieving, and deleting projects.
 * The controller is protected by JWT authentication and provides responses based on the success or failure of the requested operation.
 */
@ApiBearerAuth()
@ApiTags("Project Management")
@Controller("/api/v1/projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Retrieves all projects the authenticated user has access to.
   *
   * @param {ExpressRequestWithUser} req - The request object containing the authenticated user's details.
   * @returns {Promise<Project[]>} - List of projects accessible by the user.
   * @throws {ProjectDoesNotExist} - Throws if no projects are found.
   * @throws {JwtAuthGuard} - Throws if authentication fails.
   */
  @Get()
  @ApiOperation({
    summary: "Retrieve all projects",
    description: "Fetch all projects accessible to the authenticated user.",
  })
  @ApiResponse({
    status: 200,
    description: "List of projects retrieved successfully.",
    type: [Project],
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req: ExpressRequestWithUser): Promise<Project[]> {
    try {
      const userId = req.user._id;
      req.user = null;
      const projects = await this.projectService.findAll(userId);
      return projects;
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Retrieves a single project by its ID.
   *
   * @param {string} id - The ID of the project to retrieve.
   * @param {ExpressRequestWithUser} req - The request object containing the authenticated user's details.
   * @returns {Promise<Project>} - The requested project.
   * @throws {ProjectIdValidationError} - Throws if the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - Throws if the project is not found.
   * @throws {JwtAuthGuard} - Throws if authentication fails.
   */
  @Get(":id")
  @ApiOperation({
    summary: "Retrieve a single project by ID",
    description: "Fetch details of a project using its ID.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the project to retrieve.",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "Project retrieved successfully.",
    type: Project,
  })
  @ApiResponse({
    status: 400,
    description: "Project id was not valid.",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Project not found.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") id: string, @Request() req: ExpressRequestWithUser): Promise<Project> {
    try {
      const userId = req.user._id;
      req.user = null;
      const project = await this.projectService.findOne(id, userId);
      return project;
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Creates a new project.
   *
   * @param {CreateProjectDto} createProjectDto - The data required to create a project.
   * @param {ExpressRequestWithUser} req - The request object containing the authenticated user's details.
   * @returns {Promise<{ result: string, project: Project }>} - The response object containing the result of the operation and the created project.
   * @throws {ProjectRelationConflict} - Throws if the project already exists.
   * @throws {JwtAuthGuard} - Throws if authentication fails.
   */
  @Post("")
  @ApiOperation({
    summary: "Create a new project",
    description: "Create a new project with the specified details.",
  })
  @ApiBody({
    description: "Data required to create a project",
    type: CreateProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: "Indicates, the project was successfully created.",
    type: Project,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid data provided.",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 409,
    description: "Indicates, the project already exists.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: ExpressRequestWithUser,
  ): Promise<{
    result: string;
    project: Project;
  }> {
    try {
      const userId = req.user._id;
      req.user = null;
      const createdProject = await this.projectService.create(createProjectDto, userId);
      return {
        result: "success",
        project: createdProject,
      };
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Updates an existing project.
   *
   * @param {string} id - The ID of the project to update.
   * @param {UpdateProjectDto} updateProjectDto - The data required to update the project.
   * @returns {Promise<Project>} - The updated project.
   * @throws {ProjectIdValidationError} - Throws if the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - Throws if the project is not found.
   * @throws {ProjectNotModifiedError} - Throws if no changes were made during the update.
   * @throws {JwtAuthGuard} - Throws if authentication fails.
   */
  @Patch(":id")
  @ApiOperation({
    summary: "Update a project by ID",
    description: "Update details of a project using its ID.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the project to update.",
    type: String,
  })
  @ApiBody({
    description: "Data required to update a project. Fields can be partial.",
    type: UpdateProjectDto,
  })
  @ApiResponse({
    status: 200,
    description: "The project was successfully updated.",
    type: Project,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid data provided.",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Project not found.",
  })
  @UseGuards(JwtAuthGuard)
  async update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<Project> {
    try {
      const updatedProject = await this.projectService.update(id, updateProjectDto);
      return updatedProject;
    } catch (error) {
      handleDomainErrors(error);
    }
  }

  /**
   * Deletes a project by its ID.
   *
   * @param {string} id - The ID of the project to delete.
   * @param {ExpressRequestWithUser} req - The request object containing the authenticated user's details.
   * @returns {Promise<{ result: string }>} - The response object containing the result of the operation.
   * @throws {ProjectIdValidationError} - Throws if the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - Throws if the project is not found.
   * @throws {ProjectInsufficientPermissionsError} - Throws if the user is not authorized to delete the project.
   * @throws {JwtAuthGuard} - Throws if authentication fails.
   */
  @Delete(":id")
  @ApiOperation({
    summary: "Delete a project by ID",
    description: "Remove a project from the system using its ID.",
  })
  @ApiParam({
    name: "id",
    description: "The ID of the project to delete.",
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: "The project was successfully deleted.",
  })
  @ApiResponse({
    status: 400,
    description: "Project id was not valid.",
  })
  @ApiResponse({
    status: 401,
    description: "Indicates that the user is not authorized.",
  })
  @ApiResponse({
    status: 404,
    description: "Project not found.",
  })
  @ApiResponse({ status: 500, description: "Indicates, the request failed." })
  @UseGuards(JwtAuthGuard)
  async delete(@Param("id") id: string, @Request() req: ExpressRequestWithUser): Promise<{ result: string }> {
    try {
      const userId = req.user._id;
      req.user = null;
      await this.projectService.delete(id, userId);
      return { result: "success" };
    } catch (error) {
      handleDomainErrors(error);
    }
  }
}
