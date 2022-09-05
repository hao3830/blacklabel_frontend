import React from 'react'
import { Item, ItemParams, Menu, useContextMenu } from 'react-contexify'
import { DataDetail } from '../../../models/annotation_assistant/data_detail'
import NextPageButton from './next_page_button'
import { deleteClassName } from '../../../APIS/annotation_assistant/data'
export function ClassName({
  currDataId,
  dataDetail,
  currPage,
  setCurrPage,
  getDataDetailHandler,
}: {
  currDataId: string
  dataDetail: DataDetail
  currPage: number
  setCurrPage: (key: number) => void
  getDataDetailHandler: (key: string) => void
}) {
  const contextMenuId = `contextMenuForClassName`
  const { show } = useContextMenu({ id: contextMenuId })

  const handleOnContextMenu = (
    event: React.MouseEvent,
    oldClassName: string
  ) => {
    event.preventDefault()

    show(event, {
      props: {
        oldClassName,
      },
    })
  }

  const handleClickDelete = async (args: ItemParams) => {
    const results = await deleteClassName({
      dsId: currDataId,
      className: args.props.oldClassName,
    })
    if (results) {
      getDataDetailHandler(currDataId)
    }
  }

  return (
    <>
      <Menu id={contextMenuId} animation="scale">
        <Item onClick={handleClickDelete}>
          <p className=" text-red-500">Delete</p>
        </Item>
      </Menu>
      <div className=" w-full grid grid-rows-3 grid-cols-5 place-items-center mt-5 ">
        {dataDetail.list_labels.map((labels, index) => {
          if (index < (currPage - 1) * 15 || index >= currPage * 15) return
          return (
            <div
              key={index}
              className=" w-2/3 h-16 bg-primary rounded flex justify-center items-center text-white mt-3 overflow-hidden"
              onContextMenu={(event) => handleOnContextMenu(event, labels)}
            >
              {labels}
            </div>
          )
        })}
        <label
          className="w-2/3 btn h-16 bg-primary rounded flex justify-center items-center modal-button text-white mt-3"
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
          itemPerPage={15}
        />
      )}
    </>
  )
}
