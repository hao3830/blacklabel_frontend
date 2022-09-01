import { useState, useEffect } from 'react'
import {
  postImageData,
  postLabelData,
} from '../../../APIS/annotation_assistant/upload'
import { TaskRespone } from '../../../APIS/annotation_assistant/upload'
import Step1 from './step_1'
import Step2 from './step_2'
import { toast } from 'react-toastify'
import {
  ImageUpload,
  LabelUpload,
} from '../../../models/annotation_assistant/upload'

const UploadPage = () => {
  const [currStep, setCurrStep] = useState<number>(1)
  const [currImageUpload, setCurrImageUpload] = useState<ImageUpload | void>()
  const [currLabelUpload, setCurrLabelUpload] = useState<LabelUpload | void>()
  const [currTask, setCurrTask] = useState<TaskRespone | void>()

  return currStep == 1 ? (
    <Step1
      setCurrStep={setCurrStep}
      setCurrImageUpload={setCurrImageUpload}
      currImageUpload={currImageUpload}
      setCurrTask={setCurrTask}
    />
  ) : (
    currStep == 2 && currTask ? (
      <Step2
        setCurrStep={setCurrStep}
        currTask={currTask}
        setCurrLabelUpload={setCurrLabelUpload}
      />
    ): <></>
  )
}
export default UploadPage

export type { ImageUpload, LabelUpload }
