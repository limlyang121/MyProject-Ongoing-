// @flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../Navbar/AppNavbar';
import { getMyPapers, deletePapers, downloadPapers } from './Axios';


function PaperList() {

    const [myPapers, setPapers] = React.useState([])

    const myID = sessionStorage.getItem("id")

    React.useEffect(() => {
        const fetchData = async () => {
            let response = await getMyPapers(myID)
            setPapers(response)
        }

        fetchData();

    }, [])

    const downloadFile = async (id) => {
        let response = await downloadPapers(parseInt(id) )
        alert (response.name)
    }

    const remove = async (id) => {
        if (window.confirm("Delete? ")) {
          await deletePapers(id)
            .then(() => {
              let updatedGroups = [...myPapers].filter(i => i.paperID !== id);
              setPapers(updatedGroups);
            });
        }
      }

    const myPapersData = myPapers.map(paper => {
        return (
            <tr key={paper.paperID}>
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.title}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.filename}  </td>
                <td style={{ whiteSpace: "nowrap" }} > {paper.paperInfo.upload}  </td>
                <td>
                    <ButtonGroup style={{gap : "10px"}}>
                        <Button size="sm" color="info" tag={Link} to={"#"}>Read</Button>
                        <Button size="sm" color="primary" tag={Link} to={"#"}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => remove("")}>Delete</Button>
                        <Button size="sm" color="primary" onClick={async () => await downloadFile(paper.paperID)} >Download</Button>

                    </ButtonGroup>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <AppNavbar />
            <Container fluid>
                <div className='float-end'>
                    <Button color='success' tag={Link} to="#">Add Paper</Button>
                </div>

                <h3>My Papers</h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th>Paper Title </th>
                            <th>Paper filename </th>
                            <th>Upload At </th>
                            <th colSpan={4}>Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {myPapersData}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default PaperList;