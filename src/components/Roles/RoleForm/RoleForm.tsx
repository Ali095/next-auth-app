
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Checkbox from '../../Checkbox/Checkbox';
import CheckboxGroup from '../../Checkbox/CheckboxGroup';
import InputGroup from '../../InputGroup/InputGroup';
import styles from './form.module.scss';

type RoleFormProps = {
    label?: string
    handleClose?: () => void
}

const RoleForm = ({ label = '', handleClose }: RoleFormProps) => {
    const [name, setName] = useState(label);
    const [selectAll, setSelectAll] = useState(false);
    const wrap = useRef<HTMLDivElement | null>(null);

    function handleDiscard() {
        handleClose && handleClose();
    }

    useEffect(() => {
        if (wrap.current) {
            const checkboxes: NodeListOf<HTMLInputElement> = wrap.current.querySelectorAll('input[type="checkbox"]');
            selectAll ? checkboxes.forEach(c => c.checked = true) : checkboxes.forEach(c => c.checked = false);
        }
    }, [selectAll]);

    return (
        <div ref={wrap} className={styles.wrap}>
            <InputGroup label='Role name' required>
                <input
                    type='text'
                    placeholder='Role name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputGroup>

            <InputGroup label='Role permissions'>
                <div className={styles.list}>
                    <div className={styles.permission}>
                        <span className={styles.label}>Administrator Access</span>
                        <CheckboxGroup>
                            <Checkbox
                                id="select-all"
                                checked={selectAll}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectAll(e.target.checked)}
                            />
                            <label htmlFor="select-all">Select all</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>User Management</span>
                        <CheckboxGroup>
                            <Checkbox id="um-read" />
                            <label htmlFor="um-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="um-write" />
                            <label htmlFor="um-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="um-create" />
                            <label htmlFor="um-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Content Management</span>
                        <CheckboxGroup>
                            <Checkbox id="cm-read" />
                            <label htmlFor="cm-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="cm-write" />
                            <label htmlFor="cm-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="cm-create" />
                            <label htmlFor="cm-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Financial Management</span>
                        <CheckboxGroup>
                            <Checkbox id="fm-read" />
                            <label htmlFor="fm-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="fm-write" />
                            <label htmlFor="fm-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="fm-create" />
                            <label htmlFor="fm-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Reporting</span>
                        <CheckboxGroup>
                            <Checkbox id="reporting-read" />
                            <label htmlFor="reporting-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="reporting-write" />
                            <label htmlFor="reporting-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="reporting-create" />
                            <label htmlFor="reporting-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Payroll</span>
                        <CheckboxGroup>
                            <Checkbox id="payroll-read" />
                            <label htmlFor="payroll-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="payroll-write" />
                            <label htmlFor="payroll-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="payroll-create" />
                            <label htmlFor="payroll-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Dispute Management</span>
                        <CheckboxGroup>
                            <Checkbox id="dm-read" />
                            <label htmlFor="dm-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="dm-write" />
                            <label htmlFor="dm-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="dm-create" />
                            <label htmlFor="dm-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>API Controls</span>
                        <CheckboxGroup>
                            <Checkbox id="api-read" />
                            <label htmlFor="api-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="api-write" />
                            <label htmlFor="api-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="api-create" />
                            <label htmlFor="api-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Database Management</span>
                        <CheckboxGroup>
                            <Checkbox id="dm-read" />
                            <label htmlFor="dm-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="dm-write" />
                            <label htmlFor="dm-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="dm-create" />
                            <label htmlFor="dm-create">create</label>
                        </CheckboxGroup>
                    </div>

                    <div className={styles.permission}>
                        <span className={styles.label}>Repository Management</span>
                        <CheckboxGroup>
                            <Checkbox id="rm-read" />
                            <label htmlFor="rm-read">Read</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="rm-write" />
                            <label htmlFor="rm-write">write</label>
                        </CheckboxGroup>
                        <CheckboxGroup>
                            <Checkbox id="rm-create" />
                            <label htmlFor="rm-create">create</label>
                        </CheckboxGroup>
                    </div>
                </div>
            </InputGroup>

            <div className={styles.actions}>
                <button
                    className="btn__transparent"
                    onClick={handleDiscard}
                >Discard</button>
                <button className="btn__primary">Submit</button>
            </div>
        </div>
    );
};

export default RoleForm;
