import React from 'react'
import { Data } from '@/models/annotation_assistant/data_detail'
export function DataSelecter({
  currDataName,
  data,
  setCurrDataName,
  setCurrDataId,
}: {
  currDataName: string | void
  data: Data[] | void
  setCurrDataName: (dataName: string) => void
  setCurrDataId: (id: string) => void
}) {
  return (
    <div className=" w-full h-16 flex justify-around">
      <div className="dropdown dropdown-content mt-5 ">
        <label tabIndex={0} className="btn m-1 w-64 ">
          {!currDataName ? 'Dataset Name' : `${currDataName}`}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-black rounded-box w-64 overflow-y-scroll overflow-x-hidden "
          style={{
            maxHeight: ' 50vh',
          }}
        >
          {data ? (
            data.map((item, index) => (
              <li
                key={index}
                onClick={(e) => {
                  setCurrDataName(item.ds_name)
                  setCurrDataId(item.ds_id)
                }}
              >
                <p>{item.ds_name}</p>
              </li>
            ))
          ) : (
            <li>
              <p>No dataset available </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
