import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ... (ValidationPipe and other configuration)

  const config = new DocumentBuilder()
    .setTitle('TechnoEvo')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('evo')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Customizing Swagger UI
  const options = {
    customCss: '.swagger-ui .topbar { background-color: #333; }', // Example of custom CSS
    customJs: '/custom.js', // Example of including custom JavaScript
    swaggerOptions: {
      docExpansion: 'list', // Controls the initial expansion state of the doc tree
    },
  };

  SwaggerModule.setup('docs', app, document, options);

  await app.listen(5000);
  console.log(`Application listening on port: ${5000}`);
}

bootstrap();
