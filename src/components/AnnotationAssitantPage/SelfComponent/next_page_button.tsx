import { useState } from 'react'

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
  const [minPage, setMinPage] = useState(1)
  const [maxPage, setMaxPage] = useState(Math.ceil(length / itemPerPage))

  if (length / itemPerPage < 10) {
    let results = []
    for (let i = 1; i <= Math.ceil(length / itemPerPage); i++) {
      results.push(
        <button
          className={`btn ${i == currPage && 'btn-active'}`}
          onClick={() => setCurrPage(i)}
        >
          {i}
        </button>
      )
    }
    return (
      <div className="btn-group absolute bottom-5">
        {results.map((item) => item)}
      </div>
    )
  } else {
    return (
      <div className="btn-group absolute bottom-5">
        <button
          className={`btn ${minPage == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(minPage)
            if (minPage > 1) setMinPage(minPage - 1)
          }}
        >
          {minPage}
        </button>
        <button
          className={`btn ${minPage + 1 == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(minPage + 1)
          }}
        >
          {minPage + 1}
        </button>
        <button
          className={`btn ${minPage + 2 == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(minPage + 2)
            if (maxPage - minPage >= 6) setMinPage(minPage + 1)
          }}
        >
          {minPage + 2}
        </button>
        {maxPage - minPage >= 6 && (
          <button className="btn btn-disabled">...</button>
        )}
        <button
          className={`btn ${maxPage - 2 == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(maxPage - 2)
            if (maxPage - minPage >= 6) setMaxPage(maxPage - 1)
          }}
        >
          {maxPage - 2}
        </button>
        <button
          className={`btn ${maxPage - 1 == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(maxPage - 1)
          }}
        >
          {maxPage - 1}
        </button>
        <button
          className={`btn ${maxPage == currPage && 'btn-active'}`}
          onClick={() => {
            setCurrPage(maxPage)
            if (maxPage < Math.ceil(length / itemPerPage))
              setMaxPage(maxPage + 1)
          }}
        >
          {maxPage}
        </button>
      </div>
    )
  }
}

export default NextPageButton
