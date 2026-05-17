import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { Snackbar as Snack, SnackbarProps } from "react-native-paper"

type SnackBarState = {
  visible: boolean
  message: React.ReactNode
  props?: SnackbarProps
}

type SnackBarContextData = {
  showSnackbar: (
    message: React.ReactNode,
    props?: SnackbarProps
  ) => void
  hideSnackbar: () => void
}

const SnackBarContext = createContext<SnackBarContextData>(
  {} as SnackBarContextData
)

export function SnackBarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackBarState>({
    visible: false,
    message: "",
  })

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
    }))
  }, [])

  const showSnackbar = useCallback(
    (
      message: React.ReactNode,
      props?: SnackbarProps
    ) => {
      setSnackbar({
        visible: true,
        message,
        props,
      })
    },
    []
  )

  const value = useMemo(
    () => ({
      showSnackbar,
      hideSnackbar,
    }),
    [showSnackbar, hideSnackbar]
  )

  return (
    <SnackBarContext.Provider value={value}>
      {children}

      <Snack
        visible={snackbar.visible}
        onDismiss={hideSnackbar}
        duration={3000}
        {...snackbar.props}
      >
        {snackbar.message}
      </Snack>
    </SnackBarContext.Provider>
  )
}

export function useSnackBar() {
  return useContext(SnackBarContext)
}