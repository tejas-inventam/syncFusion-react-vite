import { createContext, useContext, useEffect, useRef } from 'react'
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups'

const LoaderContext = createContext({
  showLoader: () => {},
  hideLoader: () => {}
})

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const spinnerRef = useRef(null)

  useEffect(() => {
    if (spinnerRef.current) {
      createSpinner({
        target: spinnerRef.current,
        label: 'Loading...',
        width: '50px'
      })
    }
  }, [])

  const show = () => {
    if (spinnerRef.current) showSpinner(spinnerRef.current)
  }

  const hide = () => {
    if (spinnerRef.current) hideSpinner(spinnerRef.current)
  }

  return (
    <LoaderContext.Provider value={{ showLoader: show, hideLoader: hide }}>
      <>
        {children}
        <div
          ref={spinnerRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 9999,
            background: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        />
      </>
    </LoaderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLoader = () => useContext(LoaderContext)
