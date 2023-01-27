
import Head from 'next/head';
import SubscriptionTable from '../../components/Subscription/SubscriptionTable/SubscriptionTable';
import DashboardCards from '../../components/Users/DashboardCards/DashboardCards';
import Content from '../../template-parts/Layout/Content';
import Header from '../../template-parts/Admin/Header/Header';
import Layout from '../../template-parts/Layout/Layout';
import Main from '../../template-parts/Layout/Main';
import Section from '../../template-parts/Layout/Section/Section';
import SectionHeader from '../../template-parts/Layout/Section/SectionHeader';
import SectionTitle from '../../template-parts/Layout/Section/SectionTitle';
import Sidebar from '../../template-parts/Layout/Sidebar';
import SidebarNavigation from '../../template-parts/Admin/SidebarNavigation';

export default function Lists() {
    const data = [
        {
            label: 'Subscriptions',
            count: 1201,
            percentage: 29,
            infoText: 'Total subscriptions',
        },
        {
            label: 'New Customers',
            count: 412,
            percentage: 12,
            infoText: 'New Customers',
        },
        {
            label: 'Revenue',
            currency: '$325K+',
            percentage: 8,
            infoText: 'Revenue',
        },
        {
            label: 'Average Daily Sales',
            currency: '$10K+',
            percentage: 16,
            infoText: 'Average daily sales',
        },

    ];
    return (
        <>
            <Head>
                <title>Subscriptions | List</title>
                <meta name="description" content="subscriptions list" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Sidebar><SidebarNavigation /></Sidebar>
                <Main>
                    <Header />
                    <Content>
                        <Section>
                            <SectionHeader>
                                <SectionTitle>Subscription List</SectionTitle>
                            </SectionHeader>

                            <DashboardCards data={data} />
                            <SubscriptionTable />
                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
