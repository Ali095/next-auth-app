import React, { ReactNode } from 'react'
import { Checkbox } from '../Checkbox';
import styles from './styles/table.module.scss';

type TableProps = {
    labels: string[]
    children: ReactNode
}

export const Table = ({ labels, children }: TableProps) => {
    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        <th><Checkbox /></th>
                        {labels.map((label, index) => <th key={index}>{label}</th>)}
                    </tr>
                </thead>

                <tbody>{children}</tbody>
            </table>
        </div>
    )
}
