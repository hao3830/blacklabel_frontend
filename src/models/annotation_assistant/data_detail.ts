interface DataDetail {
  list_labels: string[]
  list_images: string[]
  type_annotate: string
}

interface Data {
  ds_id: string
  ds_name: string,
  ds_type: string,
  ds_path: string,
  class_list: string[],
  create_time: number,
}

export type { DataDetail, Data }
