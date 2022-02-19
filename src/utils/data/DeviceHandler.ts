const DeviceHandler = {
    getDeviceId: async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            // Initialize an agent at application startup.
            const fpPromise = require('@fingerprintjs/fingerprintjs');

            // Get the visitor identifier when you need it.
            fpPromise
                .then((fp: { get: () => any; }) => fp.get())
                .then(async (result: { visitorId: any; }) => {
                    // This is the visitor identifier:
                    const deviceId = result.visitorId;
                    resolve(deviceId);
                });
        });
    }
};

export default DeviceHandler;

