import { useRouter } from 'next/router'

import { Table } from 'components/Table';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const columns = [
  {
    text: 'Recipient',
    dataField: 'recipient_name'
  },
  {
    text: 'Purpose',
    dataField: 'purpose'
  },
  {
    text: 'Amount',
    dataField: 'amount',
    formatter: (cell, row) => currencyFormatter.format(cell),
    sort: true,
  }
];

const Filing = (props) => {
  const filerName = props.org_data.name_line_1

  const router = useRouter();

  const onClick = (e, row, rowIndex) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: row.receiver_id }
    })
  }


  return (
    <div className="container">
      <div className="row">
        {filerName}
        <Table
          keyField="id"
          data={props.filing_data.awards}
          columns={columns}
          rowEvents={{ onClick: onClick }}
        />
        {props.filing_data.length}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;

  const filing = fetch(`https://localhost:4001/api/filings/${id}`).then((filing) => filing.json());
  const filing_data = await filing;

  const org = fetch(`https://localhost:4001/api/organizations/${filing_data.filer_id}`).then((org) => org.json());
  const org_data = await org;

  if (!org_data) {
    return {
      notFound: true
    }
  }

  return {
    props: { org_data, filing_data }
  }
};

export default Filing
