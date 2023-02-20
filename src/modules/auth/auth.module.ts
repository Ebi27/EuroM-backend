import { Module } from '@nestjs/common';
// import { AuthModule } from './auth/';
// import { TestsModule } from './auth/tests/tests.module';

@Module({
  imports: [AuthModule,]
})
export class AuthModule {}
