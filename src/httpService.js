import testdata from "./testdata.json";
const axios = require("axios");
const USE_PROXY = true;
const URL = "/post-handler";
const LOCAL_PROXY_URL = "http://localhost:8010/proxy";

class HttpService {
  constructor() {
    // Add a request interceptor for the proxy
    axios.interceptors.request.use(config => {
      if (USE_PROXY) {
        config.url = `${LOCAL_PROXY_URL}${config.url}`;
      }
      return config;
    });
  }

  executeQuery(query) {
    const exampleReq = {
      requests: [{}]
    };

    // ENABLE THIS TO SKIP THE API AND WORK DIRECTLY WITH THE TESTDATA
    // return Promise.resolve(testdata).then();

    return axios
      .request({
        method: "post",
        url: URL,
        data: JSON.stringify(exampleReq),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(result => {
        console.log(result.data);
        return result.data;
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .finally(function() {
        // always executed
      });
  }
}

export default new HttpService();
