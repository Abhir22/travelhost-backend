/**
 * AWS S3 Adapter Types
 */

export interface S3UploadOptions {
  file: Buffer | string;
  fileName: string;
  key?: string;
  contentType?: string;
  metadata?: Record<string, string>;
  acl?: 'private' | 'public-read' | 'public-read-write' | 'authenticated-read';
}

export interface S3UploadResult {
  success: boolean;
  key?: string;
  url?: string;
  bucket?: string;
  error?: string;
}

export interface S3DeleteResult {
  success: boolean;
  key?: string;
  error?: string;
}

export interface S3FileInfo {
  key: string;
  size: number;
  lastModified?: Date;
  etag?: string;
}

export interface S3ListResult {
  success: boolean;
  files: S3FileInfo[];
  count: number;
  error?: string;
}
