import { useState } from 'react'
import { toast } from 'react-toastify'
import { LabelUpload } from '.'
import { getTaskState } from '@/APIS/annotation_assistant/task'
import {
  postLabelData,
  TaskRespone,
} from '@/APIS/annotation_assistant/upload'
import LabelInfoTitle from '@/constants/LabelInfo'
import { useRouter } from 'next/router'

const Step2 = ({
  setCurrStep,
  setCurrLabelUpload,
  currTask,
}: {
  setCurrStep: (step: number) => void
  setCurrLabelUpload: (labelUpload: LabelUpload) => void
  currTask: TaskRespone
}) => {
  const [currLinkDrive, setCurrLinkDrive] = useState<string>('')
  const [currUiType, setCurrUiType] = useState<string>('Label Format')
  const [currLabelFile, setCurrLabelFile] = useState<File | null>(null)
  const [currType, setCurrType] = useState<string>('')
  const router = useRouter()

  const handlePostDataClassify = async (labelUpload: LabelUpload) => {
    const id = toast.loading('Uploading...')

    const label = await postLabelData({
      dataId: currTask.ds_id,
      labelFile: labelUpload.labelFile,
      labelLinkDrive: labelUpload.linkDrive,
      annotateType: labelUpload.type,
    })

    if (label) {
      // console.log(label)
      const intervalId = setInterval(async () => {
        const state = await getTaskState({ task_id: label.task_id })
        if (state == 'SUCCESS') {
          toast.update(id, {
            type: 'success',
            render: 'Upload success',
            isLoading: false,
            autoClose: 1000,
          })
          clearInterval(intervalId)
        } else if (state == 'FAILE') {
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
    <div
      style={{ height: '100%', width: '165vh' }}
      className=" flex flex-col place-items-center "
    >
      <h1 className=" text-4xl text-bold place-self-start p-5">Upload Label</h1>
      <div className=" w-1/3 h-1/2 border border-dashed items-center place-content-center relative flex flex-col">
        {currLabelFile ? (
          <div>
            <h1 className=" text-4xl  place-self-center z-0 text-white">
              {currLabelFile.name}
            </h1>
          </div>
        ) : (
          <input
            type="file"
            className="w-full h-full opacity-0 absolute z-10 hover:cursor-pointer"
            onChange={(e) => {
              if (e.target.files) setCurrLabelFile(e.target.files[0])
            }}
          />
        )}
        <h2 className=" text-xl text-gray-300  absolute top-2 z-0">
          Drag or drop
        </h2>
        {currLabelFile ? (
          <></>
        ) : (
          <h1 className=" text-4xl text-base-300 place-self-center z-0">
            LABEL FILE
          </h1>
        )}
        <h2 className=" text-xl text-gray-300 absolute bottom-2 z-0">
          Click <span className=" text-primary">here</span> to upload dataset
        </h2>
      </div>
      <input
        type="text"
        placeholder="or paste link drive to download here"
        className="input input-bordered w-1/3 mt-2"
        value={currLinkDrive}
        onChange={(e) => setCurrLinkDrive(e.target.value)}
      />

      <select
        className="select select-primary w-full max-w-xs  mt-2"
        value={currUiType}
        onChange={(e) => {
          setCurrType(e.target.value)

          setCurrUiType(e.target.value)
        }}
      >
        <option disabled>Label Format</option>
        <option>Subs-Folder</option>
        <option>Yolo</option>
        {/* <option>JSON</option> */}
      </select>

      {currType.toLowerCase() == 'subs-folder' ? (
        <LabelInfo title={LabelInfoTitle['subs-folder']} />
      ) : currType.toLowerCase() == 'yolo' ? (
        <LabelInfo title={LabelInfoTitle.yolo} />
      ) : null}

      {!currLabelFile && !currLinkDrive && currUiType == 'Label Format' && (
        <p>Skip if you don&quote;t have label yet</p>
      )}

      <div className="place-self-end m-5 w-2/12 flex justify-around">
        <button
          className="btn btn-active btn-primary ml-2 btn-disabled"
          onClick={(e) => setCurrStep(1)}
        >
          Back
        </button>
        <button
          className="btn btn-active btn-primary  "
          onClick={(e) => {
            if ((currLabelFile || currLinkDrive) && !currType) {
              toast.warn('Please select label format')
              return
            }

            if (
              currLabelFile ||
              currLinkDrive ||
              currUiType != 'Label Format'
            ) {
              const labelUpload: LabelUpload = {
                labelFile: currLabelFile,
                linkDrive: currLinkDrive,
                type: currType,
                // type: currType,
              }
              handlePostDataClassify(labelUpload)
              setCurrLabelUpload(labelUpload)
            }

            router.replace('/annotation_assistant')
          }}
        >
          {currLabelFile || currLinkDrive || currUiType != 'Label Format'
            ? 'Finish'
            : 'Skip'}
        </button>
      </div>
    </div>
  )

  function LabelInfo({ title }: { title: string }) {
    return (
      <div className="alert shadow-lg w-fit max-w-3xl bg-black m-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{title}</span>
        </div>
      </div>
    )
  }
}
export default Step2
