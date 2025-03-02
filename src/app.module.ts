import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { TicketModule } from "./ticket/ticket.module";
import { ProjectModule } from "./project/project.module";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { HealthModule } from "./health/health.module";

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URI), HealthModule, UserModule, TicketModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
