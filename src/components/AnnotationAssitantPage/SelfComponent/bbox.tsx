import { Rect as R } from 'konva/lib/shapes/Rect'
import { Transformer as T } from 'konva/lib/shapes/Transformer'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Rect, Transformer } from 'react-konva'
import { Bboxes, Labels } from '../../../models/annotation_assistant/labels'
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
  forceUpdate,
}: {
  Labels: Labels
  setLabels: (key: Labels) => void
  imageIdx: number
  selectedId: number
  items: Bboxes
  idx: number
  stageWidth: number
  stageHeight: number
  setSelectedId: (key: number) => void
  listColor: listColor
  setCurrClassIdx: (key: number) => void
  currClassIdx: number
  typeEditor: number | void
  forceUpdate: () => void
}) => {
  let shapeRef = useRef<R>(null)
  let trRef = useRef<T>(null)
  useEffect(() => {
    if (!trRef || !trRef.current || !shapeRef.current) return
    trRef.current.nodes([shapeRef.current])
    trRef.current.getLayer()!.batchDraw()
  }, [selectedId])

  const imgW = Labels.image_size[imageIdx][0]
  const imgH = Labels.image_size[imageIdx][1]
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

  const updateBbox = async (rect: R) => {
    let curr = Labels
    curr.labels[imageIdx][idx].x1 = (rect.x() * imgW) / stageWidth
    curr.labels[imageIdx][idx].x2 =
      ((rect.x() + rect.width()) * imgW) / stageWidth
    curr.labels[imageIdx][idx].y1 = (rect.y() * imgH) / stageHeight
    curr.labels[imageIdx][idx].y2 =
      ((rect.y() + rect.height()) * imgH) / stageHeight

    setLabels(curr)
  }

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
            Labels.labels[imageIdx].splice(idx, 1)
            forceUpdate()
            setLabels(Labels)
            return
          }
          if (typeEditor != 0 && typeEditor != 3) return

          setSelectedId(idx)
          setCurrClassIdx(colorIdx)
        }}
        onDragEnd={() => {
          if (shapeRef.current) updateBbox(shapeRef.current)
          setCurrClassIdx(colorIdx)
        }}
        onTransformEnd={() => {
          if (shapeRef.current) updateBbox(shapeRef.current)
        }}
        draggable={typeEditor == 0}
      />

      {selectedId == idx && (
        <Transformer
          ref={trRef}
          rotateEnabled={false}
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
