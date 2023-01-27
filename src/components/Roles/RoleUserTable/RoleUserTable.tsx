
import React from 'react';
import Actions from '../../Actions/Actions';
import Checkbox from '../../Checkbox/Checkbox';
import Profile from '../../Table/Profile/Profile';
import { users } from '../../../data/users';


const RoleUserTable = () => {
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
                                <Profile avatar={user.avatar} name={user.name} />
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

export default RoleUserTable;
