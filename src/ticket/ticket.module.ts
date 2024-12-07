import { Module } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Ticket, TicketSchema } from "@/schemas/ticket.schema";
import { Project, ProjectSchema } from "@/schemas/project.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]), MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
