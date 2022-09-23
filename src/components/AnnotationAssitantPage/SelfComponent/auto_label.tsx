import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { postAutoLabel } from 'src/APIS/annotation_assistant/data'
import { getTaskState } from 'src/APIS/annotation_assistant/task'
export function AutoLabel({ dsId }: { dsId: string }) {
  const [conf, setConf] = useState('')
  const [method, setMethod] = useState('')
  const numbers = /^0\.[0-9]+$/

  const handleAutoLabel = async ({
    ds_id,
    conf_thresh,
    method,
  }: {
    ds_id: string
    conf_thresh: string
    method: string
  }) => {
    const id = toast.loading('Running auto labeling...')

    const results = await postAutoLabel({
      ds_id,
      conf_thresh,
      method,
    })
    if (results) {
      const intervalId = setInterval(async () => {
        const state = await getTaskState({ task_id: results.task_id })
        if (state == 'SUCCESS') {
          toast.update(id, {
            type: 'success',
            render: 'Upload success',
            isLoading: false,
            autoClose: 1000,
          })
          clearInterval(intervalId)
        } else if (state != 'PENDING') {
          toast.update(id, {
            type: 'error',
            render: 'Upload failed',
            isLoading: false,
            autoClose: 1000,
          })
          clearInterval(intervalId)
        }
      }, 1000)
    } else
      toast.update(id, {
        type: 'error',
        render: 'Upload failed',
        isLoading: false,
        autoClose: 1000,
      })
  }

  return (
    <div className=" w-3/4 flex flex-col">
      <div className="flex items-center w-full justify-between">
        <div className="form-control">
          <label className="input-group">
            <span>Confidence</span>
            <input
              type="text"
              value={conf}
              placeholder="Confidence score"
              className="input input-bordered input-primary"
              onChange={(e) => {
                e.preventDefault()
                if (
                  e.target.value.match(numbers) ||
                  e.target.value == '0' ||
                  e.target.value == '0.' ||
                  e.target.value == '1' ||
                  !e.target.value
                )
                  setConf(e.target.value)
              }}
            />
          </label>
        </div>

        <select
          className="select select-primary w-full max-w-xs place-self-start "
          defaultValue={method ? method : 'Method'}
          onChange={(e) => {
            setMethod(e.target.value.toLowerCase())
          }}
        >
          <option disabled>Method</option>
          <option>Yolov7</option>
        </select>
      </div>
      <div
        className="btn mt-5 btn-primary "
        onClick={(e) =>
          handleAutoLabel({
            ds_id: dsId,
            conf_thresh: conf,
            method,
          })
        }
      >
        Run auto labels
      </div>
    </div>
  )
}
