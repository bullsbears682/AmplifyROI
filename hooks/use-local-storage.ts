import { useState, useEffect, useCallback } from 'react'
import { getErrorMessage } from '@/lib/utils'

type SetValue<T> = T | ((val: T) => T)

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void, () => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        // Allow value to be a function so we have the same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
          
          // Dispatch a custom event to notify other components
          window.dispatchEvent(
            new CustomEvent('localStorage', {
              detail: {
                key,
                value: valueToStore,
              },
            })
          )
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, getErrorMessage(error))
      }
    },
    [key, storedValue]
  )

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(
          new CustomEvent('localStorage', {
            detail: {
              key,
              value: null,
            },
          })
        )
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, getErrorMessage(error))
    }
  }, [key, initialValue])

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error)
        }
      }
    }

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('localStorage', handleCustomStorageChange as EventListener)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('localStorage', handleCustomStorageChange as EventListener)
      }
    }
  }, [key])

  return [storedValue, setValue, removeValue]
}

export { useLocalStorage }