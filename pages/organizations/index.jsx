import { useRouter } from 'next/router'
import { Table } from 'components/Table'
import { useCallback, useState } from 'react';

import debounce from 'lodash.debounce';

const baseUrl = 'https://localhost:4001/api/organizations'
const searchUrl = (search) => new URL(`?search=${search}`, baseUrl)

const col = [
  {
    name: 'Name Line 1',
    field: 'name_line_1'
  },
  {
    name: 'Name Line 2',
    field: 'name_line_2'
  },
  {
    name: 'State',
    field: 'state'
  }
];

const OrganizationTable = ({ data }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: id }
    });
  }

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(data);

  const body = results.map(({ id, name_line_1, name_line_2, state }) => {
    return (
      <tr key={id} onClick={() => handleClick(id)}>
        <td> {name_line_1} </td>
        <td> {name_line_2} </td>
        <td> {state} </td>
      </tr>
    )
  })

  const onChange = debounce(useCallback((event) => {
    const query = event.target.value;
    setQuery(query)

    if (query.length) {
      fetch(searchUrl(query))
        .then((res) => res.json())
        .then((res) => setResults(res))
    } else {
      setResults([])
    }
  }), 200)

  return (<>
    <input
      type="text"
      placeholder="Search Organizations"
      onChange={onChange}
    />
    <Table col={col} body={body} />
  </>);
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
