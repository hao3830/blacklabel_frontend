import header from '@/public/static/header_s.png'

const AnnotationAssitantPageHeader = () => {
  return (
    <div
      style={{
        height: '16%',
        backgroundImage: `url('${header.src}')`,
        backgroundSize: 'cover',
        backgroundColor: '#29DD9C',
      }}
      className="w-full flex items-center pl-10 overflow-hidden"
    >
      <div className="w-1/3 text-white font-sans text-start  ">
        <h1 className=" text-5xl">Black Label</h1>
        <h2 className=" text-2xl">Super Annotation tool</h2>
      </div>
    </div>
  )
}

export default AnnotationAssitantPageHeader
