
import { Layout, Section } from '../../components/Layout';
import { Widget, WidgetBody, WidgetHeader, WidgetTitle } from '../../components/Widget';


export const HomeModule = () => {

    return (
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
    );
}
