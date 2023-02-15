
import Head from 'next/head';
import { DashboardTiles } from '../../components/Tiles';
import UsersTable from '../../components/Users/UsersTable';
import { Layout, Section, SectionHeader, SectionTitle } from '../../components/Layout';


export const UsersModule = () => {
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
	]

	return (
		<>
			<Head>
				<title>Dashboard</title>
				<meta name="description" content="dashboard" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Section>
					<SectionHeader>
						<SectionTitle>Users</SectionTitle>
					</SectionHeader>

					<DashboardTiles data={data} />
					<UsersTable />
				</Section>
			</Layout>
		</>
	)
}
