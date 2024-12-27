import axios from 'axios';
import {fetchUsers} from '../Service/searchSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('fetches users successfully', async () => {
  const mockData = {
    data: {items: [{id: 1, login: 'johndoe', avatar_url: '', type: 'User'}]},
  };
  mockedAxios.get.mockResolvedValueOnce(mockData);

  const data = await fetchUsers('johndoe');
  expect(data).toEqual(mockData.data.items);
});
