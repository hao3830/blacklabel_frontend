import { SideBarForObjectDetection } from '../SelfComponent/ComponentForDiffTypeDS/side_bar_for_object_detection'
import { SideBarForClassification } from '../SelfComponent/ComponentForDiffTypeDS/side_bar_for_classification'
import { Labels } from '@/models/annotation_assistant/labels'
import { useState, useEffect, useRef } from 'react'
import { getLabels, updateAnnotate } from '@/APIS/annotation_assistant/annotate'
import { useRouter } from 'next/router'
import { API_URL } from '@/constants/Api'
import { listColor } from '@/models/annotation_assistant/list_color'
import ImageWithBBox from '../SelfComponent/image_with_bbox'
import Konva from 'konva'
import SideBarForTextRecognition from '../SelfComponent/ComponentForDiffTypeDS/side_bar_for_text_recognition'

const AnnotateDetailPage = ({
  index,
  ds_id,
}: {
  index: string
  ds_id: string
}) => {
  const [labels, setLabels] = useState<Labels | void>()
  const [currIdx, setCurrIdx] = useState<number>(parseInt(index))
  const [selectedId, setSelectedId] = useState<number>(-1)
  const [currClassIdx, setCurrClassIdx] = useState<number>(-1)
  const [listColor, setListColor] = useState<listColor>([])
  const [typeEditor, setTypeEditor] = useState<number | void>()
  const figureRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const getDataDetailHandler = async (ds_id: string) => {
    const results = await getLabels({ ds_id })

    if (!results || listColor.length) return
    let currListColor = []
    for (let i of results.list_labels) {
      const className = i.toString()
      const color = Konva.Util.getRandomColor()
      const currColor = {
        className,
        color,
      }
      currListColor.push(currColor)
    }

    setListColor(currListColor)

    setLabels(results)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && currIdx > 0) {
      setCurrIdx(currIdx - 1)
    } else if (
      event.key === 'ArrowRight' &&
      labels &&
      currIdx < labels.images.length - 1
    ) {
      setCurrIdx(currIdx + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    if (ds_id) getDataDetailHandler(ds_id)
    else router.replace('/annotation_assistant')
  }, [])
  const handleupdateAnnotate = async ({
    ds_id,
    image_name,
    class_name,
  }: {
    ds_id: string
    image_name: string
    class_name: string
  }) => {
    if (await updateAnnotate({ ds_id, image_name, class_name })) {
      const result = await getLabels({ ds_id })

      result && setLabels(result)
    }
  }

  return (
    <div style={{ height: '100%', width: '165vh' }} className=" flex relative">
      <div className=" w-5/6 h-full flex flex-col justify-center items-center relative">
        <div className=" w-full flex justify-between absolute top-2 p-2">
          <>
            {labels && currIdx > 0 ? (
              <div
                className="btn bg-primary"
                onClick={() => {
                  // handleUpdateBbox(bbox)
                  setCurrIdx(currIdx - 1)
                }}
              >
                Previous
              </div>
            ) : (
              <div className=" btn-disabled btn ">Previous</div>
            )}
          </>
          <>
            {labels && (
              <h1 className=" text-2xl text-white overflow-hidden">
                {labels.images[currIdx]}
              </h1>
            )}
          </>
          <>
            {labels && labels.images.length > currIdx + 1 ? (
              <div
                className="btn bg-primary"
                onClick={() => {
                  // handleUpdateBbox(bbox)
                  setCurrIdx(currIdx + 1)
                }}
              >
                Next
              </div>
            ) : (
              <div className=" btn-disabled btn ">Next</div>
            )}
          </>
        </div>
        <>
          {labels && labels.images.length > currIdx && (
            <figure
              className=" w-10/12 h-5/6 absolute bottom-5"
              ref={figureRef}
            >
              {labels.ds_type == 'object_detection' ? (
                <ImageWithBBox
                  typeEditor={typeEditor}
                  setSelectedId={setSelectedId}
                  selectedId={selectedId}
                  parentRef={figureRef}
                  dsId={ds_id}
                  imageIdx={currIdx}
                  Labels={labels}
                  setLabels={setLabels}
                  listColor={listColor}
                  currClassIdx={currClassIdx}
                  setCurrClassIdx={setCurrClassIdx}
                />
              ) : (
                <img
                  src={`${API_URL}/label_tool/dataset_img?ds_id=${ds_id}&img_id=${
                    labels.images[currIdx]
                  }&img_size=${500}`}
                  alt={labels.images[currIdx]}
                  className="w-full h-full"
                />
              )}
            </figure>
          )}
        </>
      </div>
      <div className=" overflow-hidden border-base-300 border-l w-1/6 h-full flex flex-col items-center">
        {labels && labels.ds_type == 'object_detection' ? (
          <SideBarForObjectDetection
            typeEditor={typeEditor}
            setTypeEditor={setTypeEditor}
            imgaeIdx={currIdx}
            Labels={labels}
            setLabels={setLabels}
            selectedId={selectedId}
            listColor={listColor}
            currClassIdx={currClassIdx}
            setCurrClassIdx={setCurrClassIdx}
          />
        ) : labels && labels.ds_type == 'image_classification' ? (
          <SideBarForClassification
            labels={labels}
            currIdx={currIdx}
            handleupdateAnnotate={handleupdateAnnotate}
            ds_id={ds_id}
          />
        ) : (
          <SideBarForTextRecognition
            labels={labels}
            currIdx={currIdx}
            ds_id={ds_id}
          />
        )}
      </div>
    </div>
  )
}

export default AnnotateDetailPage
