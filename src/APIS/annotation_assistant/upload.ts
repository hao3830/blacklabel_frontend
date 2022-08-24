import IResponse from '../respone'
import axios from '../axios_instance'
import { toast } from 'react-toastify'

type TaskRespone = {
    task_id: string
    ds_id: string
}

interface ITaskResponeResponse extends IResponse, TaskRespone { }

const postImageData = async (
    { dataName, imageZipFile, imageLinkDrive, dataType }: {
        dataName: string, imageZipFile: File | null,
        imageLinkDrive: string,
        dataType: string
    }
): Promise<TaskRespone | void> => {

    const formData = new FormData()
    formData.append('ds_name', dataName)
    if (imageZipFile) {
        formData.append('dataset_zip_file', imageZipFile)
        if (dataType.toLocaleLowerCase() == "Classification (Zip file olny images)".toLocaleLowerCase())
            formData.append("ds_type", "classification_type2")
        else if (dataType.toLocaleLowerCase() == "Classification (Zip file are subs-folder of difference class)".toLocaleLowerCase())
            formData.append("ds_type", "classification_type1")
    }
    if (imageLinkDrive) {
        formData.append('gdrive_link', imageLinkDrive)
        if (dataType.toLocaleLowerCase() == "Classification (Zip file olny images)".toLocaleLowerCase())
            formData.append("ds_type", "classification_type4")
        else if (dataType.toLocaleLowerCase() == "Classification (Zip file are subs-folder of difference class)".toLocaleLowerCase())
            formData.append("ds_type", "classification_type3")
    }

    try {
        const response = await axios.post<ITaskResponeResponse>('/label_tool/upload_dataset', formData)
        if (response.status != 200) {
            toast.error("Have error when upload data, please try again")
            return
        }

        const data = response.data

        if (data.code == 908) {
            console.log(data)
            toast.error("Name of data is already existed")
        }

        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        const taskRespone = {
            task_id: data.task_id,
            ds_id: data.ds_id,
        }

        return taskRespone

    } catch (error) {
        console.log(error)
        toast.error("Có lỗi xảy ra, vui lòng thử lại")
    }
}

const postLabelData = async (
    { labelFile, labelLinkDrive, dataType, dataId }:
        { labelFile: File | null, labelLinkDrive: string, dataType: string, dataId: string }
): Promise<TaskRespone | void> => {

    const formData = new FormData()
    formData.append('ds_id', dataId)
    if (labelFile) {
        formData.append('label_file', labelFile)
    }
    if (labelLinkDrive) {
        formData.append('gdrive_link', labelLinkDrive)
    }
    if (dataType.toLowerCase() == "subs-folder") {
        formData.append('ds_type', 'classification')
    }

    try {
        const response = await axios.post<ITaskResponeResponse>('/label_tool/upload_label', formData)
        if (response.status != 200) {
            toast.error("Have error when upload data, please try again")
            return
        }
        console.log(response)
        const data = response.data

        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        const taskRespone = {
            task_id: data.task_id,
            ds_id: data.ds_id,
        }

        return taskRespone

    } catch (error) {
        console.log(error)
        toast.error("Have error when upload data, please try again")
    }

}

export { postImageData, postLabelData }

export type { TaskRespone }