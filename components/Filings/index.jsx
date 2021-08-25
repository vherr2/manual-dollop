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
  props.data.forEach((filing) => Object.assign(filing, { count_of_awards: filing.awards.length }))

  return <Table
    keyField="id"
    data={props.data}
    columns={columns}
  />;
};
