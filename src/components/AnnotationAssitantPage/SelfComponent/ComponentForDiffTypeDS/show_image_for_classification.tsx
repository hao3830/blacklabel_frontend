import Link from 'next/link'
import { API_URL } from '@/constants/Api'
import { Labels } from '@/models/annotation_assistant/labels'

const ShowImageForClassification = ({
  index,
  labels,
  handleOnContextMenu,
  currDataId,
  image,
}: {
  index: number
  labels: Labels
  handleOnContextMenu: (event: React.MouseEvent, imageName: string) => void
  currDataId: string
  image: string
}) => {
  let label = ''
  if (index < labels.labels.length) label = labels.labels[index]

  return (
    <Link href={`/annotation_assistant/${index}/${currDataId}`}>
      <div
        className="card w-5/6 h-5/6 bg-base-300 shadow-xl  relative flex flex-col items-center justify-center text-white"
        key={index}
        onContextMenu={(event) =>
          handleOnContextMenu(event, labels.images[index])
        }
      >
        <figure className=" w-20 h-16 place-self-center mt-10 relative hover:cursor-pointer">
          <img
            src={`${API_URL}/label_tool/dataset_img?ds_id=${currDataId}&img_id=${image}`}
            alt={image}
          />
        </figure>
        <div className="card-body items-center text-center ">
          <h2 className="card-title absolute">{label ? label : 'None'}</h2>
        </div>
      </div>
    </Link>
  )
}

export default ShowImageForClassification
