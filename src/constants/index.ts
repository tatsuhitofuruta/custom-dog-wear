// アプリケーション定数

export const APP_CONFIG = {
  NAME: 'ワンちゃんオーダーメイド',
  DESCRIPTION: '犬服をパーツごとにカスタマイズできるオーダーメイドEC',
  VERSION: '0.1.0',
  DEFAULT_LOCALE: 'ja',
  SUPPORTED_LOCALES: ['ja', 'en'],
} as const

export const ROUTES = {
  HOME: '/',
  CUSTOMIZE: '/customize',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDERS: '/orders',
} as const

export const STORAGE_KEYS = {
  CUSTOMIZATION: 'customizer_state',
  CART: 'cart_items',
  USER_PREFERENCES: 'user_preferences',
} as const

export const MEASUREMENT_LIMITS = {
  NECK_MIN: 5,
  NECK_MAX: 100,
  CHEST_MIN: 10,
  CHEST_MAX: 200,
  LENGTH_MIN: 5,
  LENGTH_MAX: 150,
  WAIST_MIN: 10,
  WAIST_MAX: 200,
  WEIGHT_MIN: 0.1,
  WEIGHT_MAX: 100,
} as const

export const PRICE_LIMITS = {
  MIN: 0,
  MAX: 1000000,
} as const

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

export const DEBOUNCE_DELAY = 300
export const THROTTLE_DELAY = 100

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const API_TIMEOUT = 30000 // 30 seconds

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'ネットワークエラーが発生しました。接続を確認してください。',
  TIMEOUT_ERROR: 'リクエストがタイムアウトしました。もう一度お試しください。',
  SERVER_ERROR: 'サーバーエラーが発生しました。しばらくしてからお試しください。',
  VALIDATION_ERROR: '入力内容を確認してください。',
  NOT_FOUND: 'お探しの情報が見つかりませんでした。',
  UNAUTHORIZED: 'ログインが必要です。',
  FORBIDDEN: 'アクセス権限がありません。',
} as const
