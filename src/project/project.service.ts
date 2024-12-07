import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project, ProjectDocument } from "@/schemas/project.schema";
import {
  ProjectDoesNotExist,
  ProjectError,
  ProjectIdValidationError,
  ProjectInsufficientPermissionsError,
  ProjectNotModifiedError,
  ProjectRelationConflict,
  ProjectUpdateDataValidationError,
} from "./project.errors";
import { plainToClass } from "class-transformer";
import { hasChanges, isMongoDbIdValid } from "@/utils";

/**
 * Project Service for handling operations related to projects, such as creation, updating,
 * deletion, and retrieval of projects for a user.
 *
 * This service includes methods for CRUD operations on projects, ensuring that user roles
 * and permissions are respected during operations like creation and deletion.
 *
 * @class ProjectService
 */
@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  /**
   * Creates a new project.
   *
   * @param {CreateProjectDto} createProjectDto - The data transfer object containing project creation details.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user creating the project.
   * @returns {Promise<Project>} - The created project.
   * @throws {ProjectRelationConflict} - Throws if a project with the same name already exists.
   */
  public async create(createProjectDto: CreateProjectDto, userId: mongoose.Types.ObjectId): Promise<Project> {
    const project = plainToClass(Project, createProjectDto);

    const existingProject = await this.projectModel.findOne({
      name: project.name,
    });
    if (existingProject) {
      throw new ProjectRelationConflict(`Project with name \"${existingProject.name}\" already exists.`);
    }

    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const newProject = new this.projectModel({
      ...project,
      owner: objectIdUserId,
      createdBy: objectIdUserId,
    });

    const createdProject = await newProject.save();
    return createdProject;
  }

  /**
   * Retrieves all projects associated with a user, either as the owner or a member.
   *
   * @param {mongoose.Types.ObjectId} userId - The ID of the user.
   * @returns {Promise<Project[]>} - A list of projects the user is either an owner or member of.
   * @throws {ProjectDoesNotExist} - If no projects are found for the user.
   */
  public async findAll(userId: mongoose.Types.ObjectId): Promise<Project[]> {
    const projects = await this.projectModel
      .find({
        $or: [{ owner: userId }, { members: userId }],
      })
      .populate({ path: "owner", select: "name _id" })
      .populate("tickets")
      .populate("members")
      .select("-__v")
      .exec();
    if (projects.length <= 0) {
      throw new ProjectDoesNotExist("Projects are empty!");
    }
    return projects;
  }

  /**
   * Retrieves a single project by its ID, ensuring the user has permission to view it.
   *
   * @param {string} projectId - The ID of the project.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user.
   * @returns {Promise<Project>} - The project that the user has access to.
   * @throws {ProjectIdValidationError} - If the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - If the project does not exist or the user does not have access.
   */
  public async findOne(projectId: string, userId: mongoose.Types.ObjectId): Promise<Project> {
    if (!isMongoDbIdValid(projectId)) {
      throw new ProjectIdValidationError("Provided id is not valid");
    }
    const project = await this.projectModel
      .findOne({
        _id: projectId,
        $or: [{ owner: userId }, { members: userId }],
      })
      .populate({ path: "owner", select: "name -_id" })
      .populate("tickets")
      .populate("members")
      .select("-__v -_id")
      .exec();
    if (!project) {
      throw new ProjectDoesNotExist("Project not found or you do not have access");
    }
    return project;
  }

  /**
   * Updates a project with the provided data.
   *
   * If no changes are detected in the project, it throws an error.
   *
   * @param {string} projectId - The ID of the project to update.
   * @param {UpdateProjectDto} updateProjectDto - The updated project data.
   * @returns {Promise<Project>} - The updated project.
   * @throws {ProjectIdValidationError} - If the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - If the project does not exist.
   * @throws {ProjectNotModifiedError} - If no changes were detected in the update.
   * @throws {ProjectUpdateDataValidationError} - If update data were not valid according to db schema.
   */
  public async update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    if (!isMongoDbIdValid(projectId)) {
      throw new ProjectIdValidationError("Provided id is not valid");
    }
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) {
      throw new ProjectDoesNotExist(`Project with id \"${projectId}\" doesn't exist.`);
    }
    const validUpdate = new this.projectModel(updateProjectDto);
    if (!validUpdate.owner) {
      validUpdate.owner = project.owner;
    }
    if (!validUpdate.createdBy) {
      validUpdate.createdBy = project.createdBy;
    }
    const validationError = validUpdate.validateSync();
    if (validationError) {
      throw new ProjectUpdateDataValidationError("Invalid update data");
    }
    if (!hasChanges(project, updateProjectDto)) {
      throw new ProjectNotModifiedError("No changes detected");
    }
    const updateFields = {};
    for (const key in updateProjectDto) {
      if (updateProjectDto.hasOwnProperty(key)) {
        updateFields[key] = updateProjectDto[key];
      }
    }
    const updatedProject = await this.projectModel
      .findByIdAndUpdate(
        projectId,
        { $set: updateFields },
        {
          new: true,
        },
      )
      .populate({ path: "owner", select: "name -_id" })
      .populate("members")
      .exec();
    return updatedProject;
  }

  /**
   * Deletes a project.
   *
   * The project can only be deleted by its creator (owner).
   *
   * @param {string} projectId - The ID of the project to delete.
   * @param {mongoose.Types.ObjectId} userId - The ID of the user requesting deletion.
   * @returns {Promise<number>} - The number of deleted projects (should be 1 if successful).
   * @throws {ProjectIdValidationError} - If the provided project ID is invalid.
   * @throws {ProjectDoesNotExist} - If the project does not exist.
   * @throws {ProjectInsufficientPermissionsError} - If the user does not have permission to delete the project.
   * @throws {ProjectError} - If the deletion fails.
   */
  public async delete(projectId: string, userId: mongoose.Types.ObjectId): Promise<number> {
    if (!isMongoDbIdValid(projectId)) {
      throw new ProjectIdValidationError("Provided id is not valid");
    }
    const project = await this.projectModel.findOne({ _id: projectId }).select("-__v -_id");
    if (!project) {
      throw new ProjectDoesNotExist(`Project with id \"${projectId}\" doesn't exist.`);
    }

    if (!project.createdBy._id.equals(userId)) {
      throw new ProjectInsufficientPermissionsError(`You are not authorized to delete this project.`);
    }

    const result = await this.projectModel.deleteOne({ _id: projectId }).exec();
    if (result.deletedCount === 0) {
      throw new ProjectError(`Didn't delete project with \"${projectId}\" .`);
    }
    return result.deletedCount;
  }
}
