/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Res
} from '@nestjs/common';
import * as archiver from 'archiver';
import * as AWS from 'aws-sdk';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('backup')
export class BackupController {

  private s3: AWS.S3;
  
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  @Get('/download-and-clean-bucket')
  async downloadAndCleanBucket(@Res() res: Response) {
    try {
      const bucketName = 'tdggestiondocumental';
      const foldersToClean = [
        'PPI/Tecnica/S1/',
        'PPI/Tecnica/S2/',
        'PPI/Tecnica/S3/',
        'PPI/Tecnica/S4/',
        'PPI/Tecnologia/S5/',
        'PPI/Tecnologia/S6/',
      ];

      const archive = archiver('zip');
      archive.pipe(res);

      for (const folderToClean of foldersToClean) {
        let continuationToken;
        let data;
        do {
          const params = {
            Bucket: bucketName,
            ContinuationToken: continuationToken,
            Prefix: folderToClean, // Filter objects by prefix
          };

          data = await this.s3.listObjectsV2(params).promise();

          for (const file of data.Contents) {
            const params = { Bucket: bucketName, Key: file.Key };
            const fileData = await this.s3.getObject(params).promise();
            archive.append(fileData.Body as Readable, { name: file.Key });
          }

          continuationToken = data.NextContinuationToken;
        } while (continuationToken);

        // Limpiar la carpeta especificada en el bucket
        const objectsToDelete = data.Contents.map((obj) => ({ Key: obj.Key }));
        if (objectsToDelete.length > 0) {
          await this.s3
            .deleteObjects({
              Bucket: bucketName,
              Delete: { Objects: objectsToDelete },
            })
            .promise();
        }

        // Volver a crear la carpeta en el bucket
        await this.s3
          .upload({
            Bucket: bucketName,
            Key: folderToClean, // Nombre del folder
            Body: '', // Subir un objeto vacío
          })
          .promise();
      }

      archive.finalize();
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      res.end(); // Asegurar que se cierre adecuadamente el stream de respuesta
    }
  }

}
