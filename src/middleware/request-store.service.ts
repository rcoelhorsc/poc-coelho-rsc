import { AsyncLocalStorage } from 'async_hooks';

export class RequestStoreService {
  private static readonly asyncLocalStorage = new AsyncLocalStorage<Map<string, any>>();

  static run<T>(store: Map<string, any>, callback: () => T): T {
    return this.asyncLocalStorage.run(store, callback);
  }

  static set(key: string, value: any): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }

  static get<T>(key: string): T | undefined {
    return this.asyncLocalStorage.getStore()?.get(key);
  }
}
