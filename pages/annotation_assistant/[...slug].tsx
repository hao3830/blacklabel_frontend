import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'
import AnnotateDetailPage from '../../src/components/AnnotationAssitantPage/AnnotatePage/annotate_detail_page'
import AnnotationAssitantLayout from '../../src/layout/annotation_layout'

const AnnotationAssitantDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const slug = (router.query.slug as string[]) || []
  const index = slug[0]
  const ds_id = slug[1]

  return <AnnotateDetailPage index={index} ds_id={ds_id} />
}

AnnotationAssitantDetail.getLayout = function getLayout(page: ReactElement) {
  return <AnnotationAssitantLayout>{page}</AnnotationAssitantLayout>
}

export default AnnotationAssitantDetail
