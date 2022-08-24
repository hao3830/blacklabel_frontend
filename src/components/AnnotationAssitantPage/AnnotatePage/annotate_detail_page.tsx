import { Labels } from '../../../models/annotation_assistant/labels'
import { useState, useEffect } from 'react'
import {
  getLabels,
  updateImageClass,
} from '../../../APIS/annotation_assistant/annotate'
import { API_URL } from '../../../constants/Api'
const AnnotateDetailPage = ({
  index,
  ds_id,
}: {
  index: string
  ds_id: string
}) => {
  const [labels, setLabels] = useState<Labels | void>()
  const [currIdx, setCurrIdx] = useState<number>(parseInt(index))
  const [currClassName, setCurrClassName] = useState<string>('')

  const getDataDetailHandler = async (ds_id: string) => {
    const results = await getLabels({ ds_id })
    setLabels(results)
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' && currIdx > 0) {
      setCurrIdx(currIdx - 1)
    } else if (
      event.key === 'ArrowRight' &&
      labels &&
      currIdx < labels.images.length - 1
    ) {
      setCurrIdx(currIdx + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  })

  useEffect(() => {
    getDataDetailHandler(ds_id)
  }, [])

  const handleUpdateImageClass = async ({
    ds_id,
    image_name,
    class_name,
  }: {
    ds_id: string
    image_name: string
    class_name: string
  }) => {
    if (await updateImageClass({ ds_id, image_name, class_name })) {
      const result = await getLabels({ ds_id })

      result && setLabels(result)
    }
  }

  return (
    <div style={{ height: '100%', width: '165vh' }} className=" flex relative">
      <div className=" w-5/6 h-full flex flex-col justify-center items-center relative">
        <div className=" w-full flex justify-between absolute top-2 p-2">
          <>
            {labels && currIdx > 0 ? (
              <div
                className="btn bg-primary"
                onClick={() => setCurrIdx(currIdx - 1)}
              >
                Previous
              </div>
            ) : (
              <div className=" btn-disabled btn ">Previous</div>
            )}
          </>
          <>
            {labels && (
              <h1 className=" text-2xl text-white">{labels.images[currIdx]}</h1>
            )}
          </>
          <>
            {labels && labels.images.length > currIdx + 1 ? (
              <div
                className="btn bg-primary"
                onClick={() => setCurrIdx(currIdx + 1)}
              >
                Next
              </div>
            ) : (
              <div className=" btn-disabled btn ">Next</div>
            )}
          </>
        </div>
        <>
          {labels && labels.images.length > currIdx && (
            <figure className=" w-10/12 h-5/6 absolute bottom-5">
              <img
                src={`${API_URL}/label_tool/dataset_img?ds_id=${ds_id}&img_id=${
                  labels.images[currIdx]
                }&img_size=${500}`}
                alt={labels.images[currIdx]}
                className="w-full h-full"
              />
            </figure>
          )}
        </>
      </div>
      <div className=" absolute right-0 border-base-300 border-l w-1/6 h-full flex flex-col items-center">
        <div className=" w-full h-1/2 flex flex-col items-center overflow-y-scroll justify-around mt-5">
          {labels && labels.list_labels ? (
            labels.list_labels.map((item, index) => {
              let isChecked = item == labels?.labels[currIdx]

              return (
                <div
                  className={`btn w-3/4 m-2 ${isChecked && 'btn-primary'}`}
                  key={index}
                  onClick={() => {
                    if (isChecked) return

                    handleUpdateImageClass({
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
        </div>
      </div>

      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative flex justify-center" htmlFor="">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Type Image Class Name"
                className="input input-bordered"
                value={currClassName}
                onChange={(e) => setCurrClassName(e.target.value)}
              />

              <button className="btn btn-square bg-primary " onClick={() => {}}>
                Save
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  )
}

export default AnnotateDetailPage
