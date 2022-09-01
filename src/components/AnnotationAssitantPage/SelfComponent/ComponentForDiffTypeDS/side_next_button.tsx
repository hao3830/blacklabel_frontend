const SideNextButton = ({
  length,
  setCurrPage,
  currPage,
  itemPerPage = 20,
}: {
  length: number
  setCurrPage: (page: number) => void
  currPage: number
  itemPerPage?: number
}) => {
  return (
    <div className="btn-group mt-5 absolute bottom-5">
      <button
        className={`btn ${currPage > 1 ? '' : 'btn-disabled'}`}
        onClick={() => setCurrPage(currPage - 1)}
      >
        «
      </button>
      <button className="btn">Page {currPage}</button>
      <button
        className={`btn ${
          currPage < length / itemPerPage ? '' : 'btn-disabled'
        }`}
        onClick={() => setCurrPage(currPage + 1)}
      >
        »
      </button>
    </div>
  )
}

export default SideNextButton
