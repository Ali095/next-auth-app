
import React from 'react';
import InvoiceCard from './InvoiceCard/InvoiceCard';
import styles from './invoices.module.scss';
import InvoiceStatus from './InvoiceStatus/InvoiceStatus';

const PaymentInvoices = () => {
    return (
        <div className={styles.wrap}>
            <h3 className={styles.title} >Invoices</h3>

            <div className={styles.list}>
                <table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><InvoiceStatus status={'success'} /></td>
                            <td><span>2022-11-6</span></td>
                            <td><span>$0 USD</span></td>
                            <td><span>No Charge applied</span></td>
                            <td><a href="#">View details</a></td>
                        </tr>
                        <tr>
                            <td><InvoiceStatus status={'failed'} /></td>
                            <td><span>2022-10-12</span></td>
                            <td><span>$29.99 USD</span></td>
                            <td><InvoiceCard /></td>
                            <td><a href="#">View details</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentInvoices;
