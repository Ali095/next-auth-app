
import Head from 'next/head';
import { useState } from 'react';
import { SelectOption } from '../../@types/typings';
import Avatar from '../../components/Settings/Avatar/Avatar';
import InputGroup from '../../components/InputGroup/InputGroup';
import Select from '../../components/Select/Select';
import { roleOptions, timeOptions } from '../../data/selectOptions';
import Section from '../../template-parts/Layout/Section/Section';
import SectionHeader from '../../template-parts/Layout/Section/SectionHeader';
import SectionTitle from '../../template-parts/Layout/Section/SectionTitle';
import Layout from '../../template-parts/Layout/Layout';
import Sidebar from '../../template-parts/Layout/Sidebar';
import Main from '../../template-parts/Layout/Main';
import Header from '../../template-parts/User/Header/Header';
import Content from '../../template-parts/Layout/Content';
import MenuItem from '../../components/MenuItem/MenuItem';
import ProfileInput from '../../components/Settings/Profile/ProfileInput/ProfileInput';
import { UseACL } from '../../components/AccessControl/ACL';

export default function Home() {
    const [role, setRole] = useState<SelectOption | undefined>(roleOptions[0]);
    const [timeZone, setTimeZone] = useState<SelectOption | undefined>(timeOptions[0]);
    const [email, setEmail] = useState('john@example.com');
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [company, setCompany] = useState('Papa Johns');

    return (
        <>
            <Head>
                <title>User Profile</title>
                <meta name="description" content="User Profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Sidebar>
                    <ul className="sidebar__menu">
                        <MenuItem icon='profile' title='My Profile' href='/settings/profile' />
                    </ul>
                </Sidebar>

                <Main>
                    <Header />

                    <Content>
                        <Section>
                            <SectionHeader>
                                <SectionTitle>My Profile</SectionTitle>
                            </SectionHeader>

                            <div className="form" style={{ maxWidth: '800px' }}>
                                <Avatar />

                                <InputGroup label='Email' required>
                                    <ProfileInput
                                        value={email}
                                        variant='email'
                                    />
                                </InputGroup>

                                <InputGroup label='Password' required>
                                    <ProfileInput
                                        value='••••••••'
                                        variant='password'
                                    />
                                </InputGroup>

                                <InputGroup label='First Name' required>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </InputGroup>

                                <InputGroup label='Last Name'>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </InputGroup>

                                <InputGroup label='Company'>
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </InputGroup>

                                <UseACL  permissions={["update.user.role"]}>
                                    <InputGroup label='Role'>
                                        <Select
                                            value={role}
                                            options={roleOptions}
                                            onChange={o => setRole(o)}
                                            style={{ maxWidth: '100%' }}
                                        />
                                    </InputGroup>
                                </UseACL>

                                <InputGroup label='Timezone'>
                                    <Select
                                        value={timeZone}
                                        options={timeOptions}
                                        onChange={o => setTimeZone(o)}
                                        style={{ maxWidth: '100%' }}
                                    />
                                    <small>Used when we handle time with no explicit timezone.</small>
                                </InputGroup>

                                <button
                                    className='btn__primary'
                                    style={{ maxWidth: 'max-content', marginTop: '24px' }}
                                >
                                    Save Changes</button>
                            </div>
                        </Section>
                    </Content>
                </Main>
            </Layout>
        </>
    );
}
