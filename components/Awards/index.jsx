import { useRouter } from 'next/router'
import { Table } from 'components/Table'

const col = [
  {
    name: 'Filer Name',
    field: 'filer_name',
  },
  {
    name: 'Amount',
    field: 'amount'
  },
  {
    name: 'Purpose',
    field: 'purpose'
  }
];

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const Awards = (props) => {
  const awards =
    props.data
      .map((award) => new Map(Object.entries(award)))
      .map((award) => award.set('amount', currencyFormatter.format(award.get('amount'))));

  const router = useRouter();

  const handleClick = (id) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: id }
    });
  }

  const body = awards.map((award, idx) => {
    return (
      <tr key={idx} onClick={() => handleClick(award.get('filer_id'))}>
        <td> {award.get('filer_name')} </td>
        <td> {award.get('amount')} </td>
        <td> {award.get('purpose')} </td>
      </tr>
    );
  });

  return <Table col={col} body={body} />;
};
