import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';
import { WsAdapter } from '@nestjs/platform-ws';   


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  const config = app.get(ConfigService);
  app.useWebSocketAdapter(new WsAdapter(app)) ;
  app.connectMicroservice({
    transport : Transport.MQTT, 
    options : {url: config.get<string>('MQTT_URL')} ,
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('My App API')
    .setDescription('Tài liệu API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app , document) ;
  await app.startAllMicroservices() ;
  await app.listen(config.get<number>('PORT') ?? 3000) ;
}
await bootstrap();
