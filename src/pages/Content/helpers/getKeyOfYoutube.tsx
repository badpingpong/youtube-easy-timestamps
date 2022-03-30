const REGEX = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?)\??v?=?([^#&?]*).*/
export const getKeyOfYoutube = (url: string) => {
  const result = url.match(REGEX)
  return result ? result[2] : result
}
