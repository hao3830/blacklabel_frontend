import { useEffect, useState, RefObject, useCallback } from 'react'
import { Bboxes, Labels } from '../../../models/annotation_assistant/labels'
import { API_URL } from '../../../constants/Api'
import { Image as Img, Layer, Stage } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import BBox from './bbox'
import { listColor } from '../../../models/annotation_assistant/list_color'
import {
  getLabels,
  updateAnnotate,
} from '../../../APIS/annotation_assistant/annotate'

const ImageWithBBox = ({
  setSelectedId,
  selectedId,
  imageIdx,
  dsId,
  Labels,
  setLabels,
  parentRef,
  listColor,
  currClassIdx,
  setCurrClassIdx,
  typeEditor,
}: {
  selectedId: number
  setSelectedId: (key: number) => void
  listColor: listColor
  currClassIdx: number
  setCurrClassIdx: (key: number) => void
  imageIdx: number
  dsId: string
  Labels: Labels
  setLabels: (key: Labels) => void
  parentRef: RefObject<HTMLElement>
  typeEditor: number | void
}) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [stageWidth, setStageWidth] = useState<number>(0)
  const [stageHeight, setStageHeight] = useState<number>(0)
  const [image, setImage] = useState<HTMLImageElement>()
  const [newAnnotation, setNewAnnotation] = useState<Bboxes[]>([])

  const [, updateState] = useState({})
  const forceUpdate = useCallback(() => updateState({}), [])

  const updateBboxHandler = async (Idx: number) => {
    let bbox: Bboxes[] = []
    let b: Bboxes
    for (b of Labels.labels[Idx]) {
      let curr = {
        x1: Math.round(b.x1),
        y1: Math.round(b.y1),
        x2: Math.round(b.x2),
        y2: Math.round(b.y2),
        class_name: b.class_name,
      }

      bbox.push(curr)
    }
    await updateAnnotate({
      ds_id: dsId,
      image_name: Labels.images[imageIdx],
      bbox: bbox,
      class_name: 'None',
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key == 'Delete' &&
      selectedId != -1 &&
      Labels &&
      Labels.labels[imageIdx] &&
      Labels.labels[imageIdx].length > selectedId
    ) {
      let curr = Labels
      curr.labels[imageIdx].splice(selectedId, 1)
      setLabels(curr)
      setSelectedId(-1)
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedId])

  useEffect(() => {
    if (parentRef.current) {
      setStageWidth(parentRef.current.offsetWidth)
      setStageHeight(parentRef.current.offsetHeight)
    }
  }, [parentRef])

  const handleReload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.NONE
    updateBboxHandler(imageIdx)
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleReload)
    setSelectedId(-1)
    let image = new Image()
    image.src = `${API_URL}/label_tool/dataset_img?ds_id=${dsId}&img_id=${
      Labels.images[imageIdx]
    }&img_size=${500}`
    setImage(image)

    return () => {
      updateBboxHandler(imageIdx)
      window.removeEventListener('beforeunload', handleReload)
    }
  }, [imageIdx])

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 0 && currClassIdx != -1 && typeEditor == 1) {
      let { x, y } = event.target.getStage()!.getPointerPosition()!
      const imgW = Labels.image_size[imageIdx][0]
      const imgH = Labels.image_size[imageIdx][1]
      x = (x * imgW) / stageWidth
      y = (y * imgH) / stageHeight
      let curr = Labels
      let currBbox: Bboxes = {
        x1: x,
        y1: y,
        x2: x,
        y2: y,
        class_name: currClassIdx ? listColor[currClassIdx].className : 'None',
      }

      curr.labels[imageIdx].push(currBbox)
      setLabels(curr)
      setIsDrawing(true)
      setNewAnnotation([
        {
          x1: x,
          y1: y,
          x2: x,
          y2: y,
          class_name: currClassIdx ? listColor[currClassIdx].className : 'None',
        },
      ])
    }
  }

  const handleMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x1
      const sy = newAnnotation[0].y1

      let { x, y } = event.target.getStage()!.getPointerPosition()!
      const imgW = Labels.image_size[imageIdx][0]
      const imgH = Labels.image_size[imageIdx][1]
      x = (x * imgW) / stageWidth
      y = (y * imgH) / stageHeight
      const annotationToAdd: Bboxes = {
        x1: sx,
        y1: sy,
        x2: x,
        y2: y,
        class_name: listColor[currClassIdx].className,
      }
      setNewAnnotation([])
      setIsDrawing(false)

      let curr = Labels
      curr.labels[imageIdx].splice(
        curr.labels[imageIdx].length - 1,
        1,
        annotationToAdd
      )
      setLabels(curr)
    }
  }
  const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 1 && isDrawing) {
      const sx = newAnnotation[0].x1
      const sy = newAnnotation[0].y1
      let { x, y } = event.target.getStage()!.getPointerPosition()!

      const imgW = Labels.image_size[imageIdx][0]
      const imgH = Labels.image_size[imageIdx][1]

      x = (x * imgW) / stageWidth
      y = (y * imgH) / stageHeight
      const annotate = {
        x1: sx,
        y1: sy,
        x2: x,
        y2: y,
        class_name: listColor[currClassIdx].className,
      }

      let curr = Labels
      curr.labels[imageIdx].splice(
        curr.labels[imageIdx].length - 1,
        1,
        annotate
      )

      setLabels(curr)
      setNewAnnotation([annotate])
    }
  }

  return stageWidth ? (
    <Stage
      width={stageWidth}
      height={stageHeight}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseUp={(e) => handleMouseUp(e)}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <Layer>
        <Img
          image={image}
          x={0}
          y={0}
          width={stageWidth}
          height={stageHeight}
          onClick={() => {
            setSelectedId(-1)
          }}
        />
      </Layer>
      <Layer>
        {Labels &&
          Labels.labels[imageIdx].map((items, idx) => {
            return (
              <BBox
                key={idx}
                idx={idx}
                items={items}
                Labels={Labels}
                setLabels={setLabels}
                imageIdx={imageIdx}
                selectedId={selectedId}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                setSelectedId={setSelectedId}
                listColor={listColor}
                setCurrClassIdx={setCurrClassIdx}
                currClassIdx={currClassIdx}
                typeEditor={typeEditor}
                forceUpdate={forceUpdate}
              />
            )
          })}
      </Layer>
    </Stage>
  ) : (
    <div key={'a'}></div>
  )
}

export default ImageWithBBox
