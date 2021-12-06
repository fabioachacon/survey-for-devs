import axios from 'axios';

import { mockAxios, mockHttpResponse } from 'infra/test';
import { AxiosHttpClient } from './axios-http-client';
import { mockPostRequest } from 'data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios
  };
};

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL, verb and body', () => {
    const request = mockPostRequest();
    const { sut, mockedAxios } = makeSut();
    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  test('Should return the correct StatusCode and body', () => {
    const { sut, mockedAxios } = makeSut();
    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });

  test('Should return the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse()
    });

    const promise = sut.post(mockPostRequest());
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
