import { Table } from 'components/Table'

const col = [
  {
    name: 'Begin Date',
    field: 'tax_period_begin_date'
  },
  {
    name: 'End Date',
    field: 'tax_period_end_date'
  },
  {
    name: "Awards Granted",
    field: 'count_of_awards'
  }
];


export const Filings = (props) => {
  const filings =
    props.data
      .map((filing) => new Map(Object.entries(filing)))
      .map((filing) => filing.set('count_of_awards', filing.get('awards').length));

  const body = filings.map((filing, idx) => {
    return (
      <tr key={idx}>
        <td> {filing.get('tax_period_begin_date')} </td>
        <td> {filing.get('tax_period_end_date')} </td>
        <td> {filing.get('count_of_awards')} </td>
      </tr>
    );
  });

  return <Table col={col} body={body} />;
};
