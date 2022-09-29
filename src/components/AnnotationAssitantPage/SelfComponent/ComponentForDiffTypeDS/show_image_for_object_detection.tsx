import Link from 'next/link'
import { API_URL } from '@/constants/Api'
import { Labels } from '@/models/annotation_assistant/labels'
import { Image as Img, Layer, Stage } from 'react-konva'
import { useEffect, useRef, useState } from 'react'
import { Rect } from 'react-konva'
import uuid from 'react-uuid'

const ShowImageForObjectDetection = ({
  index,
  labels,
  handleOnContextMenu,
  currDataId,
}: {
  index: number
  labels: Labels
  handleOnContextMenu: (event: React.MouseEvent, imageName: string) => void
  currDataId: string
}) => {
  const parentRef = useRef<HTMLElement>(null)
  const [img, setImg] = useState<HTMLImageElement>()
  const [stageWidth, setStageWidth] = useState<number>(0)
  const [stageHeight, setStageHeight] = useState<number>(0)
  useEffect(() => {
    let image = new Image()
    image.src = `${API_URL}/label_tool/dataset_img?ds_id=${currDataId}&img_id=${labels.images[index]}`
    setImg(image)
  }, [index])

  useEffect(() => {
    if (parentRef.current) {
      setStageWidth(parentRef.current.offsetWidth)
      setStageHeight(parentRef.current.offsetHeight)
    }
  }, [parentRef])
  return (
    <div
      className="card w-5/6 h-5/6  bg-base-300 shadow-xl  relative justify-center  flex flex-col  items-center  text-white"
      key={uuid()}
      onContextMenu={(event) =>
        handleOnContextMenu(event, labels.images[index])
      }
    >
      <Link
        href={`/annotation_assistant/${index}/${currDataId}`}
        shallow={true}
        key={uuid()}
      >
        <figure
          className=" w-full h-full  absolute hover:cursor-pointer"
          ref={parentRef}
          key={uuid()}
        >
          <Stage width={stageWidth} height={stageHeight} key={uuid()}>
            <Layer key={uuid()}>
              <Img
                image={img}
                x={0}
                y={0}
                width={stageWidth}
                height={stageHeight}
                key={uuid()}
              />
            </Layer>
            <Layer key={uuid()}>
              {labels.labels[index].map((item, idx) => {
                const imgW = labels.image_size[index][0]
                const imgH = labels.image_size[index][1]
                let newX1 = (item['x1'] * stageWidth) / imgW
                let newY1 = (item['y1'] * stageHeight) / imgH
                let newX2 = (item['x2'] * stageWidth) / imgW
                let newY2 = (item['y2'] * stageHeight) / imgH
                let newW = newX2 - newX1
                let newH = newY2 - newY1

                return (
                  <Rect
                    x={newX1}
                    y={newY1}
                    width={newW}
                    height={newH}
                    stroke={'red'}
                    strokeWidth={0.5}
                    key={uuid()}
                  ></Rect>
                )
              })}
            </Layer>
          </Stage>
        </figure>
      </Link>
    </div>
  )
}

export default ShowImageForObjectDetection
