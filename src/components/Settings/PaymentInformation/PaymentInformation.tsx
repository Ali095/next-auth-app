
import Image from 'next/image';
import { useState } from 'react';
import styles from './payment.module.scss';
import PaymentCardForm from '../PaymentCardForm/PaymentCardForm';

const PaymentInformation = () => {
    const [openEditForm, setOpenEditForm] = useState(false);

    return (
        <>
            {!openEditForm && <div className={styles.container}>
                <div className={styles.card}>
                    <Image
                        src='/images/mastercard.svg'
                        width={64}
                        height={44}
                        alt="mastercard"
                        style={{ border: '1px solid var(--clr-border)', borderRadius: '5px' }}
                    />

                    <div className={styles.content}>
                        <span className={styles.title}>Mastercard ending in 7284</span>
                        <span className={styles.desc}>Expires 05/24</span>
                    </div>
                </div>

                <button
                    className="btn__transparent"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setOpenEditForm(true)}
                >Edit payment information</button>
            </div>}

            {openEditForm && <PaymentCardForm />}
        </>
    );
};

export default PaymentInformation;
