import { useRouter } from 'next/router'
import { Table } from 'components/Table'

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

  const body = data.map(({ id, name_line_1, name_line_2, state }) => {
    return (
      <tr key={id} onClick={() => handleClick(id)}>
        <td> {name_line_1} </td>
        <td> {name_line_2} </td>
        <td> {state} </td>
      </tr>
    )
  })

  return <Table col={col} body={body} />;

  // TODO: figure out closures for passing around {...attrs} ?
  // return <Table
  //   col={col}
  //   data={data}
  // />
}

export async function getServerSideProps(context) {
  const res = await fetch('https://localhost:4001/api/organizations');
  const data = await res.json()

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
