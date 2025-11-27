# Adapters Commands Reference

## General Adapter Commands
npm run adapter list                    # List all available adapters
npm run adapter install <name>          # Install an adapter
npm run adapter install <name> --config # Install with interactive configuration
npm run adapter installed               # List installed adapters
npm run adapter uninstall <name>        # Uninstall an adapter

## Authentication Adapters
npm run auth:list                       # List all auth adapters
npm run auth:install <name>             # Install auth adapter
npm run auth:install <name> --model User --table user # Install with custom model/table

## ⭐ Universal Adapters (Switch providers via .env)

### Email Service Adapter (Gmail/SMTP)
npm run adapter install email-service   # Install email service adapter
# Configure in .env: EMAIL_PROVIDER=gmail or EMAIL_PROVIDER=smtp

### Storage Service Adapter (S3/Local)
npm run adapter install storage-service # Install storage service adapter
# Configure in .env: STORAGE_TYPE=local or STORAGE_TYPE=s3

## Cloud Services Adapters
npm run adapter install aws-s3          # Amazon S3 storage
npm run adapter install aws-lambda      # AWS Lambda functions
npm run adapter install aws-ses         # Amazon SES email
npm run adapter install firebase        # Firebase services

## Payment Processing Adapters
npm run adapter install stripe          # Stripe payments

## Email Service Adapters
npm run adapter install sendgrid        # SendGrid email
npm run adapter install aws-ses         # Amazon SES email

## Storage & Caching Adapters
npm run adapter install redis           # Redis cache
npm run adapter install cloudinary      # Cloudinary media management

## Messaging Adapters
npm run adapter install twilio          # Twilio SMS

## AI/ML Adapters
npm run adapter install openai          # OpenAI API

## OAuth Authentication Adapters
npm run auth:install auth-github        # GitHub OAuth
npm run auth:install auth-google        # Google OAuth
npm run auth:install auth-linkedin      # LinkedIn OAuth
npm run auth:install auth-facebook      # Facebook OAuth

## OTP Authentication Adapters
npm run auth:install auth-email-otp     # Email OTP authentication
npm run auth:install auth-mobile-otp    # Mobile OTP authentication

## Email Provider Adapters
npm run auth:install email-smtp         # SMTP email provider
npm run auth:install email-gmail        # Gmail email provider

## Quick Examples

# Install universal email service (switch between Gmail/SMTP via .env)
npm run adapter install email-service

# Install universal storage service (switch between S3/Local via .env)
npm run adapter install storage-service

# Install Stripe for payments
npm run adapter install stripe

# Install GitHub OAuth authentication
npm run auth:install auth-github

# Install Email OTP authentication
npm run auth:install auth-email-otp

# Check what's installed
npm run adapter installed

# Remove an adapter
npm run adapter uninstall storage-service

## Configuration Examples

# After installing email-service, configure in .env:
EMAIL_PROVIDER=gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_app_password

# After installing storage-service, configure in .env:
STORAGE_TYPE=local
LOCAL_UPLOAD_DIR=./uploads
LOCAL_BASE_URL=http://localhost:3000/uploads

# For production, switch to S3:
STORAGE_TYPE=s3
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1


