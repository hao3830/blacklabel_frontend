import { BiArrowFromBottom, BiData, BiEdit } from 'react-icons/bi'
import { GiAutoRepair } from 'react-icons/gi'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import RouteButton from './route_button'
const AnnotationAssitantPageSideBar = () => {
  const [selectedPage, setSelectedPage] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    if (
      router.pathname == '/annotation_assistant/annotate' ||
      router.pathname == '/annotation_assistant/[...slug]'
    )
      setSelectedPage(2)
    else if (router.pathname == '/annotation_assistant/upload')
      setSelectedPage(1)
    else if (router.pathname == '/annotation_assistant/auto_label')
      setSelectedPage(3)
    else setSelectedPage(0)
  })

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #606c88, #3f4c6b)',
        height: '84vh',
      }}
      className=" w-1/6 relative"
    >
      <div className=" h-1/2  grid grid-cols-1 place-items-center w-full">
        <RouteButton
          routeName="/annotation_assistant"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={0}
          icon={<BiData size="1.25rem" />}
          text="Dataset"
        />
        <RouteButton
          routeName="/annotation_assistant/upload"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={1}
          icon={<BiArrowFromBottom size="1.25rem" />}
          text="Upload"
        />
        <RouteButton
          routeName="/annotation_assistant/annotate"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={2}
          icon={<BiEdit size="1.25rem" />}
          text="Annotate"
        />
        <RouteButton
          routeName="/annotation_assistant/auto_label"
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          id={3}
          icon={<GiAutoRepair size="1.25rem" />}
          text="Auto Label"
        />
      </div>

      <p className="w-full absolute bottom-2 text-center text-white overflow-hidden">
        Unstable Team @ 2022
      </p>
    </div>
  )
}

export default AnnotationAssitantPageSideBar
