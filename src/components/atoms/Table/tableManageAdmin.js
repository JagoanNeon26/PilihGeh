/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'react-bootstrap';
import ModalDeleteEmail from 'components/molecules/Modal/modalDeleteEmail';
import styles from './table.module.css';

function TableManageAdmin() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("https://api.example.com/data").then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  const [modalShow, setModalShow] = useState(false);
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const [data, setData] = useState([
    {
      name: 'Jonh Doe',
      invitationStatus: 'YES',
      email: 'johndoe@gmail.com',
    },
    {
      name: 'Jonh Doe',
      invitationStatus: 'NO',
      email: 'johndoe@gmail.com',
    },
    {
      name: 'Jonh Doe',
      invitationStatus: 'YES',
      email: 'johndoe@gmail.com',
    },
  ]);

  const invitationStatusToLogo = (invitationStatus) => {
    if (invitationStatus === 'YES') {
      return <FontAwesomeIcon icon={faCheck} />;
    }
    if (invitationStatus === 'NO') {
      return <FontAwesomeIcon icon={faTimes} />;
    }
    return invitationStatus;
  };

  return (
    <>
      <Table responsive>
        <thead className={styles.tableHead}>
          <tr style={{ verticalAlign: 'middle' }}>
            <th>VOTERS NAME</th>
            <th>INVITATION STATUS</th>
            <th>EMAIL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data.map((item) => (
            <tr key={item.id} style={{ verticalAlign: 'middle' }}>
              <td
                style={{
                  width: '25vw',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </td>
              <td style={{ width: '25vw' }}>
                {invitationStatusToLogo(item.invitationStatus)}
              </td>
              <td style={{ width: '25vw' }}>{item.email}</td>
              <td style={{ width: '25vw' }}>
                <button
                  type="button"
                  onClick={handleShow}
                  className={styles.buttonDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalDeleteEmail show={modalShow} onHide={() => handleClose()} />
    </>
  );
}

export default TableManageAdmin;
