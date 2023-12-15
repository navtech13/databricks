// generates a random string with given length and optional prefix
const randomString = (minLength = 0, prefix = "") => {
  if (prefix.length <= minLength) {
    const str = Math.random().toString(36).slice(2)
    return randomString(minLength, prefix.concat(str))
  }

  return prefix.slice(0, minLength)
}

export default randomString