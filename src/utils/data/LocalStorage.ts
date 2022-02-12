

const readLocalStorage = async (key: string) => {
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


