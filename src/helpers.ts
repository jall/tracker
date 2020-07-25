export function notNothing<T>(input: T | null | undefined): input is T {
  return input != null
}

export function accumulate<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) {
  let timeout: NodeJS.Timeout | undefined
  let invocations: Array<ReturnType<F>> = []

  const reset = () => {
    timeout = undefined
    invocations = []
  }

  return (...args: Parameters<F>): Promise<Array<ReturnType<F>>> =>
    new Promise((resolve) => {
      invocations.push(func(args))

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        resolve(invocations)
        reset()
      }, waitFor)
    })
}
