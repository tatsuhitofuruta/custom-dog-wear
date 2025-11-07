import { CustomizerProvider } from '@/contexts/CustomizerContext'

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CustomizerProvider>{children}</CustomizerProvider>
}
