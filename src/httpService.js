const axios = require("axios");
const LOCAL_PROXY_URL = "http://localhost:8010/proxy";

class HttpService {
  constructor() {
    // Add a request interceptor for the proxy
    axios.interceptors.request.use(config => {
      config.url = `${LOCAL_PROXY_URL}${config.url}`;
      return config;
    });
  }

  executeQuery(query) {
    return Promise.resolve(test).then();

    //   const exampleReq = {
    //     requests: [
    //       {
    //         requestType: "QUERY",
    //         form: ["molecule", "name"],
    //         tuples: [{ variable: 1 }, { string: "glucose" }]
    //       }
    //     ]
    //   };

    //   return axios
    //     .request({
    //       method: "post",
    //       url: "/posts",
    //       data: JSON.stringify(exampleReq),
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //       }
    //     })
    //     .then(result => {
    //       console.log(test);
    //       return test;
    //     })
    //     .catch(function(error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .finally(function() {
    //       // always executed
    //     });
  }
}

export default new HttpService();

const test = {
  response: [
    {
      form: ["point", "horizontal", "vertical"],
      tuples: [
        [
          {
            atom: "8000000a9dba54e486cfd55f"
          },
          {
            number: 30
          },
          {
            number: 50
          }
        ],
        [
          {
            atom: "8000000a20252f074abbacc4"
          },
          {
            number: 60
          },
          {
            number: 40
          }
        ],
        [
          {
            atom: "8000000a28a27cbe260d6e36"
          },
          {
            number: 20
          },
          {
            number: 10
          }
        ],
        [
          {
            atom: "8000000a4281c5902304de73"
          },
          {
            number: 10
          },
          {
            number: 20
          }
        ],
        [
          {
            atom: "8000000a5eadd058631a78ac"
          },
          {
            number: 40
          },
          {
            number: 30
          }
        ]
      ]
    },
    {
      form: ["rectangle", "bottom-left", "top-right"],
      tuples: [
        [
          {
            atom: "8000000ac29ffa997d207e4c"
          },
          {
            atom: "8000000a4281c5902304de73"
          },
          {
            atom: "8000000a5eadd058631a78ac"
          }
        ]
      ]
    },
    {
      form: ["line", "point", "point"],
      tuples: [
        [
          {
            atom: "8000000a31cac3b1f557eb6e"
          },
          {
            atom: "8000000a28a27cbe260d6e36"
          },
          {
            atom: "8000000a9dba54e486cfd55f"
          }
        ]
      ]
    },
    {
      form: ["circle", "center", "radius"],
      tuples: [
        [
          {
            atom: "8000000ab17b150719e1a09a"
          },
          {
            atom: "8000000a20252f074abbacc4"
          },
          {
            number: 20
          }
        ]
      ]
    },
    {
      form: ["color", "red", "green", "blue"],
      tuples: [
        [
          {
            atom: "8000000aa7d689c22195a450"
          },
          {
            number: 0
          },
          {
            number: 0
          },
          {
            number: 1
          }
        ],
        [
          {
            atom: "8000000ae187e8ec9ea2883d"
          },
          {
            number: 1
          },
          {
            number: 0
          },
          {
            number: 0
          }
        ],
        [
          {
            atom: "8000000a3be93fc63df8a027"
          },
          {
            number: 0
          },
          {
            number: 1
          },
          {
            number: 0
          }
        ]
      ]
    },
    {
      form: ["stroke", "color", "width"],
      tuples: [
        [
          {
            atom: "8000000a8ee4c9c9fb8496d3"
          },
          {
            atom: "8000000ae187e8ec9ea2883d"
          },
          {
            number: 1
          }
        ],
        [
          {
            atom: "8000000a7a895888aa54f833"
          },
          {
            atom: "8000000aa7d689c22195a450"
          },
          {
            number: 2
          }
        ]
      ]
    },
    {
      form: ["outline", "stroke"],
      tuples: [
        [
          {
            atom: "8000000ac29ffa997d207e4c"
          },
          {
            atom: "8000000a8ee4c9c9fb8496d3"
          }
        ],
        [
          {
            atom: "8000000a31cac3b1f557eb6e"
          },
          {
            atom: "8000000a7a895888aa54f833"
          }
        ]
      ]
    },
    {
      form: ["solid", "color"],
      tuples: [
        [
          {
            atom: "8000000ab17b150719e1a09a"
          },
          {
            atom: "8000000a3be93fc63df8a027"
          }
        ]
      ]
    }
  ]
};
