import React from 'react'
export function TabData({
  tabIdx,
  setTabIdx,
}: {
  tabIdx: number
  setTabIdx: (key: number) => void
}) {
  return (
    <div className="tabs p-1">
      <div
        className={`tab tab-bordered ${tabIdx == 0 ? ' tab-active' : ''} `}
        onClick={() => {
          setTabIdx(0)
        }}
      >
        Class Names
      </div>
      <div
        className={`tab tab-bordered ${tabIdx == 1 ? ' tab-active' : ''}`}
        onClick={() => {
          setTabIdx(1)
        }}
      >
        Edit Data
      </div>
      <div
        className={`tab tab-bordered ${tabIdx == 2 ? ' tab-active' : ''}`}
        onClick={() => {
          setTabIdx(2)
        }}
      >
        Export Data
      </div>
      <div
        className={`tab tab-bordered ${tabIdx == 3 ? ' tab-active' : ''}`}
        onClick={() => {
          setTabIdx(3)
        }}
      >
        Auto Label
      </div>
    </div>
  )
}
