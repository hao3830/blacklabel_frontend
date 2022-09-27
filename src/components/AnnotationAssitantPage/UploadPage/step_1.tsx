import { useState } from 'react'
import { toast } from 'react-toastify'
import { postImageData, TaskRespone } from '@/APIS/annotation_assistant/upload'
import { ImageUpload } from '.'
import { getTaskState } from '@/APIS/annotation_assistant/task'

const Step1 = ({
  currImageUpload,
  setCurrStep,
  setCurrImageUpload,
  setCurrTask,
}: {
  currImageUpload: ImageUpload | void
  setCurrStep: (step: number) => void
  setCurrImageUpload: (imageUpload: ImageUpload) => void
  setCurrTask: (key: TaskRespone) => void
}) => {
  const [currLinkDrive, setCurrLinkDrive] = useState<string>(
    currImageUpload ? currImageUpload.linkDrive : ''
  )
  const [currDataName, setCurrDataName] = useState<string>(
    currImageUpload ? currImageUpload.dataName : ''
  )
  const [currUiType, setCurrUiType] = useState<string>('Dataset Type')
  const [currType, setCurrType] = useState<string>('')
  const [currImageZipFile, setCurrImageZipFile] = useState<File | null>(
    currImageUpload ? currImageUpload.imageZipFile : null
  )

  const handlePostDataClassify = async (imageUpload: ImageUpload) => {
    if (!imageUpload) return

    const id = toast.loading('Uploading...')

    const data = await postImageData({
      dataName: imageUpload.dataName,
      imageZipFile: imageUpload.imageZipFile,
      imageLinkDrive: imageUpload.linkDrive,
      dataType: imageUpload.type,
    })

    if (data) {
      setCurrTask(data)
      const intervalId = setInterval(async () => {
        const state = await getTaskState({ task_id: data.task_id })
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
    <div
      style={{ height: '100%', width: '165vh' }}
      className=" flex flex-col place-items-center "
    >
      <h1 className=" text-4xl text-bold place-self-start p-5">Upload Image</h1>
      <div className=" w-1/3 h-1/2 border border-dashed items-center place-content-center relative flex flex-col ">
        {currImageZipFile ? (
          <div>
            <h1 className=" text-4xl  place-self-center z-0 text-white">
              {currImageZipFile.name}
            </h1>
          </div>
        ) : (
          <input
            type="file"
            className="w-full h-full opacity-0 absolute z-10 hover:cursor-pointer"
            onChange={(e) => {
              if (e.target.files) setCurrImageZipFile(e.target.files[0])
            }}
          />
        )}
        <h2 className=" text-xl text-gray-300  absolute top-2 z-0">
          Drag or drop
        </h2>
        {currImageZipFile ? (
          <></>
        ) : (
          <h1 className=" text-4xl text-base-300 place-self-center z-0">
            ZIP FILE
          </h1>
        )}
        <h2 className=" text-xl text-gray-300 absolute bottom-2 z-0">
          Click <span className=" text-primary">here</span> to upload dataset
        </h2>
      </div>
      <input
        type="text"
        placeholder="or paste link drive to download here"
        className="input input-bordered  w-full max-w-xs mt-2"
        value={currLinkDrive}
        onChange={(e) => setCurrLinkDrive(e.target.value)}
      />
      <div className=" w-11/12 flex flex-col">
        <input
          type="text"
          placeholder="Enter your dataset name"
          className="input input-bordered input-primary w-full max-w-6xl mt-2"
          value={currDataName}
          onChange={(e) => setCurrDataName(e.target.value)}
        />

        <select
          className="select select-primary w-full max-w-xs place-self-start mt-2"
          defaultValue={currUiType}
          onChange={(e) => {
            setCurrType(e.target.value.toLowerCase())
            setCurrUiType(e.target.value)
          }}
        >
          <option disabled>Dataset Type</option>
          <option>Classification</option>
          <option>Object Detection</option>
          <option>Text Recognition</option>
        </select>

        <button
          className="btn btn-active btn-primary place-self-end "
          onClick={(e) => {
            if (
              !currDataName ||
              !currType ||
              (!currImageZipFile && !currLinkDrive)
            ) {
              toast.warn('Please fill all fields')
              return
            }

            const imageUpload: ImageUpload = {
              dataName: currDataName,
              type: currType,
              imageZipFile: currImageZipFile,
              linkDrive: currLinkDrive,
            }

            handlePostDataClassify(imageUpload)
            setCurrImageUpload(imageUpload)
            setCurrStep(2)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default Step1
