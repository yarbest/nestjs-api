import { Injectable } from '@nestjs/common';
import { PostsModel } from './posts.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDTO } from './dto/createPostDTO';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostsModel) private postsRepository: typeof PostsModel,
    private filesService: FilesService,
  ) {}

  async createPost(createPostDTO: CreatePostDTO, image: Express.Multer.File) {
    const imageSrc = this.filesService.createFile(image);
    const createdPost = await this.postsRepository.create({
      ...createPostDTO,
      imageSrc,
    });

    return createdPost;
  }
}
