import { SetStorage } from 'data/protocols/cache/set-storage';

export class SetStorageMock implements SetStorage {
  private key: string;
  private value: string;

  async set(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
  }

  getKey() {
    return this.key;
  }

  getValue() {
    return this.value;
  }
}
