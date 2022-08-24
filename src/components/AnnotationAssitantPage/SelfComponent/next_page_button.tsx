const NextPageButton = ({
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
  let results = []
  for (let i = 1; i <= Math.ceil(length / itemPerPage); i++) {
    results.push(
      <input
        type="radio"
        name="options"
        data-title={i}
        key={i}
        className="btn"
        onChange={() => setCurrPage(i)}
        checked={currPage === i}
      />
    )
  }
  return <div className="btn-group ">{results.map((item, index) => item)}</div>
}

export default NextPageButton
