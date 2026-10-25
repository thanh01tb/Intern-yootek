import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto{
    @ApiProperty({example:'First Post'})
    title: string;

    @ApiProperty({example:'Content.....' , required: false})
    content?: string;
}