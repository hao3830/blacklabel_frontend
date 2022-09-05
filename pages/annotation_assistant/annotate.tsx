import type { ReactElement } from 'react'
import AnnotationAssitantLayout from '../../src/layout/annotation_layout'
import type { NextPageWithLayout } from '../_app'
import dynamic from 'next/dynamic'

const AnnotationAssitantLabel: NextPageWithLayout = () => {
  const AnnotatePage = dynamic(
    () =>
      import('../../src/components/AnnotationAssitantPage/AnnotatePage/index'),
    {
      ssr: false,
    }
  )

  return <AnnotatePage />
}

AnnotationAssitantLabel.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitantLabel
