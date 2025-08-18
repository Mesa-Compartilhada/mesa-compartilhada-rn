import { Snackbar as Snack, SnackbarProps } from "react-native-paper"

type Props = {
    children: React.ReactNode,
    onDismiss: () => void,
    visible: boolean,
} & SnackbarProps

export default function Snackbar({ children, onDismiss, visible, ...rest }: Props) {
    return (
        <Snack onDismiss={onDismiss} visible={visible} >
            {children}
        </Snack>
    )
}