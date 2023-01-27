
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';

type RoleOption = {
    label: string
    value: string | number
}

type RoleSelectProps = {
    options: RoleOption[]
    style?: CSSProperties
    value: RoleOption | undefined
    onChange: (value: RoleOption | undefined) => void
}

const RoleSelect = ({ value, options, style, onChange }: RoleSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    function clearOptions() {
        onChange(undefined);
    }

    function selectOption(option: RoleOption) {
        if (option !== value) onChange(option);
    }

    function isOptionSelected(option: RoleOption) {
        return option === value;
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
            <span className={styles.value}>Role: {value?.label}</span>

            {/* <button
                onClick={e => {
                    e.stopPropagation();
                    clearOptions();
                }}
                className={styles["clear-btn"]}
            > &times;</button> */}

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
                            className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''} ${idx === highlightedIndex ? styles.highlighted : ''}`}
                            onMouseEnter={() => setHighlightedIndex(idx)}
                        >
                            {option.label}
                            <small>
                                {option.value === 'admin' && 'Can read and clone this repository. Can also open and comment on issues and pull requests.'}
                                {option.value === 'read' && 'Can read, clone, and push to this repository. Can also manage issues and pull requests.'}
                                {option.value === 'write' && 'Can read, clone, and push to this repository. Can also manage issues, pull requests, and repository settings, including adding collaborators.'}
                            </small>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default RoleSelect;
