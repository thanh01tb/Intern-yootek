import { ApiProperty } from "@nestjs/swagger";

export class RegisterDto{
    @ApiProperty ({ example: 'thanh@gmail.com' , description: 'Email đăng nhập'})
    email : string;

    @ApiProperty ({ example:'123456' , minLength: 6 , description:'Mật khẩu'}) 
    password: string;

    @ApiProperty ({ example: 'Thanh' , required: false})
    name?:string; 
}