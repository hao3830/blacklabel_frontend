import React from 'react'
import { DataDetail } from '../../../models/annotation_assistant/data_detail'
import NextPageButton from './next_page_button'
export function ClassName({
  dataDetail,
  currPage,
  setCurrPage,
}: {
  dataDetail: DataDetail
  currPage: number
  setCurrPage: (key: number) => void
}) {
  return (
    <>
      <div className=" w-full grid grid-rows-3 grid-cols-5 place-items-center mt-5 ">
        {dataDetail.list_labels.map((labels, index) => {
          if (index < (currPage - 1) * 15 || index >= currPage * 15) return
          return (
            <div
              key={index}
              className=" w-1/3 h-16 bg-primary rounded flex justify-center items-center text-white mt-3"
            >
              {labels}
            </div>
          )
        })}
        <label
          className="w-1/3 btn h-16 bg-primary rounded flex justify-center items-center modal-button text-white mt-3"
          htmlFor="add-class-modal"
        >
          +
        </label>
      </div>

      {dataDetail.list_labels.length > 15 && (
        <NextPageButton
          length={dataDetail.list_labels.length}
          setCurrPage={setCurrPage}
          currPage={currPage}
          itemPerPage={10}
        />
      )}
    </>
  )
}
