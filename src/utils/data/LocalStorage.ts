
const LocalStorage = {
  readLocalStorage: (key: string): Promise<string> => {
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
}

export default LocalStorage

