import { ClassName } from './SelfComponent/class_name'
import { TabData } from './SelfComponent/tab_data'
import { DataStatus } from './SelfComponent/data_status'
import { DataSelecter } from './SelfComponent/data_selecter'
import { useState, useEffect } from 'react'
import {
  getData,
  getDataDetail,
  postNewClassName,
} from '../../APIS/annotation_assistant/data'
import { DataDetail, Data } from '../../models/annotation_assistant/data_detail'
import { toast } from 'react-toastify'
import { API_URL } from '../../constants/Api'

const AnnotationAssitantHomePage = () => {
  const [data, setData] = useState<Data[] | void>()
  const [currDataName, setCurrDataName] = useState<string | void>()
  const [currDataId, setCurrDataId] = useState<string | void>()
  const [dataDetail, setDataDetail] = useState<DataDetail | void>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [currClassName, setCurrClassName] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [tabIdx, setTabIdx] = useState<number>(0)
  const getDataHandler = async () => {
    const results = await getData()
    setData(results)
  }

  const getDataDetailHandler = async (ds_id: string) => {
    const results = await getDataDetail({ ds_id: ds_id })
    setDataDetail(results)
  }

  const postNewClassHandler = async (dsId: string, className: string) => {
    const result = await postNewClassName({ className, dsId })
    if (result) {
      let data = await getDataDetail({ ds_id: dsId })
      setDataDetail(data)
    } else {
      toast.error('Create new class fail')
    }
  }

  useEffect(() => {
    getDataHandler()
  }, [])

  useEffect(() => {
    if (!currDataId) return

    getDataDetailHandler(currDataId)
  }, [currDataId])

  return (
    <div
      style={{ height: '100%', width: '165vh' }}
      className=" flex flex-col place-items-center "
    >
      <DataSelecter
        currDataName={currDataName}
        data={data}
        setCurrDataName={setCurrDataName}
        setCurrDataId={setCurrDataId}
      />

      {dataDetail ? (
        <>
          <DataStatus dataDetail={dataDetail} />

          <div className="w-full flex flex-col items-center">
            <TabData tabIdx={tabIdx} setTabIdx={setTabIdx} />

            {tabIdx == 0 && (
              <ClassName
                getDataDetailHandler={getDataDetailHandler}
                currDataId={currDataId!}
                dataDetail={dataDetail}
                currPage={currPage}
                setCurrPage={setCurrPage}
              />
            )}
            {tabIdx == 2 && (
              <a
                className="btn mt-5"
                href={`${API_URL}/label_tool/annotation/download?ds_id=${currDataId}&annotation_type=${dataDetail.dataset_type}`}
              >
                Dowload Labels
              </a>
            )}
          </div>
        </>
      ) : (
        <div className=" w-full h-full flex justify-center items-center text-4xl">
          No Data Available
        </div>
      )}

      <input
        type="checkbox"
        id="add-class-modal"
        className="modal-toggle"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />

      <label htmlFor="add-class-modal" className="modal cursor-pointer">
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

              <button
                className="btn btn-square bg-primary "
                onClick={() => {
                  if (!currClassName) return
                  currDataId && postNewClassHandler(currDataId, currClassName)
                  setCurrClassName('')
                  setIsChecked(false)
                }}
              >
                Save
              </button>
            </div>
          </div>
        </label>
      </label>
    </div>
  )
}

export default AnnotationAssitantHomePage
