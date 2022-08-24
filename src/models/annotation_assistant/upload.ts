type ImageUpload = {
  dataName: string
  imageZipFile: File | null
  linkDrive: string
  type: string
}

type LabelUpload = {
  labelFile: File | null
  type: string
  linkDrive: string
}

export type { ImageUpload, LabelUpload }