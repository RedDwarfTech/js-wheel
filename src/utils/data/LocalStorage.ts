
const LocalStorage = {
  readLocalStorage: async (key: string): Promise<string> => {
    // https://stackoverflow.com/questions/59440008/how-to-wait-for-asynchronous-chrome-storage-local-get-to-finish-before-continu
    return new Promise((resolve, reject) => {
      chrome.storage.local.get([key], function (result) {
        if (result[key] === undefined) {
          resolve("");
        } else {
          resolve(result[key]);
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

