import AnnotatePage from '../../src/components/AnnotationAssitantPage/AnnotatePage'
import type { ReactElement } from 'react'
import AnnotationAssitantLayout from '../../src/layout/annotation_layout'
import type { NextPageWithLayout } from '../_app'

const AnnotationAssitantLabel: NextPageWithLayout = () => {
  return <AnnotatePage />
}

AnnotationAssitantLabel.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitantLabel
