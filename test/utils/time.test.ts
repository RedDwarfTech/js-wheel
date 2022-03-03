var expect = require('chai').expect;
import DeviceHandler from "@utils/data/DeviceHandler";

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', async function() {
    expect(1+ 1).to.be.equal(2);
    let deviceId:string = await DeviceHandler.getDeviceId();
    expect(deviceId).to.be.equal("xxxx");
  });
});