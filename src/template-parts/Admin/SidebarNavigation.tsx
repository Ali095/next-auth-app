
import React from 'react';
import MenuItem from '../../components/MenuItem/MenuItem';

const SidebarNavigation = () => {
    return (
        <ul className="sidebar__menu">
            <MenuItem icon='dashboard' title='Dashboard' href='/' />
            <MenuItem icon='users' title='Users' href='/users' />
            <MenuItem icon='help' title='Subscriptions' href='/subscription/list' />
            <MenuItem icon='store' title='Invoices' href='/invoices' />
        </ul>
    )
}

export default SidebarNavigation;
