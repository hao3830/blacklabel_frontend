import type { ReactElement } from 'react'
import AnnotationAssitantPageHeader from '../../src/components/AnnotationAssitantPage/Header'
import AnnotationAssitantPageSideBar from '../../src/components/AnnotationAssitantPage/SideBar'
import Header from 'next/head'

const AnnotationAssitantLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header>
        <title>Black label | Annotation Assistant</title>
      </Header>
      <div className="w-screen h-screen relative flex-col  ">
        <AnnotationAssitantPageHeader />
        <div className="flex">
          <AnnotationAssitantPageSideBar />
          {children}
        </div>
      </div>
    </>
  )
}

export default AnnotationAssitantLayout
