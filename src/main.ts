import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import compression from "compression";

import { AppModule } from "./app.module";
import { AppService } from "./app.service";

/**
 * Initializes and bootstraps the NestJS application.
 *
 * This function creates the Nest application, sets up Swagger documentation
 * if the environment is development, applies global middlewares, and starts
 * the server on the specified port.
 *
 * @returns {Promise<void>} A promise that resolves when the application is bootstrapped.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<INestApplication<NestExpressApplication>>(AppModule, { cors: true });

  const appService = app.get(AppService);

  if (appService.isDev) {
    const config = new DocumentBuilder()
      .setTitle("Ticket Management System")
      .setDescription("OpenAPI specification for Ticket Management System")
      .setVersion("1.0")
      .setContact("Nikolaos Grigoropoulos", "https://www.github.com/Iznogohul", "nikos.gr.17@gmail.com")
      .addServer("/", "Access to Swagger API calls")
      .addServer("/proxy", "Access to Swagger API calls behind proxy")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api-docs", app, document);
  }

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(appService.port);
}

bootstrap().catch(err => {
  console.error("Failed to bootstrap the TMS", err);
});
