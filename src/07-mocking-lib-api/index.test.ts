// Uncomment the code below and write your tests
import axios from 'axios';
import type { AxiosInstance } from 'axios';

jest.mock('lodash', () => ({
  throttle: (fn: (...args: unknown[]) => unknown) => fn,
}));

import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const relativePath = 'some_path';
  const responseData = { data: { id: 1, name: 'User' } };

  beforeEach(() => {
    jest.restoreAllMocks();
    mockedAxios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue(responseData),
    } as unknown as AxiosInstance);
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue(responseData),
    };
    mockedAxios.create.mockReturnValue(axiosClient as unknown as AxiosInstance);
    await throttledGetDataFromApi(relativePath);
    expect(axiosClient.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValue(responseData),
    };
    mockedAxios.create.mockReturnValue(axiosClient as unknown as AxiosInstance);
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseData.data);
  });
});
