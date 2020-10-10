import React, { DragEvent } from 'react'
import CSS from 'csstype'
import useJSS from './style'

interface Props {
  className?: string
  style?: CSS.Properties
  children?: React.ReactNode
  ref?: React.RefObject<HTMLDivElement>
  onDrop?: (e: DragEvent<HTMLDivElement>) => void
  onDragOver?: (e: DragEvent<HTMLDivElement>) => void
}

function FlexCol({ className, children, style, ref, onDrop, onDragOver }: Props) {
  const classes = useJSS()
  return (
    <div className={className ? `${classes.FlexCol} ${className}` : classes.FlexCol}
      style={style}
      ref={ref}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      { children }
    </div>
  );
}

export default FlexCol