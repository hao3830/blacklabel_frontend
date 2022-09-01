import { Fragment, useEffect, useRef, useState } from 'react'
import { Rect, Transformer } from 'react-konva'
import { Labels } from '../../../models/annotation_assistant/labels'
import { listColor } from '../../../models/annotation_assistant/list_color'

const BBox = ({
  Labels,
  setLabels,
  imageIdx,
  selectedId,
  items,
  idx,
  stageWidth,
  stageHeight,
  setSelectedId,
  listColor,
  setCurrClassIdx,
  currClassIdx,
  typeEditor,
}: {
  Labels: Labels
  setLabels: (key: Labels) => void
  imageIdx: number
  selectedId: number
  items: any
  idx: number
  stageWidth: number
  stageHeight: number
  setSelectedId: (key: number) => void
  listColor: listColor
  setCurrClassIdx: (key: number) => void
  currClassIdx: number
  typeEditor: number | void
}) => {
  let shapeRef = useRef<any>(null)
  let trRef = useRef<any>(null)
  const imgW = Labels.image_size[imageIdx][0]
  const imgH = Labels.image_size[imageIdx][1]
  const [isDeleted, setIsDeleted] = useState(false)
  useEffect(() => {
    if (!trRef || !trRef.current) return
    trRef.current.nodes([shapeRef.current])
    trRef.current.getLayer().batchDraw()
    setIsDeleted(false)
  }, [selectedId])

  let newX1 = (items['x1'] * stageWidth) / imgW
  let newY1 = (items['y1'] * stageHeight) / imgH
  let newX2 = (items['x2'] * stageWidth) / imgW
  let newY2 = (items['y2'] * stageHeight) / imgH
  let newW = newX2 - newX1
  let newH = newY2 - newY1

  let colorIdx = listColor.findIndex(
    (element) => element.className == items['class_name']
  )

  if (colorIdx == -1 || isDeleted) return <></>

  return (
    <Fragment key={idx}>
      <Rect
        x={newX1}
        y={newY1}
        width={newW}
        height={newH}
        fill={listColor[colorIdx].color}
        name={idx.toString()}
        opacity={currClassIdx == colorIdx ? 0.8 : 0.3}
        ref={shapeRef}
        onClick={() => {
          if (typeEditor == 2) {
            let curr = Labels
            curr.labels[imageIdx].splice(idx, 1)
            setLabels(curr)
            setIsDeleted(true)
            return
          }
          if (typeEditor != 0 && typeEditor != 3) return

          setSelectedId(idx)
          setCurrClassIdx(colorIdx)
        }}
        onDragMove={() => {
          setSelectedId(idx)
          setCurrClassIdx(colorIdx)
        }}
        draggable={typeEditor == 0}
      />

      {selectedId == idx && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (typeEditor != 0) return oldBox
            return newBox
          }}
        />
      )}
    </Fragment>
  )
}

export default BBox
