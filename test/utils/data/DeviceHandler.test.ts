import 'mocha'
import { expect } from 'chai'
import DeviceHandler from '@utils/data/DeviceHandler'

describe('Device Test', function () {
    it('Get device fingerprints', async function () {
       let fingerprints:string = await DeviceHandler.getDeviceId();
       expect(fingerprints).to.be.equal("xxxx");
    })
    it('Get device fingerprints enhance', async function () {
        /**  
         * https://stackoverflow.com/questions/71340167/how-to-test-get-browser-fingerprints-with-mocha
         * 
         * https://stackoverflow.com/questions/71352368/is-it-possible-to-install-cavas-with-m1-chip
         * 
         * */
        let fingerprints:string = await DeviceHandler.getDeviceIdEnhance();
        expect(fingerprints).to.be.a("string");
     })
})


