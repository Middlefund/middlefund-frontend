import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  s3 = new S3Client({
    region: environment.AWS_REGION,
    credentials: {
      accessKeyId: environment.AWS_ACCESS_KEY_ID,
      secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
    },
  });

  constructor(private toastService: ToastrService) {}

  async uploadImage(image: File) {
    const file = image; // Assuming you've set up the appropriate multer middleware

    if (!file) {
      throw new Error('No file uploaded');
    }

    const key = `${new Date().getTime()}-${file.name}`;
    const putCommand = new PutObjectCommand({
      Bucket: environment.AWS_BUCKET_NAME,
      Key: key,
      Body: file,
    });

    try {
      await this.s3.send(putCommand);
      console.log(
        `https://${environment.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      );
      return `https://${environment.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
    } catch (error) {
      this.toastService.error('Upload failed, Please try again');
      throw error;
    }
  }
}
