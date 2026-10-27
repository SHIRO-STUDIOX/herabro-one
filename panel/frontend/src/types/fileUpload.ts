export interface UploadedFileItem {
  id: string
  name: string
  size: number
  type: string
  url?: string
  file?: File
  status?: 'pending' | 'uploading' | 'success' | 'error'
  progress?: number
  errorMessage?: string
}

export type FileUploadVariant = 'compact' | 'dropzone'
