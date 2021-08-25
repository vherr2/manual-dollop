import { useRouter } from 'next/router'
import { Table } from 'components/Table'

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const columns = [
  {
    text: 'Filer Name',
    dataField: 'filer_name',
  },
  {
    text: 'Amount',
    dataField: 'amount',
    formatter: (cell, row) => currencyFormatter.format(cell),
    sort: true,
  },
  {
    text: 'Purpose',
    dataField: 'purpose'
  }
];


export const Awards = (props) => {
  const router = useRouter();

  const onClick = (e, row, rowIndex) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: row.filer_id }
    })
  }

  return (
    <Table
      keyField="id"
      data={props.data}
      columns={columns}
      rowEvents={{onClick: onClick}}
    />
  );
};
