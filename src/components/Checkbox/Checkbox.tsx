
import styles from './checkbox.module.scss';

const Checkbox = ({ ...props }) => {
    return (
        <div className={styles.container}>
            <input {...props} type="checkbox" />
        </div>
    );
};

export default Checkbox;