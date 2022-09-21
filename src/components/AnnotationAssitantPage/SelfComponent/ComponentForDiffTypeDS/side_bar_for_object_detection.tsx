import React, { useState } from 'react'
import { Labels } from '../../../../models/annotation_assistant/labels'
import type { listColor } from '../../../../models/annotation_assistant/list_color'
import SideNextButton from './side_next_button'
import { FaHandPaper, FaPen, FaEraser, FaPaintRoller } from 'react-icons/fa'
export function SideBarForObjectDetection({
  selectedId,
  listColor,
  currClassIdx,
  setCurrClassIdx,
  setLabels,
  imgaeIdx,
  Labels,
  typeEditor,
  setTypeEditor,
}: {
  imgaeIdx: number
  Labels: Labels
  listColor: listColor
  currClassIdx: number | void
  setCurrClassIdx: (key: number) => void
  selectedId: number
  setLabels: (key: Labels) => void
  typeEditor: number | void
  setTypeEditor: (key: number) => void
}) {
  const [currPage, setCurrPage] = useState(1)
  console.log(currClassIdx)
  return (
    <div className=" w-full h-full  flex flex-col items-center relative justify-center  mt-5 overflow-hidden">
      <div className=" flex w-full h-1/6 absolute top-0 justify-around overflow-hidden">
        <div
          className=" hover:cursor-pointer btn"
          onClick={() => setTypeEditor(0)}
        >
          <FaHandPaper color={`${typeEditor == 0 ? '#661AE6' : ''}`} />
        </div>
        <div
          className=" hover:cursor-pointer btn"
          onClick={() => setTypeEditor(1)}
        >
          <FaPen color={`${typeEditor == 1 ? '#661AE6' : ''}`} />
        </div>
        <div
          className=" hover:cursor-pointer btn"
          onClick={() => setTypeEditor(2)}
        >
          <FaEraser color={`${typeEditor == 2 ? '#661AE6' : ''}`} />
        </div>
        <div
          className=" hover:cursor-pointer btn"
          onClick={() => setTypeEditor(3)}
        >
          <FaPaintRoller color={`${typeEditor == 3 ? '#661AE6' : ''}`} />
        </div>
      </div>
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
                if (selectedId != -1 && typeEditor == 3) {
                  let currLabels = Labels
                  currLabels.labels[imgaeIdx][selectedId].class_name =
                    listColor[index].className
                  setLabels(currLabels)
                }
                if (currClassIdx == index) setCurrClassIdx(-1)
                else setCurrClassIdx(index)
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
