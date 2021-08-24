import { Fragment } from 'react';
import { useRouter } from 'next/router'

const OrganizationTable = ({ data }) => {
  const router = useRouter();
  const handleClick = (id) => {
    router.push({
      pathname: '/organizations/[id]',
      query: { id: id }
    });
  }

  const rows = data.map(({ id, name_line_1, name_line_2, state }) => {
    return (
      <Fragment key={id}>
        <tr onClick={() => handleClick(id)}>
          <td> {name_line_1} </td>
          <td> {name_line_2} </td>
          <td> {state} </td>
        </tr>
      </Fragment>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th> Name Line 1 </th>
          <th> Name Line 2 </th>
          <th> State </th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
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
