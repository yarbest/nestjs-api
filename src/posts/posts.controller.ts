import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPostDTO';
import { FileInterceptor } from '@nestjs/platform-express';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image')) // image - field name in the body
  @Post()
  createPost(
    @Body() createPostDTO: CreatePostDTO,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postsService.createPost(createPostDTO, image);
  }
}
