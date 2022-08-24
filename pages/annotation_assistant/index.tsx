import type { ReactElement } from 'react'
import AnnotationAssitantHomePage from '../../src/components/AnnotationAssitantPage'

import AnnotationAssitantLayout from '../../src/layout/annotation_layout'
import type { NextPageWithLayout } from '../_app'

const AnnotationAssitant: NextPageWithLayout = () => {
  return <AnnotationAssitantHomePage />
}

AnnotationAssitant.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitant
