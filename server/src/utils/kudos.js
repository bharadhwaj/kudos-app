import KudosModel from '../models/kudos.model';

const kudosData = [
  {
    givenByUserId: 1,
    receivedByUserId: 2,
    comments: 'Good job on the last project! Thanks for the hard work.',
  },
  {
    givenByUserId: 1,
    receivedByUserId: 4,
    comments: 'Handled the production issue very well last week.',
  },
  {
    givenByUserId: 2,
    receivedByUserId: 4,
    comments: 'Great job.',
  },
  {
    givenByUserId: 3,
    receivedByUserId: 4,
  },
  {
    givenByUserId: 4,
    receivedByUserId: 1,
    comments: 'Awesome coworker. Great mentor.',
  },
  {
    givenByUserId: 6,
    receivedByUserId: 9,
    comments: 'Dedicated person.',
  },
  {
    givenByUserId: 6,
    receivedByUserId: 7,
  },
  {
    givenByUserId: 6,
    receivedByUserId: 8,
  },
  {
    givenByUserId: 8,
    receivedByUserId: 6,
  },
  {
    givenByUserId: 9,
    receivedByUserId: 6,
    comments: 'Great coworker.',
  },
];

const addKudosData = async () => {
  await KudosModel.bulkCreate(kudosData);
};

export default addKudosData;
