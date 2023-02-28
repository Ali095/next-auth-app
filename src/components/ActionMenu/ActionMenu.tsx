
import { ReactNode, useEffect } from "react";
import { Portal } from "../Portal";

type ActionsMenuProps = {
    children: ReactNode
    isOpen: boolean
    handleClose: () => any
    position: {
        top: string
        left: string
    }
}

export const ActionsMenu = ({ children, isOpen, handleClose, position }: ActionsMenuProps) => {

    useEffect(() => {
        const closeOnEscapeKey = (e: any) => (e.key === "Escape" ? handleClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    return (
        <Portal wrapperId="action-menu" >
            {
                isOpen && <div style={{
                    position: 'fixed',
                    left: position.left,
                    top: position.top,
                }} >{children}</div>
            }
        </Portal>
    )
}
