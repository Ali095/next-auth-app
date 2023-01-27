
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import styles from './table.module.scss';

const RecipeTable = () => {
    return (
        <div className={styles.container}>
            <Table >
                <Thead>
                    <Tr>
                        <Th>Title</Th>
                        <Th>Desc</Th>
                        <Th>Content</Th>
                        <Th>Badge</Th>
                        <Th>Article</Th>
                        <Th>Images</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>Lorem ipsum dolor sit.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda est praesentium repellendus explicabo ut, tempora culpa exercitationem rem molestiae at.</Td>
                        <Td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse repellendus cum eveniet iure fuga architecto doloremque.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus fuga perspiciatis rem, suscipit fugit in beatae eius accusantium provident vitae, consequatur harum architecto omnis odit sed esse mollitia totam aliquam.</Td>
                    </Tr>
                    <Tr>
                        <Td>Lorem ipsum dolor sit.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda est praesentium repellendus explicabo ut, tempora culpa exercitationem rem molestiae at.</Td>
                        <Td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse repellendus cum eveniet iure fuga architecto doloremque.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus fuga perspiciatis rem, suscipit fugit in beatae eius accusantium provident vitae, consequatur harum architecto omnis odit sed esse mollitia totam aliquam.</Td>
                    </Tr>
                    <Tr>
                        <Td>Lorem ipsum dolor sit.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda est praesentium repellendus explicabo ut, tempora culpa exercitationem rem molestiae at.</Td>
                        <Td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse repellendus cum eveniet iure fuga architecto doloremque.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus fuga perspiciatis rem, suscipit fugit in beatae eius accusantium provident vitae, consequatur harum architecto omnis odit sed esse mollitia totam aliquam.</Td>
                    </Tr>
                    <Tr>
                        <Td>Lorem ipsum dolor sit.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda est praesentium repellendus explicabo ut, tempora culpa exercitationem rem molestiae at.</Td>
                        <Td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse repellendus cum eveniet iure fuga architecto doloremque.</Td>
                        <Td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci, fuga?</Td>
                        <Td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus fuga perspiciatis rem, suscipit fugit in beatae eius accusantium provident vitae, consequatur harum architecto omnis odit sed esse mollitia totam aliquam.</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
};

export default RecipeTable;
