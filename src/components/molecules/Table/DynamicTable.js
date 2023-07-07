import React from 'react';
import Table from '../../atoms/Table/table';
import TableHeader from '../../atoms/Table/tableHeader';
import TableBody from '../../atoms/Table/tableBody';

function DynamicTable({ headers, data }) {
  const VOTE_STATUS_INDEX = 'YES'; // Replace with the actual index of the vote status column

  return (
    <Table>
      <TableHeader headers={headers} />
      <TableBody data={data} voteStatusIndex={VOTE_STATUS_INDEX} />
    </Table>
  );
}

export default DynamicTable;
