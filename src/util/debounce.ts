const debounce = <TIn>(func: (arg: TIn) => void, wait: number) => {
  let timeout: NodeJS.Timeout;

  return (arg: TIn) => {
    const later = () => {
      clearTimeout(timeout);
      func(arg)
    }

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

export default debounce;