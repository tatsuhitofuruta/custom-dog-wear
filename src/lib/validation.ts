import { Measurement } from '@/types'

interface ValidationError {
  field: string
  message: string
}

export function validateMeasurements(measurements: Measurement): ValidationError[] {
  const errors: ValidationError[] = []

  // 首回り
  if (measurements.neckCircumference <= 0) {
    errors.push({ field: 'neckCircumference', message: '首回りは0より大きい値を入力してください' })
  } else if (measurements.neckCircumference > 100) {
    errors.push({ field: 'neckCircumference', message: '首回りは100cm以下で入力してください' })
  }

  // 胸囲
  if (measurements.chestCircumference <= 0) {
    errors.push({ field: 'chestCircumference', message: '胸囲は0より大きい値を入力してください' })
  } else if (measurements.chestCircumference > 200) {
    errors.push({ field: 'chestCircumference', message: '胸囲は200cm以下で入力してください' })
  }

  // 着丈
  if (measurements.bodyLength <= 0) {
    errors.push({ field: 'bodyLength', message: '着丈は0より大きい値を入力してください' })
  } else if (measurements.bodyLength > 150) {
    errors.push({ field: 'bodyLength', message: '着丈は150cm以下で入力してください' })
  }

  // 胴回り
  if (measurements.waistCircumference <= 0) {
    errors.push({ field: 'waistCircumference', message: '胴回りは0より大きい値を入力してください' })
  } else if (measurements.waistCircumference > 200) {
    errors.push({ field: 'waistCircumference', message: '胴回りは200cm以下で入力してください' })
  }

  // 体重
  if (measurements.weight <= 0) {
    errors.push({ field: 'weight', message: '体重は0より大きい値を入力してください' })
  } else if (measurements.weight > 100) {
    errors.push({ field: 'weight', message: '体重は100kg以下で入力してください' })
  }

  // 論理的な整合性チェック
  if (measurements.chestCircumference < measurements.neckCircumference) {
    errors.push({
      field: 'chestCircumference',
      message: '胸囲は首回りより大きい値を入力してください'
    })
  }

  return errors
}

export function suggestSize(measurements: Measurement): 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' {
  const { chestCircumference, weight } = measurements

  if (chestCircumference < 30 || weight < 2) return 'XS'
  if (chestCircumference < 40 || weight < 5) return 'S'
  if (chestCircumference < 55 || weight < 10) return 'M'
  if (chestCircumference < 70 || weight < 20) return 'L'
  if (chestCircumference < 90 || weight < 35) return 'XL'
  return 'XXL'
}
