import Link from 'next/link'
import { API_URL } from '../../../../constants/Api'
import { Labels } from '../../../../models/annotation_assistant/labels'

const showImageForObjectDetection = (
  index: number,
  labels: Labels,
  handleOnContextMenu: (event: React.MouseEvent, imageName: string) => void,
  currDataId: string,
  image: string
) => {
  return (
    <div
      className="card w-5/6 h-5/6  bg-base-300 shadow-xl  relative justify-center  flex flex-col  items-center  text-white"
      key={index}
      onContextMenu={(event) =>
        handleOnContextMenu(event, labels.images[index])
      }
    >
      <Link
        href={`/annotation_assistant/${index}/${currDataId}`}
        shallow={true}
      >
        <figure className=" w-full h-full  absolute hover:cursor-pointer">
          <img
            src={`${API_URL}/label_tool/dataset_img?ds_id=${currDataId}&img_id=${image}`}
            alt={image}
          />
        </figure>
      </Link>
    </div>
  )
}

export default showImageForObjectDetection
