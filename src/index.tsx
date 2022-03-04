import React, { useEffect, useState , useRef } from 'react';
import Tooltip from 'rc-tooltip';
import './slider.css'

export interface SliderProps {
  vertical?: boolean
  min?: number
  max?: number
  onChange?: (e:number)=> any
  defaultValue?: number
}


export const SimpleSlider = (props: SliderProps)=>{
  const { vertical=false , min=0 , max=100 , onChange = ()=>{} , defaultValue = 0 } = props
  const [curValue, setCurValue] = useState( Math.floor( ((defaultValue - min ) / (max - min)) * 100 ) )
  const [exactValue, setExactValue] = useState( ((defaultValue - min ) / (max - min)) * 100 )

  const [down , setDown] = useState(false)
  const [startPosition , setStartPosition] = useState(0)
  const [pathNum , setPathNum] = useState(0)

  const trackRef = useRef(null)
  const pathRef:any = useRef(null)

  const barClick = (e:any)=>{
    vertical ? changeValue( (e.target?.clientHeight - e.nativeEvent.offsetY) ,e.target?.clientHeight) : changeValue( e.nativeEvent.offsetX ,e.target?.clientWidth)
  }
  
  const dommouseMove = (e:any)=>{
    const step = vertical ? startPosition - e.clientY :  e.clientX - startPosition
    toMove( step ) 
  }
  const mouseDown = (e:any)=>{
    setDown(true)
    barClick(e)
    setStartPosition(vertical ? e.clientY : e.clientX)
  }
  const trackMouseDown = (e:any)=>{
    e.stopPropagation()
    e.preventDefault()

    setStartPosition(vertical ? e.clientY : e.clientX)
    setDown(true)
  }
  const toMove = (step:number)=>{
    const abs = step >= 0
    if( (!abs && exactValue == 0) || (abs && exactValue == 100) ) return

    let newValue = ( (Math.abs(step) / pathNum) *100 ) 
    let sum  =  abs ? curValue + newValue : curValue - newValue
    sum = sum <= 0 ? 0 : sum > 100 ? 100 : sum

    let exactSum  =  abs ? newValue + exactValue : exactValue - newValue
    exactSum = exactSum <= 0 ? 0 : exactSum > 100 ? 100 : exactSum

    setCurValue(  Math.floor(Number(sum) ) )
    setExactValue( Number(exactSum.toFixed(2)) )

  }
  const changeValue = (num:number , den:number)=>{
    let value = num / den
    value = value >= 1 ? 1 : value <= 0 ?  0 : value

    setCurValue(Math.floor(Number(value.toFixed(4)) * 100))
    setExactValue( (Number(value.toFixed(4)) * 100) )
  }
  const getLabelValue = (value:number)=>{
    return Math.floor((max - min) * value/100 + min)
  }

  useEffect(() => {
    if(!down){
      setDown(false)
      return
    }
    document.addEventListener('mouseup', domMouseUp)
    document.addEventListener('mousemove', dommouseMove)
    return () => {
      document.removeEventListener('mouseup', domMouseUp)
      document.removeEventListener('mousemove', dommouseMove)
      setDown(false)
    }
  }, [down])

  useEffect(()=>{
    if(pathRef?.current){
      const num = vertical ? pathRef.current?.clientHeight : pathRef.current?.clientWidth
      setPathNum( num )
    }
  },[pathRef , vertical])

  const domMouseUp = ()=>{
    setDown(false)
  }
  
  useEffect(()=>{
    onChange(getLabelValue(curValue))
  },[curValue])

  return (
    <div className={` ${!vertical ? 'w-full h-5' : 'w-5 h-full' }`} style={{ padding: '16px 10px', background: 'white', borderRadius: 12 , boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)'}}>

      <div onClick={(e)=>e.stopPropagation()} className={` ${!vertical ? 'w-full h-5' : 'w-5 h-full' }  relative flex items-center justify-center`} draggable={false} tabIndex={0} onMouseDown={mouseDown} >
        <div ref={pathRef} className={`${!vertical ? 'w-full h-6' : 'w-6 h-full relative'} bg-gray-e5e5e5 rounded-full  overflow-hidden`} >
          <div className={` bg-main-color ${!vertical ? '':'absolute bottom-0 top-auto' } `} style={{width: !vertical ? `${exactValue}%` : '100%', height: vertical ? `${exactValue}%` : '100%' }}></div>
        </div>

        <div className={`absolute ${ !vertical ? 'top-0 bottom-0 left-1 right-1' : 'top-1 bottom-1 left-0 right-0'} box-border`}>
          <div className='absolute' ref={trackRef} style={{ left: !vertical ? `${exactValue}%`: '50%', bottom: vertical ? `${exactValue}%`: '50%'}} >
            <Tooltip trigger={['focus', 'hover']} placement={`${ !vertical ? 'top':'right'}`} overlay={<span style={{padding: '6px 6px', borderRadius: 8, fontSize: 18  , color: 'white', lineHeight: '22px', background: 'rgba(0,0,0,.8)'}}> {getLabelValue( exactValue ) }%</span>} destroyTooltipOnHide getTooltipContainer={()=> trackRef?.current || document.body} >
              <div role='slider' aria-valuemin={min} aria-valuemax={max} aria-valuenow={curValue} aria-disabled="false"  onMouseDown={trackMouseDown} onClick={(e:any)=> e.stopPropagation()}  style={{ left: !vertical ? `${exactValue}%`: '50%', bottom: vertical ? `${exactValue}%`: '50%' , boxShadow: '0px 3.07692px 9.23077px rgba(0, 0, 0, 0.15)', cursor: vertical ? 'ns-resize' : 'ew-resize'}} className={`h-5 w-5 rounded-full border-2 border-white ${exactValue > 0 ? 'bg-main-color' : 'bg-gray01'} absolute transform  ${!vertical ?  'translate-y -ml-10' : '-translate-x -mb-10'}`} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}
 
