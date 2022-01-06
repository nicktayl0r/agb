import * as ApolloClient from '@/store/ApolloClient';
import * as ApolloHelpers from '@/helpers/serverHelpers';
const debugHelpers = require.requireActual("@/helpers/debugHelpers");

import 'unfetch/polyfill';

let client: any;
describe("ApolloClient Network Error", () => {
  beforeEach(() => {
    //Critical that the domain/path is INVALID.
    client = ApolloClient.CreateApolloClient("",'http://localhost/going/to/no/where');
    debugHelpers.logError = jest.fn();
  });
  
  it("ApolloQueryResourceActivity - throw NetworkError", async (done:any) => {
    try {
      const promiseResponse= await ApolloClient.ApolloQueryResourceActivity(client, 1000);
      expect(promiseResponse).toBeDefined();
      fail("Apollo client expected to throw error");
    }catch(err) {    
      expect(err.message).toContain('Network error');      
    }
    expect(debugHelpers.logError).toBeCalled();    
    expect(debugHelpers.logError.mock.calls[0][0]).toContain('QueryErrors caught NetworkError');   //Verify that Error was logged and thus reported to Sentry

    done();
  });

  it("ApolloQueryProgress - throw NetworkError", async (done:any) => {
  
    try {
      const promiseResponse= await ApolloClient.ApolloQueryProgress(client, 1000, "");
      expect(promiseResponse).toBeDefined();
      fail("Apollo client expected to throw error");
    }catch(err) {    
      expect(err.message).toContain('Network error');
    }
    expect(debugHelpers.logError).toBeCalled();    
    expect(debugHelpers.logError.mock.calls[0][0]).toContain('QueryErrors caught NetworkError');   //Verify that Error was logged and thus reported to Sentry

    done();
  });

  it("ApolloMutateProgress - throw NetworkError", async (done:any) => {
  
    try {
      const promiseResponse= await ApolloClient.ApolloMutateProgress(client, 1000, "", "");
      expect(promiseResponse).toBeDefined();
      fail("Apollo client expected to throw error");
    }catch(err) {    
      expect(err.message).toContain('Network error');
    }
    expect(debugHelpers.logError).toBeCalled();
    expect(debugHelpers.logError.mock.calls[0][0]).toContain('MutatationErrors caught NetworkError');   //Verify that Error was logged and thus reported to Sentry

    done();
  });

  it("ApolloMutateActivityResponse - throw NetworkError", async (done:any) => {
  
    try {
      const promiseResponse= await ApolloClient.ApolloMutateActivityResponse(client, 100, ""," ", "");
      expect(promiseResponse).toBeDefined();
      fail("Apollo client expected to throw error");
    }catch(err) {    
      expect(err.message).toContain('Network error');
    }
    expect(debugHelpers.logError).toBeCalled();
    expect(debugHelpers.logError.mock.calls[0][0]).toContain('MutatationErrors caught NetworkError');   //Verify that Error was logged and thus reported to Sentry

    done();
  });
});
