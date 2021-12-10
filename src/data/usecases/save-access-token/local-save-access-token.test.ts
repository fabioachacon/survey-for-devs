import faker from 'faker';

import { LocalSaveAccessToken } from './local-save-access-token';
import { SetStorageMock } from 'data/test/mock-storage';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return {
    sut,
    setStorageMock
  };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.datatype.uuid();
    await sut.save(accessToken);

    expect(setStorageMock.getKey()).toBe('accessToken');
    expect(setStorageMock.getValue()).toBe(accessToken);
  });

  test('Should throw exception if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());

    const accessToken = faker.datatype.uuid();
    const promise = sut.save(accessToken);
    expect(promise).rejects.toThrow();
  });
});