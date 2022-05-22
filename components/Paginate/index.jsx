import ReactPaginate from 'react-paginate'
import React, { useEffect, useState } from 'react'
import css from './index.module.css'
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import json from 'mocks/trendings.json'
import { GamesGrid } from 'components'

const items = json.results

export function PaginatedItems({ itemsPerPage, initial }) {
  const [data, setData] = useState(null || initial)
  const { count, results, next } = data

  // We start with an empty list of items.
  const [pageCount, setPageCount] = useState(0)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)

  const fetchPage = async () => {
    const res = await fetch(next)
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    fetchPage()
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    setPageCount(Math.ceil(count / itemsPerPage))
  }, [itemOffset, itemsPerPage, count])

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`,
    )
    setItemOffset(newOffset)
  }

  return (
    <>
      <div className={css.items}>
        <GamesGrid games={results} />
      </div>
      <ReactPaginate
        nextLabel={<MdOutlineNavigateNext />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={<MdOutlineNavigateBefore />}
        pageClassName={css.pageItem}
        pageLinkClassName={css.pageLink}
        previousLinkClassName={css.icon}
        nextLinkClassName={css.icon}
        breakLabel="..."
        breakClassName={css.break}
        breakLinkClassName={css.pageLink}
        containerClassName={css.pagination}
        activeClassName={css.active}
        renderOnZeroPageCount={null}
      />
    </>
  )
}
