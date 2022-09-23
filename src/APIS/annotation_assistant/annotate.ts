import IResponse from '../respone'
import axios from '../axios_instance'
import { toast } from 'react-toastify'
import type { Bboxes, Labels } from '../../models/annotation_assistant/labels'

interface ILabelResponse extends IResponse {
    results: Labels
}

const getLabels = async ({ ds_id }: { ds_id: string }): Promise<Labels | void> => {

    try {
        const response = await axios.get<ILabelResponse>('/label_tool/annotate', {
            params: {
                ds_id,
            }
        })

        if (response.status != 200) {
            toast.error("Have error when get labels, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return data.results

    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data, please try again")
    }

}

type UpdateAnnotate = {
    ds_id: string, image_name: string, class_name?: string, bbox_list?: Bboxes[]
}

const updateAnnotate = async ({ ds_id, image_name, class_name, bbox }: { ds_id: string, image_name: string, class_name?: string, bbox?: Bboxes[] }): Promise<boolean | void> => {

    try {

        const formData: UpdateAnnotate = {
            ds_id: ds_id,
            image_name: image_name,
            class_name: class_name,
            bbox_list: bbox
        }

        const respone = await axios.put<IResponse>('/label_tool/annotate', JSON.stringify(formData))

        if (respone.status != 200) {
            toast.error("Have error when update image class, please try again")
            return
        }

        const data = respone.data

        if (data.code == 609) {
            console.log(data)
            toast.error("Wrong input")
            return
        }

        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return true
    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data, please try again")
    }
}

export { getLabels, updateAnnotate } 