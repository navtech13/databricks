export const setCookie = (name, value, days = 0, minutes = 0) => {
  const daysTime = days * 24 * 60 * 60 * 1000
  const minutesTime = minutes * 60 * 1000
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + daysTime + minutesTime)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`
}
