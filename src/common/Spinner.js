import React from 'react'
import { Spin, Icon } from 'antd'

import '../routes/index.css'

const Spinner = () => {
  const icon = (
    <Icon type="loading" style={{ fontSize: 50, width: '50%' }} spin />
  )

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 ,auto',
        overflow: 'auto',
        resize: 'both'
      }}
    >
      <Spin indicator={icon} />
    </div>
  )
}

export default Spinner
