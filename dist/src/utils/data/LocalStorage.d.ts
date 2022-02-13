declare const LocalStorage: {
    readLocalStorage: (key: string) => Promise<unknown>;
};
export default LocalStorage;
