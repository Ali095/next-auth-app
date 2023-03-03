import React, { ReactNode } from 'react';
import { Header } from '../Header';
import { Content, Main, Sidebar, SidebarNavigation } from './';
import styles from './styles/layout.module.scss';

export const Layout = ({ children, screen = 'home', ...props }: { children: ReactNode, screen?: 'settings' | 'home' }) => {
    return (
        <div className={styles.wrap} {...props}>
            <Sidebar> <SidebarNavigation variant={screen} /> </Sidebar>

            <Main>
                <Header />

                <Content>
                    {children}
                </Content>
            </Main>

        </div>
    )
}
