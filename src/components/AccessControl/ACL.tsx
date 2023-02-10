
import router from 'next/router';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { AuthHelper, UserAuthData } from '../../lib/AuthHelper';


export type ACLProps = {
    children: ReactNode
    permissions?: string[]
    roles?: string[]
    onlyMe?: boolean
}

export const UseACL = ({ children, permissions = [], roles = [] }: ACLProps) => {
    const userData: UserAuthData = AuthHelper.getLoggedInUserData();

    const userHasValidRoles = (): boolean => {
        if (roles.length === 0) return true;

        const userHaveRoles = userData && userData.user && userData.user.roles && userData.user.roles.length > 0;

        if (!userHaveRoles) return false;
        const userRoles = userData.user.roles;

        return userRoles.some((role) => roles?.includes(role))
    }

    const userHasValidPermissions = (): boolean => {
        if (permissions.length === 0) return true;

        const userHavePermissions = userData && userData.user && userData.user.permissions && userData.user.permissions.length > 0;

        if (!userHavePermissions) return false;

        const userPermissions = userData.user.permissions;

        return userPermissions.some((permission) => permissions?.includes(permission))
    }

    if (!userData) {
        toast.error("Can't found the authenticity of user. Please reconsider login");
        router.push({ pathname: '/signin', query: { returnUrl: router.asPath } });
    }

    const isUserHasAccess: boolean = (permissions.length === 0 && roles.length === 0) || userHasValidRoles() || userHasValidPermissions()

    return isUserHasAccess ? <>{children}</> : <></>;
};
