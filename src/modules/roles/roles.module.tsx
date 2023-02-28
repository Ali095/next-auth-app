
import { useEffect, useState } from 'react';
import { Layout, Section, SectionHeader, SectionTitle } from '../../components/Layout';
import { RolesAPIResponse } from './@types';
import roleService from './roles.service';
import { AddRoleButton } from './widgets/AddRoleButton';
import { Card } from './widgets/Card';

export const RolesModule = () => {
	const [roles, setRoles] = useState<RolesAPIResponse[]>([]);

	const fetchRoles = async () => {
		const rolesData = await roleService.getAllRoles({ limit: 20 });
		setRoles(rolesData.payload);
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	return (
		<Layout>
			<Section>
				<SectionHeader>
					<SectionTitle>Roles</SectionTitle>
				</SectionHeader>

				<div className="cards">
					{roles.map((role, idx) => <Card key={idx} {...role} />)}
					<AddRoleButton onSuccess={fetchRoles} />
				</div>
			</Section>
		</Layout>
	);
}
