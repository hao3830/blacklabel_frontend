import { Labels } from '@/models/annotation_assistant/labels'

const ShowImageForTextRecgonition = ({
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
  return <div></div>
}

export default ShowImageForTextRecgonition
