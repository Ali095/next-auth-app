
import styles from './checkbox.module.scss';

export const Checkbox = ({ ...props }) => {
    return (
        <div className={styles.container}>
            <input {...props} type="checkbox" />
        </div>
    )
}
