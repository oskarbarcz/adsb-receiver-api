import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { configureInputValidation } from 'core/validation/validation.config';
import { configureSwagger } from './core/http/swagger/swagger.config';
import { configureHelmet } from './core/http/helmet/helmet.config';
import { configureCors } from './core/http/cors/cors.config';

(async () => {
  const app = await NestFactory.create(AppModule);

  configureInputValidation(app);
  configureSwagger(app);
  configureHelmet(app);
  configureCors(app);

  await app.listen(3000);
})();
