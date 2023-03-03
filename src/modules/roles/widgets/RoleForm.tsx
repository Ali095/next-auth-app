
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Checkbox, CheckboxGroup } from '../../../components/Checkbox';
import { InputGroup } from '../../../components/Input';
import { ResourcePermissions } from '../../permissions/@types';
import permissionService from '../../permissions/permissions.service';
import styles from './styles/form.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader } from '../../../components/Loader';

interface Resources {
    id: number;
    slug: string;
    name: string;
    actions: ResourcePermissions[]
}

const RESOURCE_LIST: Resources[] = [
    {
        id: 1,
        slug: 'user',
        name: 'User Management',
        actions: []
    },
];

type RoleFormProps = {
    loading?: boolean;
    roleName?: string;
    selectedPermissions?: number[];
    handleClose: () => void;
    onValidSubmit: (params: { roleName: string, permissions: number[] }) => any;
}

export const RoleForm = ({ loading = false, roleName = '', selectedPermissions = [], handleClose, onValidSubmit }: RoleFormProps) => {
    const [waiting, setWaiting] = useState(loading);
    const [permissions, setPermissions] = useState(selectedPermissions);
    const [selectAll, setSelectAll] = useState(false);
    const wrap = useRef<HTMLDivElement | null>(null);
    const [resources, setResources] = useState<Resources[]>(RESOURCE_LIST);

    const validationSchema = Yup.object().shape({
        roleName: Yup.string()
            .required('Role name is required')
            .max(25, 'Role name should not exceeds 25 character'),
        permissions: Yup.array().min(1)
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    const fetchResourcePermissions = async () => {
        setWaiting(true);
        const resourcePromiseArray: Promise<ResourcePermissions[]>[] = [];
        resources.forEach(r => resourcePromiseArray.push(permissionService.getPermissionsOfSpecificResource(r.slug)));

        const resourcePermissions = await Promise.all(resourcePromiseArray);

        setResources(resources.map((r, index) => ({ ...r, actions: resourcePermissions[index] })));
        setWaiting(false);
    }

    useEffect(() => {
        fetchResourcePermissions();
    }, []);

    useEffect(() => {
        if (wrap.current) {
            const checkboxes: NodeListOf<HTMLInputElement> = wrap.current.querySelectorAll('input[type="checkbox"]');
            selectAll ? checkboxes.forEach(c => c.checked = true) : checkboxes.forEach(c => c.checked = false);
        }
    }, [selectAll]);

    const selectAllPermissions = (selected: boolean) => {
        if (selected) {
            setPermissions(resources.flatMap((resource) => resource.actions.map((action) => action.id)));
            setSelectAll(true);
        } else {
            console.log('permission  a gya=> ', permissions)
            permissions.splice(0);
            setPermissions(permissions);
            setSelectAll(false);
            console.log('permission update ho gya gya=> ', permissions)
        }
    }

    const updatePermissions = (permissionId: number, selected: boolean) => {
        if (selected) {
            console.log('permission  a gya=> ', permissions)
            permissions.push(permissionId);
            setPermissions(permissions);
            console.log('permission update ho gya gya=> ', permissions)
        } else {
            permissions.splice(permissions.indexOf(permissionId), 1);
            setPermissions(permissions);
        }

        const totalPermissionCount = resources.flatMap((resource) => resource.actions.map((action) => action.id)).length;

        console.log(totalPermissionCount, permissions.length);
        if (permissions.length === totalPermissionCount)
            setSelectAll(true);
        else
            setSelectAll(false);
    }

    const onSubmit = (data: FieldValues) => {
        onValidSubmit && onValidSubmit({ roleName: data.roleName, permissions: permissions });

    }

    const RenderPermissionsList = (): JSX.Element => {
        if (loading || waiting)
            return <Loader />
        else
            return <>
                <div className={styles.permission}>
                    <span className={styles.label}>Administrator Access</span>
                    <CheckboxGroup>
                        <Checkbox>
                            <input
                                type='checkbox'
                                id="select-all"
                                checked={selectAll}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => selectAllPermissions(e.target.checked)}
                            />
                        </Checkbox>
                        <label htmlFor="select-all">Select all</label>
                    </CheckboxGroup>
                </div>
                {
                    resources.map((resource) => (
                        <div key={resource.id} className={styles.permission}>
                            <span className={styles.label}>{resource.name}</span>
                            {resource.actions?.map((action, aIndex) => (
                                <React.Fragment key={`${resource.id}-${action.id}`}>
                                    {aIndex === 0 || aIndex % 3 !== 0 ? <></> : <span style={{ visibility: 'hidden' }}></span>}
                                    <CheckboxGroup>
                                        <Checkbox>
                                            <input
                                                {...register('permissions')}
                                                name='permissions'
                                                defaultChecked={permissions.includes(action.id)}
                                                value={action.id}
                                                type='checkbox'
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatePermissions(action.id, e.target.checked)}
                                            />
                                        </Checkbox>
                                        <label htmlFor={String(action.id)}>{action.slug.split('.')[1]}</label>
                                    </CheckboxGroup>
                                </React.Fragment>
                            ))}
                        </div>
                    ))
                }
            </>
    }

    return (
        <div ref={wrap} className={styles.wrap}>
            <Form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
            >
                <InputGroup label='Role name' required>
                    <Form.Control
                        {...register('roleName')}
                        type='text'
                        disabled={loading || waiting}
                        placeholder='Role name'
                        defaultValue={roleName}
                        isInvalid={Boolean(errors?.roleName)}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.roleName?.message?.toString()}</Form.Control.Feedback>
                </InputGroup>

                <InputGroup label='Role permissions'>
                    <div className={styles.list}>
                        <RenderPermissionsList />
                    </div>
                    {permissions.length < 1 && <p style={{ display: 'block' }} className='invalid-feedback'>Please select atleast one permission</p>}

                </InputGroup>
                <div className={styles.actions}>
                    <button
                        disabled={loading || waiting}
                        className="btn__transparent"
                        onClick={handleClose}
                        type='button'
                    >
                        Discard
                    </button>
                    <button
                        disabled={loading || waiting}
                        className="btn__primary"
                        type={'submit'}
                    >
                        Submit
                    </button>
                </div>

            </Form>
        </div>
    );
};

