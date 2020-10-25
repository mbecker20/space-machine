import React, { Fragment, ReactNode } from 'react'

interface Props {
  children: ReactNode
  showIf: boolean
}

function Conditional({ children, showIf }: Props) {
  return (
    <Fragment>
      {!showIf ? null : children}
    </Fragment>
  )
}

export default Conditional