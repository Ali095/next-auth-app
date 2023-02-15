
import Head from 'next/head';
import { Layout, Section } from '../../components/Layout';
import { Widget, WidgetBody, WidgetHeader, WidgetTitle } from '../../components/Widget';


export const HomeModule = () => {

    return (
        <>
            <Head>
                <title>Dashboard | Admin</title>
                <meta name="description" content="dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
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
            </Layout>
        </>
    );
}
