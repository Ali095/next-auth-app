
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';

type SelectOption = {
    label: string,
    value: string | number
}

type SingleSelectProps = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void
}

type MultipleSelectProps = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void
}

type SelectProps = {
    options: SelectOption[],
    style?: CSSProperties
} & (SingleSelectProps | MultipleSelectProps)

const Select = ({ multiple, value, options, style, onChange }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    function clearOptions() {
        multiple ? onChange([]) : onChange(undefined);
    }

    function selectOption(option: SelectOption) {
        if (multiple) {
            if (value.includes(option)) {
                onChange(value.filter(o => o !== option));
            } else {
                onChange([...value, option]);
            }
        } else {
            if (option !== value) onChange(option);
        }
    }

    function isOptionSelected(option: SelectOption) {
        return multiple ? value.includes(option) : option === value;
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, highlightedIndex, options]);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={styles.container}
            style={style}
        >
            <span className={styles.value}>{
                multiple ? value.map(v => (
                    <button
                        key={v.value}
                        onClick={e => {
                            e.stopPropagation();
                            selectOption(v);
                        }}
                        className={styles.badge}
                    >{v.label}
                        <span className={styles['remove-btn']} >&times;</span>
                    </button>
                )) : value?.label
            }</span>

            <button
                onClick={e => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className={styles['clear-btn']}
            > &times;</button>

            {/* <span className={styles.divider}></span> */}
            <span className={styles.caret}></span>

            <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
                {
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

export default Select;
