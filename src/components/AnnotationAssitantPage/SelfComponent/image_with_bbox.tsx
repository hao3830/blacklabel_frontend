import { useEffect, useState, RefObject } from 'react'
import { Bboxes, Labels } from '../../../models/annotation_assistant/labels'
import { API_URL } from '../../../constants/Api'
import { Image as Img, Layer, Stage } from 'react-konva'
import { KonvaEventObject } from 'konva/lib/Node'
import BBox from './bbox'
import { listColor } from '../../../models/annotation_assistant/list_color'
import { getLabels, updateAnnotate } from '../../../APIS/annotation_assistant/annotate'
const ImageWithBBox = ({
  setSelectedId,
  selectedId,
  imgaeIdx,
  dsId,
  Labels,
  setLabels,
  parentRef,
  listColor,
  currClassIdx,
  setCurrClassIdx,
}: {
  selectedId: number
  setSelectedId: (key: number) => void
  listColor: listColor
  currClassIdx: number
  setCurrClassIdx: (key: number) => void
  imgaeIdx: number
  dsId: string
  Labels: Labels
  setLabels: (key: Labels) => void
  parentRef: RefObject<HTMLElement>
}) => {
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [stageWidth, setStageWidth] = useState<number>(0)
  const [stageHeight, setStageHeight] = useState<number>(0)
  const [image, setImage] = useState<HTMLImageElement>()
  const [newAnnotation, setNewAnnotation] = useState<any>([])

  const updateBboxHandler = async () => {
    if (!currClassIdx) return
    let bbox: Bboxes[] = []
    let b: Bboxes
    let currLabel = Labels
    for (b of currLabel.labels[imgaeIdx]) {

      // let curr = {
      //   x1
      // }

      const imgW = Labels.image_size[imgaeIdx][0]
      const imgH = Labels.image_size[imgaeIdx][1]


      let curr = {
        x1: (b.x1* stageWidth) /  imgW,
        y1: (b.y1* stageHeight) /  imgH,
        x2: (b.x2* stageWidth) /  imgW,
        y2: (b.y2* stageHeight) /  imgH,
        class_name:b.class_name
      }
      
      bbox.push(curr)
    }
    
    const uploadResult = await updateAnnotate({
      ds_id: dsId,
      image_name: Labels.images[imgaeIdx],
      bbox: bbox,
      class_name: 'None',
    })
    console.log(uploadResult)
    if(uploadResult) {
    const result = await getLabels({ ds_id:dsId })
      result && setLabels(result)
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (
      e.key == 'Delete' &&
      selectedId != -1 &&
      Labels &&
      Labels.labels[imgaeIdx] &&
      Labels.labels[imgaeIdx].length > selectedId
    ) {
      let curr = Labels
      curr.labels[imgaeIdx].splice(selectedId, 1)
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

  useEffect(() => {
    setSelectedId(-1)
    let image = new Image()
    image.src = `${API_URL}/label_tool/dataset_img?ds_id=${dsId}&img_id=${
      Labels.images[imgaeIdx]
    }&img_size=${500}`
    setImage(image)

    return () => {
      updateBboxHandler()
    }
  }, [imgaeIdx])

  const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    if (newAnnotation.length === 0 && selectedId == -1 && currClassIdx != -1) {
      let { x, y } = event.target.getStage()!.getPointerPosition()!
      const imgW = Labels.image_size[imgaeIdx][0]
      const imgH = Labels.image_size[imgaeIdx][1]
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

      curr.labels[imgaeIdx].push(currBbox)
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
      const imgW = Labels.image_size[imgaeIdx][0]
      const imgH = Labels.image_size[imgaeIdx][1]
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
      curr.labels[imgaeIdx].splice(
        curr.labels[imgaeIdx].length - 1,
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

      const imgW = Labels.image_size[imgaeIdx][0]
      const imgH = Labels.image_size[imgaeIdx][1]

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
      curr.labels[imgaeIdx].splice(
        curr.labels[imgaeIdx].length - 1,
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
          Labels.labels[imgaeIdx].map((items, idx) => (
            <BBox
              key={idx}
              idx={idx}
              items={items}
              imgW={Labels.image_size[imgaeIdx][0]}
              imgH={Labels.image_size[imgaeIdx][1]}
              selectedId={selectedId}
              stageWidth={stageWidth}
              stageHeight={stageHeight}
              setSelectedId={setSelectedId}
              listColor={listColor}
              setCurrClassIdx={setCurrClassIdx}
            />
          ))}
      </Layer>
    </Stage>
  ) : (
    <div key={'a'}></div>
  )
}

export default ImageWithBBox
