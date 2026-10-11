import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timeOut)
    }, [value, delay])

    return debouncedValue
}