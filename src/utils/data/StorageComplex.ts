import BaseMethods from "./BaseMethods";
import LocalStorage from "./LocalStorage";

const StorageComplex = {
  putElement: async <T>(key: string, hashKey: string, element: T) => {
    if (BaseMethods.isNull(element)) {
      return;
    }
    let elementStr: string = await LocalStorage.readLocalStorage(key);
    if (BaseMethods.isNull(elementStr)) {
      let elementArr = new Map<string, T>();
      elementArr.set(hashKey, element);
      let initValue = JSON.stringify(elementArr);
      await LocalStorage.setLocalStorage(key, initValue);
    } else {
      let stored: Map<string, T> = JSON.parse(elementStr);
      if (stored.has(hashKey)) {
        return;
      } else {
        stored.set(hashKey, element);
        let newStoredJson = JSON.stringify(stored);
        await LocalStorage.setLocalStorage(key, newStoredJson);
      }
    }
  },
  getElement: async <T> (key: string, hashKey: string): Promise<T|undefined> => {
    let elementStr: string = await LocalStorage.readLocalStorage(key);
    if (BaseMethods.isNull(elementStr)) {
      return undefined;
    }
    let stored: Map<string, T>  = JSON.parse(elementStr);
    let element: T|undefined = stored.get(hashKey);
    return element;
  },
}

export default StorageComplex

