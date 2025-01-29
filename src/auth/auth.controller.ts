import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from './dto/authDTO';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }

  @Post('register')
  register(@Body() authDTO: AuthDTO) {
    return this.authService.register(authDTO);
  }
}
