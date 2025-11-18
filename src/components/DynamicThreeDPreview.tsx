'use client'

import dynamic from 'next/dynamic'
import LoadingSpinner from './LoadingSpinner'

const ThreeDPreview = dynamic(() => import('./ThreeDPreview'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <LoadingSpinner size="lg" />
    </div>
  ),
})

export default ThreeDPreview
