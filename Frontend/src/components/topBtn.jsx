import React from 'react'
import './topBtn.scss'

const TopBtn = ({isSorted, onClick }) => {
  return (
    <div className={`topBtn ${isSorted ? 'sorted-up' : 'sorted-down'}`} onClick={onClick} ></div>
  )
}

export default TopBtn