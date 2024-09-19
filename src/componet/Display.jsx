import React from 'react'

const Display = React.forwardRef((props , ref) => {
  return (
    <div ref={ref}
    style={{
      border: '1px solid black',
      width: '500px',
      height: '500px',
      marginTop: '10px',}}

    >

      
    </div>
  )
})

export default Display
