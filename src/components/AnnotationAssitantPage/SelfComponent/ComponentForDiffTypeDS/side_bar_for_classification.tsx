import React from 'react'
import { Labels } from '../../../../models/annotation_assistant/labels'
import SideNextButton from './side_next_button'
import { useState } from 'react'
export function SideBarForClassification({
  labels,
  currIdx,
  handleupdateAnnotate,
  ds_id,
}: {
  labels: void | Labels | undefined
  currIdx: number
  ds_id: string
  handleupdateAnnotate: ({
    ds_id,
    image_name,
    class_name,
  }: {
    ds_id: string
    image_name: string
    class_name: string
  }) => void
}) {
  const [currPage, setCurrPage] = useState(1)
  return (
    <div className=" w-full h-full flex flex-col items-center justify-center mt-5">
      {labels && labels.list_labels ? (
        labels.list_labels.map((item, index) => {
          if (index < (currPage - 1) * 5 || index >= currPage * 5) return
          let isChecked = item == labels?.labels[currIdx]
          return (
            <div
              className={`btn w-3/4 m-2 ${
                isChecked && 'btn-primary'
              } text-white`}
              key={index}
              onClick={() => {
                if (isChecked) return
                handleupdateAnnotate({
                  ds_id: ds_id,
                  image_name: labels.images[currIdx],
                  class_name: item,
                })
              }}
            >
              {item}
            </div>
          )
        })
      ) : (
        <h1 className=" text-2xl text-center ">There no label</h1>
      )}
      <>
        {labels && labels.list_labels.length > 5 && (
          <SideNextButton
            length={labels.list_labels.length}
            setCurrPage={setCurrPage}
            currPage={currPage}
            itemPerPage={5}
          />
        )}
      </>
    </div>
  )
}
