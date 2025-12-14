# AWS S3 Adapter

Amazon S3 storage adapter for file uploads and management.

## Configuration

Add the following environment variables to your `.env` file:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET=your_bucket_name
```

## Usage

### Upload a File

```typescript
import { s3Adapter } from '@/adapters/aws-s3/s3.adapter';

// Upload from buffer
const result = await s3Adapter.upload({
  file: fileBuffer,
  fileName: 'example.pdf',
  contentType: 'application/pdf',
  acl: 'public-read',
});

if (result.success) {
  console.log('File uploaded:', result.url);
}
```

### Get Signed URL

```typescript
// Get a temporary signed URL (expires in 1 hour)
const signedUrl = await s3Adapter.getSignedUrl('path/to/file.pdf', 3600);
```

### Delete a File

```typescript
const result = await s3Adapter.delete('path/to/file.pdf');
```

### List Files

```typescript
const result = await s3Adapter.list('uploads/', 100);
console.log('Files:', result.files);
```

### Download a File

```typescript
const buffer = await s3Adapter.download('path/to/file.pdf');
```

## Example: File Upload Endpoint

```typescript
import { Router } from 'express';
import multer from 'multer';
import { s3Adapter } from '@/adapters/aws-s3/s3.adapter';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  const result = await s3Adapter.upload({
    file: req.file.buffer,
    fileName: req.file.originalname,
    contentType: req.file.mimetype,
  });

  if (result.success) {
    res.json({ url: result.url, key: result.key });
  } else {
    res.status(500).json({ error: result.error });
  }
});

export default router;
```

## Documentation

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)
