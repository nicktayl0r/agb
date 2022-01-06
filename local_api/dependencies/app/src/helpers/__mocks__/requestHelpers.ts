// import axr from "axios-retry";
import axios from "axios";

const AxiosRetryInstance = axios.create();

//If Mocking Axios, do not use Axios Retry
// axr(AxiosRetryInstance, {
//   retries: 3,
//   retryDelay: (retryCount) => {
//     return retryCount * 1000;
//   }
// });

export { AxiosRetryInstance };