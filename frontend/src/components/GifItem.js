import React from 'react'


// TODO: Make a CSS file for the styles
const GifItem = props => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.gif})`,
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: '50%',
        backgroundPositionX: '50%',
        backgroundPositionZ: 'center',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          position: 'relative',
          top: '50%',
          fontSize: '5.5em',
          fontWeight: 'bold',
          color: '#fff',
          textShadow:
            '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }}
      >
        404
      </h1>
    </div>
  )
}

export default GifItem
