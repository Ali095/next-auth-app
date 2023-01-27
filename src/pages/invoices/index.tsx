
import Head from 'next/head';
import DashboardCards from '../../components/Users/DashboardCards/DashboardCards';
import UsersTable from '../../components/Users/UsersTable';
import Header from '../../template-parts/Admin/Header/Header';
import SidebarNavigation from '../../template-parts/Admin/SidebarNavigation';
import Content from '../../template-parts/Layout/Content';
import Layout from '../../template-parts/Layout/Layout';
import Main from '../../template-parts/Layout/Main';
import Section from '../../template-parts/Layout/Section/Section';
import SectionHeader from '../../template-parts/Layout/Section/SectionHeader';
import SectionTitle from '../../template-parts/Layout/Section/SectionTitle';
import Sidebar from '../../template-parts/Layout/Sidebar';

export default function Users() {
    const data = [
        {
            label: 'Session',
            count: 21459,
            percentage: 29,
            infoText: 'Total Users',
        },
        {
            label: 'Paid Users',
            count: 4567,
            percentage: 18,
            infoText: 'Last week analytics',
        },
        {
            label: 'Active Users',
            count: 19860,
            percentage: -14,
            infoText: 'Last week analytics',
        },
        {
            label: 'Pending Users',
            count: 237,
            percentage: 42,
            infoText: 'Last week analytics',
        },
    ];

    return (
        <>
            <Head>
                <title>Admin | Invoices</title>
                <meta name="description" content="dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Sidebar><SidebarNavigation /></Sidebar>
                <Main>
                    <Header />
                    <Content>
                        <Section>
                            <SectionHeader>
                                <SectionTitle>Admin - Invoices</SectionTitle>
                            </SectionHeader>

                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
