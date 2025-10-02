export const debounce = <F extends (...args: any[]) => void>(
  fn: F,
  delay: number,
) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<F>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
