
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
      chrome.storage.local.set({
        key: value
      }, function () {
        resolve("");
      });
    });
  },
}

export default LocalStorage

