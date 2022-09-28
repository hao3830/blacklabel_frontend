import { Labels } from '@/models/annotation_assistant/labels'
import { useState } from 'react'
import SideNextButton from './side_next_button'

const SideBarForTextRecognition = ({
  labels,
  currIdx,
  ds_id,
}: {
  labels: void | Labels | undefined
  currIdx: number
  ds_id: string
}) => {
  const [currPage, setCurrPage] = useState(1)

  return (
    <div className=" w-full h-full flex flex-col items-center justify-center mt-5">
      {labels && labels.list_labels ? (
        labels.list_labels.map((item, index) => {
          if (index < (currPage - 1) * 5 || index >= currPage * 5) return

          return (
            <div className="form-control w-11/12  mt-5 " key={index}>
              <label className="input-group w-1/6">
                <span className="overflow-hidden">{item}</span>
                <input
                  type="text"
                  placeholder="Text ..."
                  className="input input-bordered w-5/6"
                />
              </label>
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

export default SideBarForTextRecognition
