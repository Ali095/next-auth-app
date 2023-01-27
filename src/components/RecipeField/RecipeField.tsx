
import React, { useEffect, useState } from 'react';
import { RecipeFieldProps } from '../../@types/typings';
import styles from './field.module.scss';
import Icon from '../Icons/Icons';

type recipeFieldsProps = {
    data: RecipeFieldProps,
    updateField: (data: RecipeFieldProps) => void,
    deleteField: (data: RecipeFieldProps) => void
}

const RecipeField = ({ data: { label, value, id }, deleteField }: recipeFieldsProps) => {
    const [fieldLabel, setFieldLabel] = useState('');
    const [fieldValue, setFieldValue] = useState('');


    function deleteRecipe() {
        const data: RecipeFieldProps = { id, label: fieldLabel, value: fieldValue };
        deleteField(data);
    }

    useEffect(() => {
        setFieldLabel(label);
        setFieldValue(value);

    }, [label, value]);

    return (
        <div className={styles.field}>
            <input
                type="text"
                name='label'
                className={styles.fieldLabel}
                placeholder="Labels"
                value={fieldLabel}
                onChange={(e) => setFieldLabel(e.target.value)}
            />

            <input
                type="text"
                name='value'
                className={styles.fieldValue}
                placeholder="Value"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
            />

            <button className={styles.inspector}>
                <Icon name="inspector" />
            </button>

            <button
                className={styles.fieldDelete}
                onClick={deleteRecipe}
            >
            </button>
        </div>
    );
};

export default RecipeField;
