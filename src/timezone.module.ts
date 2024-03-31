/* eslint-disable prettier/prettier */
// timezone.module.ts
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'TIMEZONE',
      useValue: 'America/Bogota',
    },
  ],
  exports: ['TIMEZONE'],
})
export class TimezoneModule {}
