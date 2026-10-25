import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './dto/auth.dto.js';
import { ApiOperation, ApiResetContentResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({summary:'Đăng ký tài khoản'})
  @ApiResponse({status: 201, description:'Đăng ký thành công'})
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({summary:'Đăng nhập, trả về JWT'})
  @ApiResponse({status: 200, description:'Trả về access_token'})
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}