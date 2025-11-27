/**
 * OTP (One-Time Password) Helper
 * Utility for generating and validating OTPs
 */

export class OTP {
  /**
   * Generate a random numeric OTP
   * @param length - Length of the OTP (default: 6)
   * @returns Generated OTP as string
   */
  static generate(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    
    return otp;
  }

  /**
   * Generate OTP expiry time
   * @param minutes - Minutes until expiry (default: 5)
   * @returns Date object representing expiry time
   */
  static generateExpiry(minutes: number = 5): Date {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + minutes);
    return expiry;
  }

  /**
   * Check if OTP has expired
   * @param expiryDate - Expiry date to check
   * @returns true if expired, false otherwise
   */
  static isExpired(expiryDate: Date): boolean {
    return new Date() > new Date(expiryDate);
  }

  /**
   * Validate OTP
   * @param inputOtp - OTP entered by user
   * @param storedOtp - OTP stored in database
   * @param expiryDate - Expiry date of the OTP
   * @returns Object with validation result and message
   */
  static validate(
    inputOtp: string,
    storedOtp: string,
    expiryDate: Date
  ): { valid: boolean; message?: string } {
    // Check if OTP has expired
    if (this.isExpired(expiryDate)) {
      return { valid: false, message: 'OTP has expired' };
    }

    // Check if OTP matches
    if (inputOtp !== storedOtp) {
      return { valid: false, message: 'Invalid OTP' };
    }

    return { valid: true };
  }

  /**
   * Generate alphanumeric OTP
   * @param length - Length of the OTP (default: 6)
   * @returns Generated alphanumeric OTP
   */
  static generateAlphanumeric(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += chars[Math.floor(Math.random() * chars.length)];
    }
    
    return otp;
  }

  /**
   * Hash OTP for secure storage (optional)
   * @param otp - OTP to hash
   * @returns Hashed OTP
   */
  static hash(otp: string): string {
    // Simple hash for demonstration - in production, use bcrypt or similar
    return Buffer.from(otp).toString('base64');
  }

  /**
   * Compare OTP with hashed version
   * @param otp - Plain OTP
   * @param hashedOtp - Hashed OTP
   * @returns true if match, false otherwise
   */
  static compareHash(otp: string, hashedOtp: string): boolean {
    return this.hash(otp) === hashedOtp;
  }
}

