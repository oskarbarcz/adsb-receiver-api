import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pack from '../../../../package.json';
import { INestApplication } from '@nestjs/common';

function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('ADS-B Receiver')
    .setDescription('ADS-B signal receiver')
    .setVersion(pack.version)
    .addServer('https://adsb.barcz.me', 'Production')
    .addServer('http://localhost', 'Local development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Enter your JWT token in the format: **Bearer &lt;token&gt;**',
      },
      'access-token',
    )
    .setContact('Oskar Barcz', 'https://barcz.me', 'flight-tracker@barcz.me')
    .setLicense('Unlicense', 'https://opensource.org/licenses/Unlicense')
    .build();
}

export function configureSwagger(app: INestApplication): void {
  const config = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: `.swagger-ui .models { display: none !important; }`,
  });
}
