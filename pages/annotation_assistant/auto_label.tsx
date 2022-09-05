import type { ReactElement } from 'react'
import AutoLabelPage from '../../src/components/AnnotationAssitantPage/AutoLabel'

import AnnotationAssitantLayout from '../../src/layout/annotation_layout'
import type { NextPageWithLayout } from '../_app'

const AnnotationAssitant: NextPageWithLayout = () => {
  return <AutoLabelPage />
}

AnnotationAssitant.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitant
