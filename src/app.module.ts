import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmsModule } from './films/films.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    FilmsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION as any, // Tipo de base de datos
      host: process.env.DB_HOST, // Host de la base de datos
      port: +process.env.DB_PORT, // Puerto de la base de datos
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Ruta de las entidades
      synchronize: process.env.DB_SYNCHRONIZE === 'true', // Sincronizar esquema (solo para desarrollo)
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
