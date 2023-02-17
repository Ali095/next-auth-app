
import { ReactNode, useEffect, useRef, useState } from "react";
import { Icon } from "../Icons";
import { Portal } from "../Portal";
import styles from './modal.module.scss';

type ModalTypes = {
    children: ReactNode
    isOpen: boolean
    handleClose: (...args: any[]) => any;
    id?: string
    title?: string
}

export const Modal = ({ children, isOpen, handleClose, id = 'modal', title }: ModalTypes) => {
    const [open, setOpen] = useState(false);
    const nodeRef = useRef(null);

    useEffect(() => {
        const closeOnEscapeKey = (e: any) => (e.key === "Escape" ? handleClose() : null);
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        };
    }, [handleClose]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setOpen(false);
                document.body.removeAttribute('data-add-open')
            }, 500);
        } else {
            setOpen(true);
        }

    }, [isOpen]);

    return (
        <Portal wrapperId={id}>
            {
                open && <div
                    className={`${styles.wrap} ${open ? styles.active : ''} ${isOpen ? '' : styles.hide}`}
                    ref={nodeRef}
                >
                    <div className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>{title}</h3>

                            <button
                                onClick={() => handleClose()}
                                className={styles.close}
                                type="button"
                            >
                                <Icon name="cross" />
                            </button>
                        </div>

                        <div className={styles.body}>
                            {children}
                        </div>
                    </div>
                </div>
            }
        </Portal>
    );
}
export default Modal;
