
import { JsonViewer } from '@textea/json-viewer';
import React, { useState } from 'react';
import RecipeTable from '../components/RecipeTable/RecipeTable';
import styles from '../../styles/components/recipe-results.module.scss';

const object = [
    {
        "id": 4942,
        "uid": "fc7cdcbe-acbe-4772-9077-d42457b40f74",
        "account_number": "9547200310",
        "iban": "GB88ZCKK50455769220737",
        "bank_name": "OTKRITIE SECURITIES LIMITED",
        "routing_number": "030160059",
        "swift_bic": "ABCCGB22"
    },
    {
        "id": 435,
        "uid": "af2e7c24-e787-48c9-b775-6fde9cc36a62",
        "account_number": "5687092165",
        "iban": "GB56MLCB17214240905870",
        "bank_name": "ALKEN ASSET MANAGEMENT",
        "routing_number": "324395019",
        "swift_bic": "BCYPGB2LBBB"
    },
    {
        "id": 4289,
        "uid": "6e13432f-a0da-469b-be62-823813dc3bed",
        "account_number": "3489527404",
        "iban": "GB80CWYF17509705075152",
        "bank_name": "OTKRITIE SECURITIES LIMITED",
        "routing_number": "298678176",
        "swift_bic": "BCYPGB2LMBB"
    }
]

const RecipeResult = () => {
    const [active, setActive] = useState('table');

    return (
        <>
            <div className={styles.container}>
                <button
                    onClick={() => setActive('table')}
                    className={`${styles.btn} ${active === 'table' ? styles.active : ''}`}
                >Table Preview</button>
                <button
                    onClick={() => setActive('json')}
                    className={`${styles.btn} ${active === 'json' ? styles.active : ''}`}
                >JSON Preview</button>
            </div>

            <div className={`${styles.content} ${active === 'table' ? styles.active : ''}`}>
                <RecipeTable />
            </div>

            <div className={`${styles.content} ${active === 'json' ? styles.active : ''}`}>
                <JsonViewer
                    value={object}
                    rootName="data"
                    enableClipboard={true}
                    displayDataTypes={false}
                />
            </div>
        </>
    )
}

export default RecipeResult;
