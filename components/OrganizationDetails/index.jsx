export const OrganizationDetails = (props) => {
  const org = props.data;

  return (
    <>
      <h2>Organization</h2>
      <p>{`EIN: ${org.ein}`}</p>
      <p>{`${org.name_line_1}${org.name_line_2 ? ' ' + org.name_line_2 : ''}`}</p>
      <p>{org.address_line_1}</p>
      <p>{`${org.city} ${org.state} ${org.zip_code}`}</p>
    </>
  )
};
