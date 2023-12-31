export const subscribe = (eventName, listener) => {
  document.addEventListener(eventName, listener)
}

export const unsubscribe = (eventName, listener) => {
  document.removeEventListener(eventName, listener)
}

export const publishCustomEvent = (eventName, data) => {
  const event = new CustomEvent(eventName, { detail: data })
  document.dispatchEvent(event)
}
