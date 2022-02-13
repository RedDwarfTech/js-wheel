

const readLocalStorage = async (key: string) => {
    // https://stackoverflow.com/questions/59440008/how-to-wait-for-asynchronous-chrome-storage-local-get-to-finish-before-continu
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
          if (result[key] === undefined) {
            reject();
          } else {
            resolve(result[key]);
          }
        });
      });
}


