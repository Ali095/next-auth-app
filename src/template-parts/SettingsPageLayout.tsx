
import { ReactNode } from 'react';
import MenuItem from '../components/MenuItem/MenuItem';
import Content from './Layout/Content';
import Header from './Admin/Header/Header';
import Layout from './Layout/Layout';
import Main from './Layout/Main';
import Sidebar from './Layout/Sidebar';

type SettingsPageLayoutProps = {
    children: ReactNode
}

const SettingsPageLayout = ({ children }: SettingsPageLayoutProps) => {
    return (
        <Layout>
            <Sidebar>
                <ul className="sidebar__menu">
                    <MenuItem icon='profile' title='My Profile' href='/settings/james/profile' />
                    <MenuItem icon='notification' title='Email Notification' href='/settings/james/notification' />
                    <MenuItem icon='advanced' title='Advanced' href='/settings/james/advanced' />
                    <MenuItem icon='billing' title='Billing and Usage' href='/settings/james/billing' />
                </ul>
            </Sidebar>

            <Main>
                <Header />
                <Content>
                    {children}
                </Content>
            </Main>
        </Layout>
    )
}

export default SettingsPageLayout;
