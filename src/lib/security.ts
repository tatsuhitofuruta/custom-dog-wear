/**
 * セキュリティ関連のユーティリティ関数
 */

/**
 * XSS対策：HTML文字列をサニタイズ
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * URLのバリデーション
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

/**
 * CSP (Content Security Policy) ヘッダー生成
 */
export function generateCSPHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // Next.jsとThree.jsで必要
    "style-src 'self' 'unsafe-inline'", // Tailwind CSSで必要
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ]

  return directives.join('; ')
}

/**
 * セキュアなランダム文字列生成
 */
export function generateSecureRandomString(length: number = 32): string {
  if (typeof window === 'undefined') {
    return Math.random().toString(36).substring(2, length + 2)
  }

  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * 入力値の検証（数値）
 */
export function validateNumber(
  value: unknown,
  min?: number,
  max?: number
): number | null {
  const num = Number(value)

  if (isNaN(num)) return null
  if (min !== undefined && num < min) return null
  if (max !== undefined && num > max) return null

  return num
}

/**
 * Rate limiting用のシンプルなトークンバケット
 */
export class RateLimiter {
  private tokens: number
  private lastRefill: number
  private readonly capacity: number
  private readonly refillRate: number

  constructor(capacity: number = 10, refillRate: number = 1) {
    this.capacity = capacity
    this.tokens = capacity
    this.refillRate = refillRate
    this.lastRefill = Date.now()
  }

  attempt(): boolean {
    this.refill()

    if (this.tokens > 0) {
      this.tokens--
      return true
    }

    return false
  }

  private refill() {
    const now = Date.now()
    const timePassed = (now - this.lastRefill) / 1000
    const tokensToAdd = timePassed * this.refillRate

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd)
    this.lastRefill = now
  }
}
