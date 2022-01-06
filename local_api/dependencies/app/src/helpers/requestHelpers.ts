import axr from "axios-retry";
import axios from "axios";

const AxiosRetryInstance = axios.create();

axr(AxiosRetryInstance, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 1000;
  }
});

export { AxiosRetryInstance };