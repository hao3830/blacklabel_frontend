import { Item, ItemParams, Menu, useContextMenu } from 'react-contexify'
import { useState } from 'react'
import { API_URL } from '../../../constants/Api'
import { Labels } from '../../../models/annotation_assistant/labels'
import { updateImageClass } from '../../../APIS/annotation_assistant/annotate'
import { getLabels } from '../../../APIS/annotation_assistant/annotate'
import Link from 'next/link'

const ClassificationContextMenu = ({
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
    // handleUpdateImageClass
  }

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
      <Menu id={contextMenuId} animation="scale">
        <Item onClick={handleClick}>
          <label htmlFor="my-modal-4" className=" modal-button">
            Set Image Class
          </label>
        </Item>
      </Menu>
      <div className="grid grid-cols-5 grid-rows-2 place-items-center h-full w-full  items-center  ">
        {labels.images.map((image, index) => {
          if (index < (currPage - 1) * 10 || index >= currPage * 10) return

          let label = ''
          if (index < labels.labels.length) label = labels.labels[index]

          return (
            <div
              className="card w-5/6 h-5/6 bg-base-300 shadow-xl  relative flex flex-col text-white"
              key={index}
              onContextMenu={(event) =>
                handleOnContextMenu(event, labels.images[index])
              }
            >
              <Link
                href={`/annotation_assistant/${index}/${currDataId}`}
                shallow={true}
              >
                <figure className=" w-20 h-16 place-self-center mt-10 relative hover:cursor-pointer">
                  <img
                    src={`${API_URL}/label_tool/dataset_img?ds_id=${currDataId}&img_id=${image}`}
                    alt={image}
                  />
                </figure>
              </Link>
              <div className="card-body items-center text-center ">
                <h2 className="card-title">{label ? label : 'None'}</h2>
              </div>
            </div>
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
            labels.list_labels.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="btn w-1/2 m-2"
                  onClick={() => {
                    handleUpdateImageClass({
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

export default ClassificationContextMenu
