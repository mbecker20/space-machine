import { useState } from "react";

export function useReRender() {
  const [,toReRender] = useState({})
  const reRender = () => { toReRender({}) }
  return reRender
}

export function useLocalStorage<T>(defaultStore: T, key: string) {
  const toStore = window.localStorage.getItem(key)
  const [stored, setStore] = useState(toStore ? toStore : defaultStore)
  return [
    stored,
    (newStore: T) => {
      setStore(newStore)
      window.localStorage.setItem(key, JSON.stringify(newStore))
    }
  ]
}