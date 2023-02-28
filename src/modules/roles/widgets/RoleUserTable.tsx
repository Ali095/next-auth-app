
import React from 'react';
import { Actions } from '../../../components/ActionMenu';
import { Checkbox } from '../../../components/Checkbox';
import { UserProfile } from '../../../components/Table';

const users =
    [
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120002",
            "name": "John Smith",
            "avatar": "https://example.com/avatars/john_smith.png",
            "email": "john.smith@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120003",
            "name": "Jane Doe",
            "avatar": "https://example.com/avatars/jane_doe.png",
            "email": "jane.doe@example.com",
            "role": "editor",
            "plan": "Company",
            "billing": "Annual",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120004",
            "name": "Bob Johnson",
            "avatar": "https://example.com/avatars/bob_johnson.png",
            "email": "bob.johnson@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "inactive"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120005",
            "name": "Alice Williams",
            "avatar": "https://example.com/avatars/alice_williams.png",
            "email": "alice.williams@example.com",
            "role": "admin",
            "plan": "Team",
            "billing": "Yearly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120007",
            "name": "Sara Kim",
            "avatar": "https://example.com/avatars/sara_kim.png",
            "email": "sara.kim@example.com",
            "role": "editor",
            "plan": "Company",
            "billing": "Annual",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120008",
            "name": "David Lee",
            "avatar": "https://example.com/avatars/david_lee.png",
            "email": "david.lee@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "inactive"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120009",
            "name": "Emily Davis",
            "avatar": "https://example.com/avatars/emily_davis.png",
            "email": "emily.davis@example.com",
            "role": "admin",
            "plan": "Team",
            "billing": "Yearly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120010",
            "name": "William Thompson",
            "avatar": "https://example.com/avatars/william_thompson.png",
            "email": "william.thompson@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },

        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120012",
            "name": "Jessica Rodriguez",
            "avatar": "https://example.com/avatars/jessica_rodriguez.png",
            "email": "jessica.rodriguez@example.com",
            "role": "editor",
            "plan": "Company",
            "billing": "Annual",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120013",
            "name": "James Anderson",
            "avatar": "https://example.com/avatars/james_anderson.png",
            "email": "james.anderson@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "inactive"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120014",
            "name": "Emily Thompson",
            "avatar": "https://example.com/avatars/emily_thompson.png",
            "email": "emily.thompson@example.com",
            "role": "admin",
            "plan": "Team",
            "billing": "Yearly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        },
        {
            "id": "8f0d1240-b5c0-11eb-adc1-0242ac120015",
            "name": "Michael Davis",
            "avatar": "https://example.com/avatars/michael_davis.png",
            "email": "michael.davis@example.com",
            "role": "subscriber",
            "plan": "Basic",
            "billing": "Monthly",
            "signupDate": "2022-01-01T00:00:00Z",
            "lastLogin": "2022-01-01T12:00:00Z",
            "status": "active"
        }
    ]


export const RoleUserTable = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th><Checkbox /></th>
                    <th>ID</th>
                    <th>USER</th>
                    {/* <th>JOINED DATE</th> */}
                    <th>ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map((user, idx) => (
                        <tr key={idx}>
                            <td><Checkbox /></td>
                            <td>ID6489</td>
                            <td>
                                <UserProfile profilePicture={user.avatar} name={user.name} />
                            </td>
                            {/* <td>{user.signupDate}</td> */}
                            <td><Actions list={['View', 'Delete']} /></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};
