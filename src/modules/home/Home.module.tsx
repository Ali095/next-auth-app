
import Head from 'next/head';
import { Content, Layout, Main, Section, Sidebar, SidebarNavigation } from '../../components/Layout';
import { Widget, WidgetBody, WidgetHeader, WidgetTitle } from '../../components/Widget';
import { Header } from '../../components/Header';


export function HomeModule() {

    return (
        <>
            <Head>
                <title>Dashboard | Admin</title>
                <meta name="description" content="dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Sidebar>
                    <SidebarNavigation />
                </Sidebar>

                <Main>
                    <Header />

                    <Content>
                        <Section>
                            <Widget>
                                <WidgetHeader>
                                    <WidgetTitle variant='h2'> Request Monitor</WidgetTitle>
                                </WidgetHeader>

                                <WidgetBody>
                                    We will implement chart here
                                </WidgetBody>

                            </Widget>

                        </Section>
                        <Section>
                            <Widget>
                                <WidgetHeader>
                                    <WidgetTitle variant='h2'> Request Monitor 2</WidgetTitle>
                                </WidgetHeader>

                                <WidgetBody>
                                    We will implement chart here
                                </WidgetBody>

                            </Widget>

                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
