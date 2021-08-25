import { useRouter } from 'next/router'
import { Table } from 'components/Table'

const columns = [
  {
    text: 'Filer Name',
    dataField: 'filer_name',
  },
  {
    text: 'Amount',
    dataField: 'formatted_amount'
  },
  {
    text: 'Purpose',
    dataField: 'purpose'
  }
];

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const Awards = (props) => {
  props.data.forEach((award) => Object.assign(award, { formatted_amount: currencyFormatter.format(award.amount) }))

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
