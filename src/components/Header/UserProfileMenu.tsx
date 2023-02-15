import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/usermenu.module.scss';
import { Icon } from '../Icons';
import { authService } from '../../modules/authentication';



export const UserProfileMenu = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const container = useRef<HTMLDivElement>(null);

    function handleClickedOutside(e: Event) {
        container.current && !container.current.contains(e.target as HTMLElement) && setOpenMenu(false);
    }

    useEffect(() => {
        document.addEventListener('click', handleClickedOutside, true);

        return () => {
            document.removeEventListener('click', handleClickedOutside, true);
        }
    }, []);

    return (
        <div
            tabIndex={0}
            className={styles.menu}
            ref={container}
        >
            <button
                className={styles.btn}
                onClick={() => { setOpenMenu(prev => !prev) }}
            >
                <Image src='/images/avatar.svg' width="40" height="40" alt="avatar" />
            </button>

            {
                openMenu && <ul className={styles.list}>
                    <li>
                        <Link href="/settings/profile" >
                            <Icon name='settings' />
                            <span>Settings</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/roles" >
                            <Icon name='roles' />
                            <span>Roles</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/prices" >
                            <Icon name='prices' />
                            <span>Prices</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/user/team" >
                            <Icon name='team' />
                            <span>Team</span>
                        </Link>
                    </li>

                    <li onClick={() => authService.signout()}>
                        <Link href='/signin'>
                            <Icon name='logout' />
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            }
        </div>
    )
}
