
import { ReactNode, useEffect, useRef } from 'react';
import Portal from '../Portal/Portal';

type ActionsMenuProps = {
    children: ReactNode
    isOpen: boolean
    handleClose: () => void
    position: {
        top: string
        left: string
    }
}

const ActionsMenu = ({ children, isOpen, handleClose, position }: ActionsMenuProps) => {
    const nodeRef = useRef(null);

    useEffect(() => {
        const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? handleClose() : null);
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey);
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
    );
};

export default ActionsMenu;
