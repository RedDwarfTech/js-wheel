declare const DeviceHandler: {
    getDeviceId: () => Promise<string>;
    getDeviceIdEnhance: () => Promise<string>;
};
export default DeviceHandler;
