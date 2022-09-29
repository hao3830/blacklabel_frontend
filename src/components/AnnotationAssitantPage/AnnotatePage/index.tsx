import { Loading } from '../SelfComponent/Loading'
import NextPageButton from '../SelfComponent/next_page_button'
import type { Labels } from '@/models/annotation_assistant/labels'
import { useState, useEffect } from 'react'
import { getData } from '@/APIS/annotation_assistant/data'
import { DataSelecter } from '../SelfComponent/data_selecter'
import { getLabels } from '@/APIS/annotation_assistant/annotate'
import ContextMenu from '../SelfComponent/context_menu'
import { Data } from '@/models/annotation_assistant/data_detail'
import { listColor } from '@/models/annotation_assistant/list_color'
import Konva from 'konva'

const AnnotatePage = () => {
  const [data, setData] = useState<Data[] | void>()
  const [currDataName, setCurrDataName] = useState<string | void>()
  const [currDataId, setCurrDataaId] = useState<string | void>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [labels, setLabels] = useState<Labels | void>()
  const [listColor, setListColor] = useState<listColor>([])
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false)
  const getDataHandler = async () => {
    const results = await getData()
    setData(results)
  }

  const getDataDetailHandler = async (ds_id: string) => {
    const results = await getLabels({ ds_id: ds_id })
    setLabels(results)
    setIsFetchingData(false)
  }

  useEffect(() => {
    if (!labels || listColor.length) return
    let currListColor = []
    for (let i of labels.list_labels) {
      const className = i.toString()
      const color = Konva.Util.getRandomColor()
      const currColor = {
        className,
        color,
      }
      currListColor.push(currColor)
    }

    setListColor(currListColor)
  }, [labels, listColor])
  useEffect(() => {
    getDataHandler()
  }, [])

  useEffect(() => {
    if (!currDataId) return

    getDataDetailHandler(currDataId)
    setIsFetchingData(true)
  }, [currDataId])

  return (
    <div
      style={{ height: '100%', width: '165vh' }}
      className=" flex flex-col place-items-center overflow-hidden"
    >
      <div className="w-full flex flex-col h-1/6">
        <h1 className=" text-4xl ml-5 place-self-start">Dataset Overview</h1>
        <div className=" place-self-start ml-3">
          <DataSelecter
            currDataName={currDataName}
            data={data}
            setCurrDataName={setCurrDataName}
            setCurrDataId={setCurrDataaId}
          />
        </div>
      </div>
      {isFetchingData ? (
        <Loading />
      ) : labels ? (
        <div className=" w-full h-3/4 flex flex-col items-center ">
          <h3 className=" text-2xl mt-3 ml-5 place-self-start">
            {labels.images.length} images
          </h3>

          <ContextMenu
            labels={labels}
            currPage={currPage}
            currDataId={currDataId ? currDataId : ''}
            setLabels={setLabels}
          />

          {labels.images.length > 10 && (
            <NextPageButton
              length={labels.images.length}
              setCurrPage={setCurrPage}
              currPage={currPage}
              itemPerPage={10}
            />
          )}
        </div>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <h1 className=" text-4xl">No Data Avalible</h1>
        </div>
      )}
    </div>
  )
}

export default AnnotatePage
