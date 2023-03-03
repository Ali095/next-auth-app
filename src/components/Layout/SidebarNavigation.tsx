
import React from 'react';
import { MenuItem } from '../MenuItem';

export const SidebarNavigation = ({ variant = 'home' }: { variant?: 'settings' | 'home' }) => {
    return (<>
        {variant === 'home' &&
            <ul className="sidebar__menu">
                <MenuItem icon='dashboard' title='Dashboard' href='/' />
                <MenuItem icon='users' title='Users' href='/users' />
                <MenuItem icon='help' title='Subscriptions' href='/subscription/list' />
                <MenuItem icon='store' title='Invoices' href='/invoices' />
            </ul>
        }
        {variant === 'settings' &&
            <ul className="sidebar__menu">
                <MenuItem icon='profile' title='My Profile' href='/settings/profile' />
                <MenuItem icon='notification' title='Email Notification' href='/settings/notification' />
                <MenuItem icon='advanced' title='Advanced' href='/settings/advanced' />
                <MenuItem icon='billing' title='Billing and Usage' href='/settings/billing' />
            </ul>

        }
    </>);
}

