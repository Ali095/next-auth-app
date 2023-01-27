
import Head from 'next/head';
import Card from '../../components/Subscription/Card/Card';
import Content from '../../template-parts/Layout/Content';
import Header from '../../template-parts/Admin/Header/Header';
import Layout from '../../template-parts/Layout/Layout';
import Main from '../../template-parts/Layout/Main';
import Section from '../../template-parts/Layout/Section/Section';
import SectionHeader from '../../template-parts/Layout/Section/SectionHeader';
import SectionTitle from '../../template-parts/Layout/Section/SectionTitle';
import Sidebar from '../../template-parts/Layout/Sidebar';
import SidebarNavigation from '../../template-parts/Admin/SidebarNavigation';

export default function Users() {
    const subscriptionPlans = [
        {
            label: 'Basic',
            plan: 'Monthly Price',
            price: 0.00,
            duration: '3 Months',
            features: [
                'One listing submission',
                '3 Months expiration',
            ]
        },
        {
            label: 'Standard',
            plan: 'Monthly Price',
            price: 50.00,
            duration: '6 Months',
            features: [
                'One listing submission',
                '6 Months expiration',
            ]
        },
        {
            label: 'Enterprise',
            plan: 'Monthly Price',
            price: 1200.00,
            duration: 'One Year',
            features: [
                'One listing submission',
                'One Year expiration',
            ]
        },
        {
            label: 'Gold',
            plan: 'Monthly Price',
            price: 2000.00,
            duration: '2 Year',
            features: [
                'One listing submission',
                'Two Year expiration',
            ]
        },
    ];

    return (
        <>
            <Head>
                <title>Dashboard</title>
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
                                <SectionTitle>Subscription</SectionTitle>
                            </SectionHeader>

                            <div className="cards">
                                {
                                    subscriptionPlans.map((plan, idx) => (
                                        <Card data={plan} key={idx} />
                                    ))
                                }
                            </div>
                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
