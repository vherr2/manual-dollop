const Organization = ({ ...data }) => {

  return <p>Organization: {data.name_line_1}</p>
};

export async function getServerSideProps(context) {
  const res = await fetch(`https://localhost:4001/api/organizations/${context.params.id}`);
  const data = await res.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: data
  }
};

export default Organization
