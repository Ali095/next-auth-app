import { Icon } from '../Icons';
import styles from './styles/toggle.module.scss';

type ToggleProps = {
    pinned: boolean
    handlePinned: () => void
}

export const Toggle = ({ pinned, handlePinned }: ToggleProps) => {

    return (
        <button
            type='button'
            className={styles.btn}
            onClick={() => {
                handlePinned && handlePinned()
            }}
        >
            <span className={`${styles.icon} ${!pinned ? styles.pinned : ''}`}>
                <Icon name='toggle' />
            </span>
        </button>
    )
}
