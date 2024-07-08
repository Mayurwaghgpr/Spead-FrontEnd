export const debounce = (cb, delay=500) => {
    let timer;
    return (...arg) => {
        // console.log(timer)
        clearTimeout(timer)
     timer = setTimeout(()=> cb(...arg),delay)
    }
}