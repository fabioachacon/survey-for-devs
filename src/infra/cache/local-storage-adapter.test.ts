import faker from 'faker';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = () => {
  const sut = new LocalStorageAdapter();
  return sut;
};

describe('LocalStorageAdapter', () => {
  test('Should call localStorage with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
