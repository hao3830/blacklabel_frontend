type Bboxes = {
    class_name: string
    x1: number
    y1: number
    x2: number
    y2: number
}

type Labels = {
    labels: Bboxes[][] & string[]
    images: string[]
    list_labels: string[]
    ds_type: string
    image_size: number[][]
}

export type { Labels, Bboxes }