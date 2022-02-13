declare const LocalStorage: {
    readLocalStorage: (key: string) => Promise<string>;
};
export default LocalStorage;
