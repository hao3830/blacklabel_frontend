import { Fragment, useEffect, useRef, useState } from 'react'
import { Rect, Transformer } from 'react-konva'
import { listColor } from '../../../models/annotation_assistant/list_color'

const BBox = ({
  imgW,
  imgH,
  selectedId,
  items,
  idx,
  stageWidth,
  stageHeight,
  setSelectedId,
  listColor,
  setCurrClassIdx,
}: {
  imgW: number
  imgH: number
  selectedId: number
  items: any
  idx: number
  stageWidth: number
  stageHeight: number
  setSelectedId: (key: number) => void
  listColor: listColor
  setCurrClassIdx: (key: number) => void
}) => {
  let shapeRef = useRef<any>(null)
  let trRef = useRef<any>(null)
  useEffect(() => {
    if (!trRef || !trRef.current) return
    trRef.current.nodes([shapeRef.current])
    trRef.current.getLayer().batchDraw()
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

  if (colorIdx == -1) return <></>

  return (
    <Fragment key={idx}>
      <Rect
        x={newX1}
        y={newY1}
        width={newW}
        height={newH}
        fill={listColor[colorIdx].color}
        name={idx.toString()}
        opacity={selectedId == idx ? 0.8 : 0.5}
        ref={shapeRef}
        onClick={() => {
          setSelectedId(idx)
          setCurrClassIdx(colorIdx)
        }}
        onDragMove={() => {
          setSelectedId(idx)
          setCurrClassIdx(colorIdx)
        }}
        draggable={true}
      />

      {selectedId == idx && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(_, newBox) => {
            return newBox
          }}
        />
      )}
    </Fragment>
  )
}

export default BBox
