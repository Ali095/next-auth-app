
import styles from '../advanced.module.scss';

type HeaderProps = {
    isOpen: boolean
    label: string
    onClick: () => void
}

const Header = ({ isOpen, label, onClick, ...props }: HeaderProps) => {
    return (
        <button
            type='button'
            className={`${styles.header} ${isOpen ? styles.open : ''}`}
            onClick={() => onClick()}
            {...props}
        >
            <h3 className={styles.title} >{label}</h3>
            <span className={styles.tag} >Disabled</span>
        </button>
    );
};

export default Header;
