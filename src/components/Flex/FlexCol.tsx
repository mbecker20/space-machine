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
  justifyContent?: string
  alignItems?: string
}

function FlexCol({ className, children, style, ref, onDrop, onDragOver, justifyContent, alignItems }: Props) {
  const classes = useJSS({ justifyContent, alignItems })
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