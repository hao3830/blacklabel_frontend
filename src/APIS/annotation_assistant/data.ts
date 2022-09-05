import IResponse from '../respone'
import axios from '../axios_instance'
import { toast } from 'react-toastify'
import { DataDetail, Data } from '../../models/annotation_assistant/data_detail'

interface IDataResponse extends IResponse {
    ds_list: Data[]
}

const getData = async (): Promise<Data[] | void> => {

    try {
        const response = await axios.get<IDataResponse>('/label_tool/list_dataset')
        if (response.status != 200) {
            toast.error("Have error when get data, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return data.ds_list
    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data, please try again")
    }
}

interface IDataDetailResponse extends IResponse, DataDetail {
    data_detail: DataDetail
}

const getDataDetail = async ({ ds_id }: { ds_id: string }): Promise<DataDetail | void> => {
    try {

        const response = await axios.get<IDataDetailResponse>('/label_tool/dataset_detail', {
            params: {
                ds_id,
            }
        })


        if (response.status != 200) {
            toast.error("Have error when get data detail, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }
        return data.data_detail
    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data info, please try again")
    }
}

const postNewClassName = async ({ className, dsId }: {
    className: string
    dsId: string
}): Promise<boolean | void> => {

    const formData = new FormData()
    formData.append("class_name", className)
    formData.append("ds_id", dsId)

    try {

        const response = await axios.post<IResponse>('/label_tool/add_class_dataset', formData)


        if (response.status != 200) {
            toast.error("Have error when get data detail, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return true

    } catch (error) {
        console.log(error)
        toast.error("Have error when get data info, please try again")
    }
}

const deleteClassName = async ({ dsId, className }: { dsId: string, className: string }) => {
    try {
        const formData = new FormData()
        formData.append("ds_id", dsId)
        formData.append("class_name", className)

        const response = await axios.delete<IResponse>("/label_tool/dataset/remove_class", {
            data: formData
        })

        if (response.status != 200) {
            toast.error("Have error when get data detail, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return true

    } catch (error) {
        console.log(error)
        toast.error("Have error when get data info, please try again")
    }
}

const updateClassName = async (
    {
        dsId,
        oldClassName,
        newClassName,
    }: {
        dsId: string
        oldClassName: string
        newClassName: string
    }) => {

    try {

        const formData = new FormData()
        formData.append("ds_id", dsId)
        formData.append("old_class_name", oldClassName)
        formData.append("new_class_name", newClassName)

        const response = await axios.post<IResponse>("/label_tool/replace_class_dataset", formData)

        if (response.status != 200) {
            toast.error("Have error when get data detail, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return true

    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data info, please try again")
    }

}

const getLabelFile = async ({ ds_id, annotation_type }: { ds_id: string, annotation_type: string }) => {
    try {

        const response = await axios.get('/label_tool/annotation/download', {
            params: {
                ds_id,
                annotation_type
            }
        })


        if (response.status != 200) {
            toast.error("Have error when get data detail, please try again")
            return
        }

        const data = response.data
        if (data.code != 1000) {
            console.log(data)
            toast.error("Can not process data return")
            return
        }

        return true

    } catch (error) {
        console.log(error)
        toast.error("Have error when get data info, please try again")
    }

}

export { getData, getDataDetail, postNewClassName, getLabelFile, updateClassName, deleteClassName }
