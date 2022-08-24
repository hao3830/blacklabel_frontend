import { TaskRespone } from '../../../APIS/annotation_assistant/upload'
import { API_URL } from '../../../constants/Api'

const Step3 = ({
  currTask,
  currType,
  dataName,
}: {
  currTask: TaskRespone
  currType: string
  dataName: string
}) => {
  return (
    <div
      style={{ height: '100%', width: '165vh' }}
      className=" flex flex-col place-items-center  relative "
    >
      <h1 className=" p-5 text-4xl text-primary">Data Preview</h1>
    </div>
  )
}

export default Step3
