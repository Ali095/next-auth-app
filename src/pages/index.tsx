
import Head from 'next/head';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});
// import Chart from 'react-apexcharts';
import Content from '../template-parts/Layout/Content';
import Header from '../template-parts/Admin/Header/Header';
import Layout from '../template-parts/Layout/Layout';
import Main from '../template-parts/Layout/Main';
import Section from '../template-parts/Layout/Section/Section';
import Sidebar from '../template-parts/Layout/Sidebar';
import SidebarNavigation from '../template-parts/Admin/SidebarNavigation';
import Widget from '../components/Widget/Widget';
import WidgetHeader from '../components/Widget/WidgetHeader/WidgetHeader';
import WidgetTitle from '../components/Widget/WidgetTitle/WidgetTitle';
import WidgetBody from '../components/Widget/Body/WidgetBody';


export default function Home() {
    const [options, setOptions] = useState({
        chart: {
            height: 300,
            toolbar: {
                show: false
            },
        },
        color: ['#066ac9'],
        dataLabels: {
            enabled: true
        },
        zoom: {
            enabled: false
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct ', 'Nov', 'Dec'],
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
        },
        yaxis: [{
            axisTicks: {
                show: false
            },
            axisBorder: {
                show: false
            },
        }],
        tooltip: {
            y: {
                title: {
                    formatter: function () {
                        return '' + 'Requests:';
                    }
                }
            },
            marker: {
                show: !1
            }
        }
    });

    const [series, setSeries] = useState([{
        name: 'Payout',
        data: [2909, 1259, 950, 1563, 1825, 2526, 2010, 3260, 3005, 3860, 4039]
    }]);

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
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="line"
                                        height={500}
                                        width='100%'
                                    />
                                </WidgetBody>

                            </Widget>

                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
