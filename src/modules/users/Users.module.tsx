
import { DashboardTiles } from '../../components/Tiles';
import { Layout, Section, SectionHeader, SectionTitle } from '../../components/Layout';
import { UsersList } from './widgets/UsersList';


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
		<Layout>
			<Section>
				<SectionHeader>
					<SectionTitle>Users</SectionTitle>
				</SectionHeader>

				<DashboardTiles data={data} />
				<UsersList />
			</Section>
		</Layout>
	)
}
