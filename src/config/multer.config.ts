import multer from 'multer';
import { Request } from 'express';

/**
 * File type configurations
 * Define allowed MIME types for different file categories
 */
export const FileTypes = {
  image: {
    mimeTypes: [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
    ],
    extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.tiff'],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  video: {
    mimeTypes: [
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
      'video/x-flv',
      'video/webm',
      'video/x-matroska',
    ],
    extensions: ['.mp4', '.mpeg', '.mov', '.avi', '.flv', '.webm', '.mkv'],
    maxSize: 100 * 1024 * 1024, // 100MB
  },
  audio: {
    mimeTypes: [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/ogg',
      'audio/webm',
      'audio/aac',
      'audio/flac',
    ],
    extensions: ['.mp3', '.mpeg', '.wav', '.ogg', '.webm', '.aac', '.flac'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  document: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
    ],
    extensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.csv'],
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  archive: {
    mimeTypes: [
      'application/zip',
      'application/x-zip-compressed',
      'application/x-rar-compressed',
      'application/x-7z-compressed',
      'application/x-tar',
      'application/gzip',
    ],
    extensions: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    maxSize: 50 * 1024 * 1024, // 50MB
  },
  any: {
    mimeTypes: [], // Allow all
    extensions: [], // Allow all
    maxSize: 10 * 1024 * 1024, // 10MB default
  },
};

/**
 * File filter factory
 * Creates a file filter function for multer based on allowed file types
 */
export const createFileFilter = (
  allowedTypes: keyof typeof FileTypes | (keyof typeof FileTypes)[]
) => {
  return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Convert single type to array
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];

    // If 'any' is included, allow all files
    if (types.includes('any')) {
      return cb(null, true);
    }

    // Collect all allowed MIME types
    const allowedMimeTypes: string[] = [];
    types.forEach(type => {
      if (FileTypes[type]) {
        allowedMimeTypes.push(...FileTypes[type].mimeTypes);
      }
    });

    // Check if file MIME type is allowed
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const typeNames = types.join(', ');
      cb(new Error(`Invalid file type. Only ${typeNames} files are allowed`));
    }
  };
};

/**
 * Get max file size for given file types
 */
export const getMaxFileSize = (
  allowedTypes: keyof typeof FileTypes | (keyof typeof FileTypes)[]
): number => {
  const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes];
  
  // Return the maximum size among all allowed types
  let maxSize = 0;
  types.forEach(type => {
    if (FileTypes[type] && FileTypes[type].maxSize > maxSize) {
      maxSize = FileTypes[type].maxSize;
    }
  });

  return maxSize || FileTypes.any.maxSize;
};

/**
 * Create multer upload middleware with file type filtering
 * 
 * @param fileType - Single file type or array of file types ('image', 'video', 'audio', 'document', 'archive', 'any')
 * @param options - Additional multer options
 * 
 * @example
 * // Single file type
 * const upload = createUploadMiddleware('image');
 * router.post('/avatar', upload.single('avatar'), controller.uploadAvatar);
 * 
 * @example
 * // Multiple file types
 * const upload = createUploadMiddleware(['image', 'video']);
 * router.post('/media', upload.single('media'), controller.uploadMedia);
 * 
 * @example
 * // Custom options
 * const upload = createUploadMiddleware('document', { limits: { fileSize: 20 * 1024 * 1024 } });
 * router.post('/document', upload.single('file'), controller.uploadDocument);
 */
export const createUploadMiddleware = (
  fileType: keyof typeof FileTypes | (keyof typeof FileTypes)[],
  options?: multer.Options
) => {
  const defaultOptions: multer.Options = {
    storage: multer.memoryStorage(),
    limits: {
      fileSize: getMaxFileSize(fileType),
    },
    fileFilter: createFileFilter(fileType),
  };

  // Merge with custom options
  const multerOptions = {
    ...defaultOptions,
    ...options,
    limits: {
      ...defaultOptions.limits,
      ...options?.limits,
    },
  };

  return multer(multerOptions);
};

/**
 * Pre-configured upload middlewares for common use cases
 */
export const uploadMiddlewares = {
  /**
   * Image upload middleware
   * Accepts: JPEG, PNG, GIF, WebP, SVG, BMP, TIFF
   * Max size: 5MB
   */
  image: createUploadMiddleware('image'),

  /**
   * Video upload middleware
   * Accepts: MP4, MPEG, MOV, AVI, FLV, WebM, MKV
   * Max size: 100MB
   */
  video: createUploadMiddleware('video'),

  /**
   * Audio upload middleware
   * Accepts: MP3, WAV, OGG, WebM, AAC, FLAC
   * Max size: 10MB
   */
  audio: createUploadMiddleware('audio'),

  /**
   * Document upload middleware
   * Accepts: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV
   * Max size: 10MB
   */
  document: createUploadMiddleware('document'),

  /**
   * Archive upload middleware
   * Accepts: ZIP, RAR, 7Z, TAR, GZ
   * Max size: 50MB
   */
  archive: createUploadMiddleware('archive'),

  /**
   * Media upload middleware (images + videos)
   * Accepts: All image and video formats
   * Max size: 100MB
   */
  media: createUploadMiddleware(['image', 'video']),

  /**
   * Any file upload middleware
   * Accepts: All file types
   * Max size: 10MB
   */
  any: createUploadMiddleware('any'),
};

/**
 * Export default upload middleware (images only)
 */
export default uploadMiddlewares.image;

