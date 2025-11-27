import * as jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@/core/exceptions/http.exception';

/**
 * JWT Payload Interface
 * Define the structure of JWT payload
 */
export interface JWTPayload {
  userId: string;
  email?: string;
  mobile?: string;
  name?: string;
  [key: string]: any; // Allow additional properties
}

/**
 * JWT Helper Class
 * Utility for generating and verifying JWT tokens
 */
export class JwtHelper {
  private static readonly secret: jwt.Secret = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly refreshSecret: jwt.Secret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';
  private static readonly expiresIn: jwt.SignOptions['expiresIn'] =
    (process.env.JWT_EXPIRES_IN || '24h') as jwt.SignOptions['expiresIn'];
  private static readonly refreshExpiresIn: jwt.SignOptions['expiresIn'] =
    (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'];

  /**
   * Generate access token
   * @param payload - JWT payload
   * @returns JWT token string
   */
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  /**
   * Generate refresh token
   * @param payload - JWT payload
   * @returns Refresh token string
   */
  static generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn });
  }

  /**
   * Verify and decode token
   * @param token - JWT token to verify
   * @returns Decoded JWT payload
   * @throws UnauthorizedException if token is invalid
   */
  static verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * Verify refresh token
   * @param token - Refresh token to verify
   * @returns Decoded JWT payload
   * @throws UnauthorizedException if token is invalid
   */
  static verifyRefreshToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.refreshSecret) as JWTPayload;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken - Refresh token
   * @returns New access token
   */
  static refreshToken(refreshToken: string): string {
    const decoded = this.verifyRefreshToken(refreshToken);
    const { userId, email, mobile, name } = decoded;
    return this.generateToken({ userId, email, mobile, name });
  }
}
