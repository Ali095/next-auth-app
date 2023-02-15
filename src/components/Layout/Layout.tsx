import React, { ReactNode } from 'react';
import { Header } from '../Header';
import { Content, Main, Section, Sidebar, SidebarNavigation } from './';
import styles from './styles/layout.module.scss';

export const Layout = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <div className={styles.wrap} {...props}>
            <Sidebar> <SidebarNavigation /> </Sidebar>

            <Main>
                <Header />

                <Content>
                    {children}
                </Content>
            </Main>

        </div>
    )
}
