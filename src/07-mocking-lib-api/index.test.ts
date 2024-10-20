// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');
const relativePath = 'some_path';
const responseData = { data: { id: 1, name: 'Username' } };
const interval = THROTTLE_TIME;

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.restoreAllMocks();
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(responseData);
    jest.mock('lodash/throttle', () => ({
      // eslint-disable-next-line @typescript-eslint/ban-types
      throttle: (fn: Function) => fn,
    }));
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com';
    throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(interval);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: baseUrl,
    });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(interval);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    jest.advanceTimersByTime(interval);
    expect(result).toEqual(responseData.data);
  });
});
