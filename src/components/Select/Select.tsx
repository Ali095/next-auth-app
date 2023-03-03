
import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Loader } from '../Loader';
import styles from './select.module.scss';

type SelectOption = {
    label: string,
    value: string | number
}

type SingleSelectProps = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value: SelectOption) => any
}

type MultipleSelectProps = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => any
}

type SelectProps = {
    options: SelectOption[],
    style?: CSSProperties
    loading?: boolean
} & (SingleSelectProps | MultipleSelectProps)

export const Select = ({ multiple, value, options, style, onChange, loading = false }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     console.log('current value=> ',value);
    //     if (!multiple) {
    //         if (!value) {
    //             selectOption({ label: 'Please Select', value: -1 });
    //         } else {
    //             selectOption(value);
    //         }
    //     }
    // }, []);

    const clearOptions = () => {
        if (multiple) onChange([])
        else {
            setHighlightedIndex(0);
            onChange({ value: -1, label: 'Please Select' });
        };
    }

    const selectOption = useCallback((option: SelectOption) => {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option.value !== value?.value) {
                onChange(option);
            }
        }
    }, [multiple, onChange, value])

    const isOptionSelected = (option: SelectOption) => {
        return multiple ? value.includes(option) : option.value === value?.value;
    }

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.target !== container) return;
            e.preventDefault();

            switch (e.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(prev => !prev);
                    if (isOpen) selectOption(options[highlightedIndex]);
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    {
                        if (!isOpen) {
                            setIsOpen(true);
                            break;
                        }

                        const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
                        if (newValue >= 0 && newValue < options.length) {
                            setHighlightedIndex(newValue);
                        }
                    }
                    break;

                case 'Escape':
                    setIsOpen(false);
                    break;
                default:
                    break;
            }
        };

        const container = containerRef.current;
        container?.addEventListener('keydown', handler);

        return () => {
            container?.removeEventListener('keydown', handler);
        };
    }, [highlightedIndex, isOpen, options, selectOption]);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => !loading && setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
            style={style}
        >
            <span className={styles.value}>{
                multiple ? value.map(v => (
                    <button
                        type='button'
                        key={v.value}
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(v);
                        }}
                        className={styles.badge}
                    >{v.label}
                        <span className={styles['remove-btn']} >&times;</span>
                    </button>
                )) : loading ? <Loader placement='right' width={20} height={20} /> : value?.label
            }</span>

            <button
                type='button'
                onClick={e => {
                    e.stopPropagation();
                    !loading &&clearOptions();
                }}
                className={styles['clear-btn']}
            > &times;</button>

            {/* <span className={styles.divider}></span> */}
            <span className={styles.caret}></span>

            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {
                    loading ? <Loader width={20} height={20} /> :
                        options.map((option, idx) => (
                            <li
                                onClick={e => {
                                    e.stopPropagation();
                                    selectOption(option);
                                    setIsOpen(false);
                                }}
                                key={option.value}
                                className={
                                    `${styles.option}
                                ${isOptionSelected(option) ? styles.selected : ''}
                                ${idx === highlightedIndex ? styles.highlighted : ''}
                                `}
                                onMouseEnter={() => setHighlightedIndex(idx)}
                            >{option.label}</li>
                        ))
                }
            </ul>
        </div>
    );
};
