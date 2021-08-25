import { Table } from 'components/Table'

const col = [
  {
    name: 'Amount',
    field: 'amount'
  },
  {
    name: 'Purpose',
    field: 'purpose'
  }
];

export const Awards = (props) => {
  const awards = props.data;

  const body = awards.map(({ amount, purpose }, idx) => {
    return (
      <tr key={idx}>
        <td> {amount} </td>
        <td> {purpose} </td>
      </tr>
    );
  });

  return <Table col={col} body={body} />;
};
