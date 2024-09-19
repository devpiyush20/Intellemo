import React, { useRef } from 'react'
import './canvas.css'
import KonvaImageComponent from './KonvaImageComponent'
import KonvaTextComponent from './KonvaTextComponent'

const Canvas = () => {  
  return (
<>
<div className='container'>
<KonvaImageComponent/>
<KonvaTextComponent/>
</div>
</>
  )
}

export default Canvas
