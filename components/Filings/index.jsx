import { useRouter } from 'next/router'
import { Table } from 'components/Table'

const columns = [
  {
    text: 'Begin Date',
    dataField: 'tax_period_begin_date'
  },
  {
    text: 'End Date',
    dataField: 'tax_period_end_date'
  },
  {
    text: "Awards Granted",
    dataField: 'count_of_awards'
  }
];

export const Filings = (props) => {
  const router = useRouter();

  const onClick = (e, row, rowIndex) => {
    router.push({
      pathname: '/filings/[id]',
      query: { id: row.id }
    })
  };

  return <Table
    keyField="id"
    data={props.data}
    columns={columns}
    rowEvents={{onClick: onClick}}
  />;
};
