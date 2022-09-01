import React, { useState } from 'react'
import { Labels } from '../../../../models/annotation_assistant/labels'
import type { listColor } from '../../../../models/annotation_assistant/list_color'
import SideNextButton from './side_next_button'
export function SideBarForObjectDetection({
  selectedId,
  listColor,
  currClassIdx,
  setCurrClassIdx,
  setLabels,
  imgaeIdx,
  Labels,
}: {
  imgaeIdx: number
  Labels: Labels
  listColor: listColor
  currClassIdx: number | void
  setCurrClassIdx: (key: number) => void
  selectedId: number
  setLabels: (key: Labels) => void
}) {
  const [currPage, setCurrPage] = useState(1)

  return (
    <div className=" w-full h-full  flex flex-col items-center justify-center  mt-5">
      {listColor &&
        listColor.map((item, index) => {
          if (index < (currPage - 1) * 5 || index >= currPage * 5) return

          return (
            <div
              className={`btn mt-3  h-10 ${
                index == currClassIdx ? ' opacity-100' : 'opacity-50'
              } text-white`}
              key={index}
              style={{
                background: item.color,
              }}
              onClick={() => {
                if (selectedId != -1) {
                  let currLabels = Labels
                  currLabels.labels[imgaeIdx][selectedId].class_name =
                    listColor[index].className
                  setLabels(currLabels)
                }
                setCurrClassIdx(index)
              }}
            >
              {item.className}
            </div>
          )
        })}
      <>
        {listColor && listColor.length > 5 && (
          <SideNextButton
            length={listColor.length}
            setCurrPage={setCurrPage}
            currPage={currPage}
            itemPerPage={5}
          />
        )}
      </>
    </div>
  )
}
