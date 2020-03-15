import OrganisationModel from '../models/organisations.model';

const organisationData = [
  { name: 'Organisation A' },
  { name: 'Organisation B' },
];

const addOrganisationData = async () => {
  await OrganisationModel.bulkCreate(organisationData);
};

export default addOrganisationData;
