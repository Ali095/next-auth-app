
import React, { CSSProperties } from 'react';
import styles from './section.module.scss';

type RecipeField = {
    label: string,
    value: string
}

type RecipeSectionProps = {
    children: React.ReactNode,
    title: string,
    desc?: string,
    recipeFields?: RecipeField[],
    style?: CSSProperties
}

const RecipeSection = ({ title, desc, children, recipeFields, style }: RecipeSectionProps) => {
    return (
        <section style={style} className={styles.section}>
            <div className={styles.details}>
                <h3 className={styles.title}>{title}</h3>
                {desc && <p className={styles.desc}>{desc}</p>}
            </div>

            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};

export default RecipeSection;
