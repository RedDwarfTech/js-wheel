
const LocalStorage = {
  set: async (key: string, value: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      window.localStorage.setItem(key,value);
    });
  },
  readLocalStorage: async (key: string): Promise<string> => {
    if (typeof chrome === 'undefined' || !chrome?.storage?.local) {
      const value = localStorage.getItem(key);
      return value ?? "";
    }
    
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], (result: any) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }
        const value = result[key];
        if (value === undefined || value === null) {
          resolve("");
        } else if (typeof value === 'string') {
          resolve(value);
        } else if (typeof value === 'object') {
          resolve(JSON.stringify(value));
        } else {
          resolve(String(value));
        }
      });
    });
  },
  setLocalStorage: async (key: string, value: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // https://stackoverflow.com/questions/71125910/why-the-google-chrome-extension-setlocalstorage-function-did-not-work
      // https://stackoverflow.com/questions/71127300/key-is-declared-but-its-value-is-never-read-when-set-google-chrome-extension-v
      chrome.storage.local.set({
        [key]: value
      }, function () {
        resolve("");
      });
    });
  },
}

export default LocalStorage

