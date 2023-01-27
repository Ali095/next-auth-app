
import React from 'react'
import CreateBtn from '../../components/CreateBtn/CreateBtn'
import MenuItem from '../../components/MenuItem/MenuItem'
import PlanWidget from '../../components/PlanWidget/PlanWidget'

const SidebarNavigation = ({ collapsed = false }: { collapsed?: boolean }) => {
    return (
        <>
            <ul className="sidebar__menu">
                <CreateBtn href='/user/recipes/create' />
                <MenuItem icon='dashboard' title='Dashboard' href='/user' />
                <MenuItem icon='store' title='Recipes store' href='/user/store' />
                <MenuItem icon='recipes' title='My Recipes' href='/user/recipes' />
                <MenuItem icon='help' title='Get Help' href='/user/help' />
            </ul>

            <PlanWidget collapsed={collapsed} />
        </>

    )
}

export default SidebarNavigation