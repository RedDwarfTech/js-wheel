declare const LocalStorage: {
    readLocalStorage: (key: string) => Promise<string>;
    setLocalStorage: (key: string, value: string) => Promise<string>;
};
export default LocalStorage;
