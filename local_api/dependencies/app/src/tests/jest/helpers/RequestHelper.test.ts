import mockAxios from "jest-mock-axios";

import { AxiosRetryInstance } from "@/helpers/requestHelpers";

const projectData = require("@/tests/jest/__data__/project.json");

//Required
//Required
//Required
afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
});


describe("RequestHelper", () => {
  beforeEach(() => { });


  it.each`
        STATUS | STATUS_TEXT | PASS
        ${404} | ${"Not Found"} | ${false}
        ${200} | ${"OK"}        | ${true}`("test AxiosRetryInstance", ({ STATUS, STATUS_TEXT, PASS }) => {
  //Create mock functions to expect being called
  const catchFn = jest.fn(),
    thenFn = jest.fn();

  //Make a request
  AxiosRetryInstance.get("./data/project.json")
    .then(thenFn)
    .catch(catchFn);

  // since `get` method is a spy, we can check if the server request was correct:
  // a) the correct method was used (get)
  // b) went to the correct web service URL ('./data/project.json')
  expect(mockAxios.get).toHaveBeenCalledWith("./data/project.json");

  //Simulating a server response
  //Note: must specify data, status, statusText, config, AND headers
  //          to be able to PASS expect(thenFn).toHaveBeenCalledWith(response)
  const response = {
    data: projectData, status: STATUS, statusText: STATUS_TEXT, config: {}, headers: {}
  };



  if (!PASS) {
    //Use mockError to simulate non-2xx responses
    mockAxios.mockError(response);
    expect(catchFn).toHaveBeenCalled();
    expect(thenFn).not.toHaveBeenCalled();
  } else {
    //Use mockError to simulate 2xx "OK" responses
    mockAxios.mockResponse(response);
    expect(thenFn).toHaveBeenCalledWith(response);

    // catch should not have been called
    expect(catchFn).not.toHaveBeenCalled();
  }
});
});