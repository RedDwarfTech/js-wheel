declare const StorageComplex: {
    putElement: <T>(key: string, hashKey: string, element: T) => Promise<void>;
    getElement: <T_1>(key: string, hashKey: string) => Promise<T_1 | undefined>;
};
export default StorageComplex;
