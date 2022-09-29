import { Item, ItemParams, Menu, useContextMenu } from 'react-contexify'
import { useState } from 'react'
import { Labels } from '@/models/annotation_assistant/labels'
import { updateAnnotate } from '@/APIS/annotation_assistant/annotate'
import { getLabels } from '@/APIS/annotation_assistant/annotate'
import ShowImageForClassification from './ComponentForDiffTypeDS/show_image_for_classification'
import ShowImageForObjectDetection from './ComponentForDiffTypeDS/show_image_for_object_detection'
import uuid from 'react-uuid'

const ContextMenu = ({
  labels,
  currPage,
  currDataId,
  setLabels,
}: {
  labels: Labels
  currPage: number
  currDataId: string
  setLabels: (labels: Labels) => void
}) => {
  const contextMenuId = `contextMenu`
  const { show } = useContextMenu({ id: contextMenuId })
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [currImage, setCurrImage] = useState<string>('')

  const handleClick = (args: ItemParams) => {
    const imageName = args.props.imageName
    setCurrImage(imageName)
    // handleupdateAnnotate
  }

  const handleupdateAnnotate = async ({
    ds_id,
    image_name,
    class_name,
  }: {
    ds_id: string
    image_name: string
    class_name: string
  }) => {
    if (await updateAnnotate({ ds_id, image_name, class_name })) {
      const result = await getLabels({ ds_id })

      result && setLabels(result)
    }
  }

  const handleOnContextMenu = (event: React.MouseEvent, imageName: string) => {
    event.preventDefault()

    show(event, {
      props: {
        imageName,
      },
    })
  }

  return (
    <div className="h-5/6 w-full relative">
      {labels.ds_type != 'object_detection' && (
        <Menu id={contextMenuId} animation="scale">
          <Item onClick={handleClick}>
            <label htmlFor="my-modal-4" className=" modal-button">
              Set Image Class
            </label>
          </Item>
        </Menu>
      )}
      <div className="grid grid-cols-5 grid-rows-2 place-items-center h-full w-full  items-center  ">
        {labels.images.map((image, index) => {
          if (index < (currPage - 1) * 10 || index >= currPage * 10) return

          return labels.ds_type == 'object_detection' ? (
            <ShowImageForObjectDetection
              key={uuid()}
              index={index}
              labels={labels}
              handleOnContextMenu={handleOnContextMenu}
              currDataId={currDataId}
            />
          ) : (
            <ShowImageForClassification
              index={index}
              labels={labels}
              handleOnContextMenu={handleOnContextMenu}
              currDataId={currDataId}
              image={image}
            />
          )
        })}
      </div>

      <input
        type="checkbox"
        id="my-modal-4"
        className="modal-toggle"
        onChange={(e) => setIsChecked(e.target.checked)}
        checked={isChecked}
      />

      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label
          className="modal-box relative flex items-center flex-col max-h-1/2 overflow-auto  bg-scroll"
          htmlFor=""
        >
          <h1 className=" text-white text-2xl">List Class Name</h1>
          {labels &&
            labels.list_labels &&
            labels.list_labels.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="btn w-1/2 m-2"
                  onClick={() => {
                    handleupdateAnnotate({
                      ds_id: currDataId,
                      image_name: currImage,
                      class_name: item,
                    })
                    if (isChecked) {
                      setIsChecked(false)
                    }
                  }}
                >
                  {item}
                </div>
              )
            })}
        </label>
      </label>
    </div>
  )
}

export default ContextMenu
