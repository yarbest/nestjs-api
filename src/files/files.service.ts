import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

import { v4 } from 'uuid';

@Injectable()
export class FilesService {
  /** saves file to the server, Not BD, and returns the path to the file */
  createFile(file: Express.Multer.File) {
    try {
      // take extension from the file
      const fileName = v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      // if there is no such folder, create it
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true }); // recursive means that it will create all folders in the path
      }

      // adds file to the folder
      fs.writeFileSync(
        path.resolve(filePath, fileName),
        (file as { buffer: Buffer }).buffer,
      );
      return fileName;
    } catch (e) {
      console.log(e);

      throw new HttpException(
        'Error during file saving',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
