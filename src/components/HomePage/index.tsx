import features from '../../constants/Feature'
import Image from 'next/image'
import Link from 'next/link'
import header from '../../../public/static/header.png'
const HomePage = () => {
  return (
    <>
      <div
        className="justify-center flex-col items-center bg-white"
        style={{ height: '30vh' }}
      >
        <div
          style={{
            backgroundImage: `url('${header.src}')`,
            backgroundSize: 'cover',
            backgroundColor: '#29DD9C',
          }}
          className="w-full h-full"
        >
          <div className="w-3/4 h-1/2 text-white font-sans pt-5 lg:ml-14 md:ml-8    ">
            <h1 className=" text-5xl  ">BLACK LABEL</h1>
            <h2 className="text-3xl ">Super Annotation tool</h2>
            <p className=" text-lg pt-3">Having everything you want,</p>
            <p className="text-lg ">Do everything you wish</p>
          </div>
        </div>
      </div>

      <div className="h-screen grid grid-cols-3 grid-flow-row place-items-center grid-rows-2 items-center gap-5">
        {features.map((feature) => (
          <Link href={feature.url} key={feature.url}>
            <div
              className="w-5/6 h-5/6  rounded overflow-hidden m-4 p-1 shadow-lgtransition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer"
              style={{
                background: feature.backgroundLinear,
                boxShadow: `1px 2px 9px ${feature.shadowColor}`,
              }}
            >
              <div className=" w-full h-1/2 flex  justify-center">
                <div className="h-full w-1/3 relative">
                  <Image
                    src={feature.icon}
                    alt={feature.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="px-6 py-4 text-white">
                <div className="font-bold text-xl mb-2">{feature.name}</div>
                <p className=" text-base">{feature.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <h1 className="text-center text-xl relative bottom-2">
        Copyright © 2022 Unstable Team. All rights reserved.
      </h1>
    </>
  )
}

export default HomePage
