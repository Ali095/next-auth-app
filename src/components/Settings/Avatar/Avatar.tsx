
import styles from './avatar.module.scss';

const Avatar = () => {
    return (
        <div className={styles.container}>
            <span className={styles.avatar}>HM</span>
            <p className={styles.details}>
                We use Gravatar, a service that associates an avatar image with your email address. <a href="https://en.gravatar.com/emails/" target='_blank' rel='noreferrer'>Change your Gravatar</a>
            </p>
        </div>
    );
};

export default Avatar;
