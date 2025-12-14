import 'dotenv/config';

/**
 * AWS S3 Configuration
 */
export const s3Config = {
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  bucket: process.env.AWS_S3_BUCKET || '',
};

// Validate configuration
export const validateS3Config = (): boolean => {
  const required = ['region', 'accessKeyId', 'secretAccessKey', 'bucket'];
  const missing = required.filter(key => !s3Config[key as keyof typeof s3Config]);

  if (missing.length > 0) {
    console.error('Missing required S3 configuration:', missing.join(', '));
    return false;
  }

  return true;
};

/**
 * Get the base S3 URL for constructing full URLs from paths
 */
export const getS3BaseUrl = (): string => {
  return `https://${s3Config.bucket}.s3.${s3Config.region}.amazonaws.com`;
};

/**
 * Construct full S3 URL from a path/key
 * @param path - The S3 path/key (e.g., 'packages/images/123/abc.jpg')
 * @returns Full S3 URL (e.g., 'https://bucket.s3.region.amazonaws.com/packages/images/123/abc.jpg')
 */
export const getS3Url = (path: string): string => {
  if (!path) return '';
  // If path already looks like a full URL, return as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${getS3BaseUrl()}/${path}`;
};
