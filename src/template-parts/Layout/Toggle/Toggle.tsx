
import Icon from '../../../components/Icons/Icons';
import styles from './toggle.module.scss';

type ToggleProps = {
    pinned: boolean
    handlePinned: () => void
}

const Toggle = ({ pinned, handlePinned }: ToggleProps) => {

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

export default Toggle;
