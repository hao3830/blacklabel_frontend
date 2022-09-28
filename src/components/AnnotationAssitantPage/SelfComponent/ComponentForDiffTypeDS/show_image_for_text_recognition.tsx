import { API_URL } from '@/constants/Api'
import { Labels } from '@/models/annotation_assistant/labels'
import Link from 'next/link'

const ShowImageForTextRecgonition = ({
  index,
  labels,
  currDataId,
  image,
}: {
  index: number
  labels: Labels
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
      >
        <figure className=" w-full h-full place-self-center mt-10 relative hover:cursor-pointer">
          <img
            src={`${API_URL}/label_tool/dataset_img?ds_id=${currDataId}&img_id=${image}`}
            alt={image}
          />
        </figure>
      </div>
    </Link>
  )
}

export default ShowImageForTextRecgonition
