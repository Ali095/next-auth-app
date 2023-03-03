
import { useEffect, useState } from 'react';
import { Layout, Section, SectionHeader, SectionTitle } from '../../components/Layout';
import { RolesAPIResponse } from './@types';
import roleService from './roles.service';
import { AddRoleButton } from './widgets/AddRoleButton';
import { Card } from './widgets/Card';

export const RolesModule = () => {
	const [roles, setRoles] = useState<RolesAPIResponse[]>([]);
	const [waiting, setWaiting] = useState(false);

	const fetchRoles = async () => {
		setWaiting(true);
		const rolesData = await roleService.getAllRoles({ limit: 20 });
		setRoles(rolesData.payload);
		setWaiting(false);
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	const handleRoleUpdate = async ({ id, roleName, permissions: updatedPermissions }: { id: number, roleName: string, permissions: number[] }) => {
		setWaiting(true);
		await roleService.updateRole(id, { name: roleName, permissions: updatedPermissions });
		await fetchRoles();
		setWaiting(false);
	}

	return (
		<Layout>
			<Section>
				<SectionHeader>
					<SectionTitle>Roles</SectionTitle>
				</SectionHeader>

				<div className="cards">
					{roles.map((role, idx) => (
						<Card
							key={idx}
							roleData={{ ...role }}
							onRoleUpdate={handleRoleUpdate}
							loading={waiting}
							refreshData={fetchRoles}
						/>)
					)}
					<AddRoleButton onSuccess={fetchRoles} />
				</div>
			</Section>
		</Layout>
	);
}
