import React from 'react'
import { FC } from 'react'

const FlexLayout: FC = ({ children }) => {
  return (
    <>
      <div className='container'>
        <div className='columns'>{children}</div>
      </div>
    </>
  )
}

export default FlexLayout
