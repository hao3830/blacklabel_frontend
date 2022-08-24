import IResponse from '../respone'
import axios from '../axios_instance'
import { toast } from 'react-toastify'

interface ITaskStateRespone extends IResponse {
    state: string

}

const getTaskState = async ({ task_id }: { task_id: string }): Promise<string | void> => {
    try {

        const response = await axios.get<ITaskStateRespone>('/label_tool/get_task', { params: { task_id } })
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

        return data.state

    }
    catch (error) {
        console.log(error)
        toast.error("Have error when get data, please try again")
    }
}

export { getTaskState }