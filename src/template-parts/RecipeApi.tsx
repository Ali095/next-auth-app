
import React from 'react';
import styles from '../../styles/template-parts/recipe-form.module.scss';

const RecipeApi = () => {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.details}>
                    <h3 className={styles.title}>API URL</h3>
                    <p className={styles.desc}>Send GET requests to this URL to retrieve your data.</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <textarea readOnly defaultValue='https://webspidey.io/api/g68xfUYPk7CtBI4LvDAz?apikey=QKEqcln6lsiR01Il9oowr7OB8qsi3d3y&source_url=https://example.com&limit=100'></textarea>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.details}>
                    <h3 className={styles.title}>URL Parameters</h3>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.details}>
                    <h4>Recipe UUIDs</h4>
                    <p className={styles.desc}>Unique to this recipe. Required</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input type="text" placeholder='Recipe UUID' readOnly required defaultValue={`g68xfUYPk7CtBI4LvDAz`} />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.details}>
                    <h4>API Key</h4>
                    <p className={styles.desc}>Unique to you. Required</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input type="text" placeholder='API Key' readOnly required defaultValue='QKEqcln6lsiR01Il9oowr7OB8qsi3d3y' />
                    </div>
                </div>
            </section>

            {/* <section className={styles.section}>
                <div className={styles.details}>
                    <h4>Run now</h4>
                    <p className={styles.desc}>Run recipe before returning results (instead of retrieving cached results from database). Optional.</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input type="text" readOnly />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.details}>
                    <h4>Offset</h4>
                    <p className={styles.desc}>Index to begin at. Useful for pagination. Default is 0. Optional.</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input type="text" readOnly />
                    </div>
                </div>
            </section> */}

            <section className={styles.section}>
                <div className={styles.details}>
                    <h4>Limit</h4>
                    <p className={styles.desc}>Number of items to return. Default is 20. Min 1. Max 1000. Optional.</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input type="number" readOnly name="" id="" defaultValue={100} min={1} max={1000} />
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.details}>
                    <h4>Source url</h4>
                    <p className={styles.desc}>Change the source URL (page to be scraped) of the recipe. Optional.</p>
                </div>

                <div className={styles.content} style={{ backgroundColor: 'transparent', border: '0' }}>
                    <div className={styles.group}>
                        <input readOnly type="url" defaultValue='https://example.com' />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecipeApi
