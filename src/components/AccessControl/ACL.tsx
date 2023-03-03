
import Router from 'next/router';
import { ReactNode } from 'react';
import { toast } from 'react-toastify';
import { AuthHelper, UserAuthData } from '../../common/auth';


export type ACLProps = {
    children: ReactNode
    requiredPermissions?: string[]
    requiredRoles?: string[]
    onlyMe?: boolean
    self?: boolean
    selfEligible?: boolean
}

export const UseACL = ({ children, requiredPermissions: permissions = [], requiredRoles: roles = [], selfEligible = true, self = true }: ACLProps) => {
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
        Router.push({ pathname: '/signin', query: { returnUrl: Router.asPath } });
    }

    let isUserHasAccess = false;
    if (self) // if user is accesing his own data and eligible for doing specific task
        isUserHasAccess = selfEligible ? true : false;
    else //Both needed to be true if not accessing self data. If no roles are provided it means component is open to user with any role and same to go with permissions
        if (userHasValidRoles() && userHasValidPermissions()) isUserHasAccess = true;


    console.log('ACl=> ', isUserHasAccess, (selfEligible && self), (permissions.length === 0 && roles.length === 0), userHasValidRoles(), userHasValidPermissions());
    return isUserHasAccess ? <>{children}</> : <></>;
};
