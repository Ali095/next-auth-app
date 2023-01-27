
import Head from 'next/head';
import { roles } from '../../data/roles';
import AddRoleButton from '../../components/Roles/AddRoleButton';
import Card from '../../components/Roles/Card/Card';
import Content from '../../template-parts/Layout/Content';
import Header from '../../template-parts/Admin/Header/Header';
import Layout from '../../template-parts/Layout/Layout';
import Main from '../../template-parts/Layout/Main';
import Section from '../../template-parts/Layout/Section/Section';
import SectionHeader from '../../template-parts/Layout/Section/SectionHeader';
import SectionTitle from '../../template-parts/Layout/Section/SectionTitle';
import Sidebar from '../../template-parts/Layout/Sidebar';
import SidebarNavigation from '../../template-parts/Admin/SidebarNavigation';

export default function Roles() {
    return (
        <>
            <Head>
                <title>Dashboard | Roles</title>
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
                                <SectionTitle>Roles</SectionTitle>
                            </SectionHeader>

                            <div className="cards">
                                {roles.map((role, idx) => <Card key={idx} data={role} />)}
                                <AddRoleButton />
                            </div>
                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
