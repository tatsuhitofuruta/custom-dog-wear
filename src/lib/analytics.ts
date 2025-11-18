/**
 * アナリティクス関連の関数
 */

type EventParams = Record<string, string | number | boolean>

export const analytics = {
  /**
   * ページビュー計測
   */
  pageView: (url: string) => {
    if (typeof window === 'undefined') return

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
        page_path: url,
      })
    }

    // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview',
        page: url,
      })
    }
  },

  /**
   * イベント計測
   */
  event: (eventName: string, params?: EventParams) => {
    if (typeof window === 'undefined') return

    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, params)
    }

    // Google Tag Manager
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...params,
      })
    }

    // カスタムアナリティクス
    console.log('[Analytics]', eventName, params)
  },

  /**
   * Eコマースイベント
   */
  ecommerce: {
    viewItem: (productId: string, productName: string, price: number) => {
      analytics.event('view_item', {
        item_id: productId,
        item_name: productName,
        price,
      })
    },

    addToCart: (productId: string, productName: string, price: number) => {
      analytics.event('add_to_cart', {
        item_id: productId,
        item_name: productName,
        price,
      })
    },

    beginCheckout: (value: number) => {
      analytics.event('begin_checkout', {
        value,
        currency: 'JPY',
      })
    },

    purchase: (transactionId: string, value: number) => {
      analytics.event('purchase', {
        transaction_id: transactionId,
        value,
        currency: 'JPY',
      })
    },
  },

  /**
   * カスタマイズイベント
   */
  customization: {
    selectProduct: (productId: string) => {
      analytics.event('select_product', { product_id: productId })
    },

    changePart: (partId: string, materialId: string, colorId: string) => {
      analytics.event('change_part', {
        part_id: partId,
        material_id: materialId,
        color_id: colorId,
      })
    },

    completeMeasurement: () => {
      analytics.event('complete_measurement')
    },

    viewPreview: (mode: '2d' | '3d') => {
      analytics.event('view_preview', { mode })
    },
  },
}

// グローバル型定義
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}
