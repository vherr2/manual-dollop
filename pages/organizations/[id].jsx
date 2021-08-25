import { Filings } from 'components/Filings'
import { Awards } from 'components/Awards'
import { OrganizationDetails } from 'components/OrganizationDetails'


const Organization = (props) => {
  return (
    <>
      <OrganizationDetails data={props.org_data} />
      <Filings data={props.filing_data} />
      <Awards data={props.award_data} />
    </>
  );
};

export async function getServerSideProps(context) {
  const id = context.params.id;

  const org = fetch(`https://localhost:4001/api/organizations/${id}`).then((org) => org.json());
  const filing = fetch(`https://localhost:4001/api/filings?filter[filer_id]=${id}`).then((filing) => filing.json());
  const award = fetch(`https://localhost:4001/api/awards?filter[receiver_id]=${id}`).then((award) => award.json());

  const org_data = await org;
  const filing_data = await filing;
  const award_data = await award;


  if (!org_data) {
    return {
      notFound: true
    }
  }

  return {
    props: { org_data, filing_data, award_data }
  }
};

export default Organization
