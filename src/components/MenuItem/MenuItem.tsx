
import { Icon } from '../Icons';
import { NavLink } from './NavLink';

type MenuItemProps = {
    title: string,
    href: string,
    icon: string
}

export const MenuItem = ({ title, href, icon }: MenuItemProps) => {
    return (
        <li className="sidebar__menu-item">
            <NavLink href={href}>
                <span className='sidebar__menu-link'>
                    <Icon name={icon} />
                    <span className="text">{title}</span>
                </span>
            </NavLink>
        </li>
    );
};

