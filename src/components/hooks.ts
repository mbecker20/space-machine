import { useState } from "react";

export function useReRender() {
  const [,toReRender] = useState({})
  const reRender = () => { toReRender({}) }
  return reRender
}