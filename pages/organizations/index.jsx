import { useRouter } from 'next/router'
import { Table } from 'components/Table'
import { useCallback, useState } from 'react';

import debounce from 'lodash.debounce';

const baseUrl = 'https://localhost:4001/api/organizations';
const searchUrl = (search) => search ? new URL(`?search=${search}`, baseUrl) : baseUrl;

const columns = [
  {
    text: 'Name Line 1',
    dataField: 'name_line_1'
  },
  {
    text: 'Name Line 2',
    dataField: 'name_line_2'
  },
  {
    text: 'State',
    dataField: 'state'
  },
  {
    text: 'Awards Granted',
    dataField: 'awards_granted',
    sort: true
  }
];

const OrganizationTable = ({ data }) => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);

  const onClick = (e, row, rowIndex) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: row.id }
    })
  }

  const onChange = debounce(useCallback((event) => {
    const query = event.target.value;
    setQuery(query)

    if (query.length) {
      fetch(searchUrl(query))
        .then((res) => res.json())
        .then((res) => setResults(res))
    } else {
      fetch(searchUrl())
        .then((res) => res.json())
        .then((res) => setResults(res))
    }
  }), 200)

  return (
    <div className="container">
      <div class="input-group rounded">
        <input
          class="form-control rounded"
          type="search"
          placeholder="Search Organizations"
          onChange={onChange}
        />
      </div>
      <Table
        keyField="id"
        data={results}
        columns={columns}
        rowEvents={{ onClick: onClick }}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch(baseUrl).then((res) => res.json());

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { data }
  }
};

export default OrganizationTable
