import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { TicketController } from "./ticket.controller";
import { TicketService } from "./ticket.service";

import { Project, ProjectSchema } from "@/schemas/project.schema";
import { Ticket, TicketSchema } from "@/schemas/ticket.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]), MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
