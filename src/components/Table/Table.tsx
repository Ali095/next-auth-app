import React, { ReactNode } from 'react';
import Checkbox from '../Checkbox/Checkbox';

import styles from './table.module.scss';

type TableProps = {
    labels: string[]
    children: ReactNode
}

const Table = ({ labels, children }: TableProps) => {
    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th><Checkbox /></th>
                        {labels.map((label, idx) => (
                            <th key={idx}>{label}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>{children}</tbody>
            </table>
        </div>
    );
};

export default Table;
