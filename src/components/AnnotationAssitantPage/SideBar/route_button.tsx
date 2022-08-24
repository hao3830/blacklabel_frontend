import { ReactElement } from 'react'
import Router from 'next/router'
const RouteButton = ({
  routeName,
  selectedPage,
  setSelectedPage,
  id,
  icon,
  text,
}: {
  routeName: string
  icon: ReactElement
  text: string
  id: number
  setSelectedPage: (id: number) => void
  selectedPage: number
}) => {
  const handleClick = () => {
    setSelectedPage(id)
    Router.replace(routeName)
  }

  return (
    <>
      <div
        className={` overflow-hidden btn duration-300 p-3 border border-base-300  bg-base-100 rounded-box h-1/2 w-11/12 items-center flex ${
          selectedPage != id ? 'text-white' : 'text-primary'
        } hover:cursor-pointer`}
        onClick={handleClick}
      >
        {icon}
        <p className="pl-3 text-xl">{text}</p>
      </div>
    </>
  )
}
export default RouteButton
