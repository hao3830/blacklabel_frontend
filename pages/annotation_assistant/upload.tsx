import UploadPage from '../../src/components/AnnotationAssitantPage/UploadPage/index'
import type { ReactElement } from 'react'
import AnnotationAssitantLayout from '../../src/layout/annotation_layout'
import type { NextPageWithLayout } from '../_app'

const AnnotationAssitantUpload: NextPageWithLayout = () => {
  return <UploadPage />
}

AnnotationAssitantUpload.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitantUpload
