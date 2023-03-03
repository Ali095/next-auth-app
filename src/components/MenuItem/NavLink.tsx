import React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

export interface NavLinkProps extends LinkProps {
    children: React.ReactElement
}

export const NavLink = ({ children, href, ...props }: NavLinkProps) => {
    const router = useRouter();
    const path = router.pathname;
    const activeItem = path.split('/')[path.split('/').length - 1] === href.toString().split('/')[href.toString().split('/').length - 1];

    return (
        <Link href={href} {...props}>
            {activeItem ? React.cloneElement(children, { 'data-active': true }) : children}
        </Link>
    );
}
