import 'mocha'
import { expect } from 'chai'
import AuthHandler from "../../../src/auth/extension/AuthHandler";

describe('Auth Test', function () {
    it('Parse jwt token', async function () {
        const result = AuthHandler.isTokenNeedRefresh(16000);
        expect(typeof result).to.be('boolean');
    })
})

