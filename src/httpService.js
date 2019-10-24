import testdata from "./testdata2.json";
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
    // console.info(testdata);
    return Promise.resolve(testdata).then();

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

// const test = {
//   response: [
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000a9dba54e486cfd55f"
//           },
//           {
//             number: 30
//           },
//           {
//             number: 50
//           }
//         ],
//         [
//           {
//             atom: "8000000a20252f074abbacc4"
//           },
//           {
//             number: 60
//           },
//           {
//             number: 40
//           }
//         ],
//         [
//           {
//             atom: "8000000a28a27cbe260d6e36"
//           },
//           {
//             number: 20
//           },
//           {
//             number: 10
//           }
//         ],
//         [
//           {
//             atom: "8000000a4281c5902304de73"
//           },
//           {
//             number: 10
//           },
//           {
//             number: 20
//           }
//         ],
//         [
//           {
//             atom: "8000000a5eadd058631a78ac"
//           },
//           {
//             number: 40
//           },
//           {
//             number: 30
//           }
//         ]
//       ]
//     },
//     {
//       form: ["rectangle", "bottom-left", "top-right"],
//       tuples: [
//         [
//           {
//             atom: "8000000ac29ffa997d207e4c"
//           },
//           {
//             atom: "8000000a4281c5902304de73"
//           },
//           {
//             atom: "8000000a5eadd058631a78ac"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["line", "point", "point"],
//       tuples: [
//         [
//           {
//             atom: "8000000a31cac3b1f557eb6e"
//           },
//           {
//             atom: "8000000a28a27cbe260d6e36"
//           },
//           {
//             atom: "8000000a9dba54e486cfd55f"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["circle", "center", "radius"],
//       tuples: [
//         [
//           {
//             atom: "8000000ab17b150719e1a09a"
//           },
//           {
//             atom: "8000000a20252f074abbacc4"
//           },
//           {
//             number: 20
//           }
//         ]
//       ]
//     },
//     {
//       form: ["color", "red", "green", "blue"],
//       tuples: [
//         [
//           {
//             atom: "8000000aa7d689c22195a450"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 0
//           },
//           {
//             number: 1
//           }
//         ],
//         [
//           {
//             atom: "8000000ae187e8ec9ea2883d"
//           },
//           {
//             number: 1
//           },
//           {
//             number: 0
//           },
//           {
//             number: 0
//           }
//         ],
//         [
//           {
//             atom: "8000000a3be93fc63df8a027"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 1
//           },
//           {
//             number: 0
//           }
//         ]
//       ]
//     },
//     {
//       form: ["stroke", "color", "width"],
//       tuples: [
//         [
//           {
//             atom: "8000000a8ee4c9c9fb8496d3"
//           },
//           {
//             atom: "8000000ae187e8ec9ea2883d"
//           },
//           {
//             number: 1
//           }
//         ],
//         [
//           {
//             atom: "8000000a7a895888aa54f833"
//           },
//           {
//             atom: "8000000aa7d689c22195a450"
//           },
//           {
//             number: 2
//           }
//         ]
//       ]
//     },
//     {
//       form: ["outline", "stroke"],
//       tuples: [
//         [
//           {
//             atom: "8000000ac29ffa997d207e4c"
//           },
//           {
//             atom: "8000000a8ee4c9c9fb8496d3"
//           }
//         ],
//         [
//           {
//             atom: "8000000a31cac3b1f557eb6e"
//           },
//           {
//             atom: "8000000a7a895888aa54f833"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["solid", "color"],
//       tuples: [
//         [
//           {
//             atom: "8000000ab17b150719e1a09a"
//           },
//           {
//             atom: "8000000a3be93fc63df8a027"
//           }
//         ]
//       ]
//     }
//   ]
// };

// const test = {
//   response: [
//     {
//       form: ["atom", "name"],
//       tuples: [
//         [
//           {
//             atom: "8000000a1f3e5467fcfd4f3c"
//           },
//           {
//             string: "matrix"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["atom", "icon"],
//       tuples: [
//         [
//           {
//             atom: "8000000a1f3e5467fcfd4f3c"
//           },
//           {
//             atom: "myIconId"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000a0808c9ff8701220f"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 0
//           }
//         ]
//       ]
//     },
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000ae948ae610da17d9e"
//           },
//           {
//             number: 100
//           },
//           {
//             number: 0
//           }
//         ]
//       ]
//     },
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000ae3b4dfb15660de68"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 100
//           }
//         ]
//       ]
//     },
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000ace399448063cf049"
//           },
//           {
//             number: 100
//           },
//           {
//             number: 100
//           }
//         ]
//       ]
//     },
//     {
//       form: ["rectangle", "bottom-left", "top-right"],
//       tuples: [
//         [
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000a0808c9ff8701220f"
//           },
//           {
//             atom: "8000000ace399448063cf049"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["shape", "component", "position"],
//       tuples: [
//         [
//           {
//             atom: "myIconId"
//           },
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000ace399448063cf049"
//           }
//         ],
//         [
//           {
//             atom: "myIconId"
//           },
//           {
//             atom: "compositeshapeID1"
//           },
//           {
//             atom: "8000000ace399448063cf049"
//           }
//         ],
//         [
//           {
//             atom: "compositeshapeID1"
//           },
//           {
//             atom: "circleID1"
//           },
//           {
//             atom: "8000000ace399448063cf049"
//           }
//         ],
//         [
//           {
//             atom: "compositeshapeID1"
//           },
//           {
//             atom: "circleID2"
//           },
//           {
//             atom: "8000000ace399448063cf049"
//           }
//         ],
//         [
//           {
//             atom: "myIconId"
//           },
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000ae3b4dfb15660de68"
//           }
//         ],
//         [
//           {
//             atom: "myIconId"
//           },
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000ae948ae610da17d9e"
//           }
//         ],
//         [
//           {
//             atom: "myIconId"
//           },
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000a0808c9ff8701220f"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["stroke", "color", "width"],
//       tuples: [
//         [
//           {
//             atom: "8000000a8ee4c9c9fb8496d3"
//           },
//           {
//             atom: "8000000ae187e8ec9ea2883d"
//           },
//           {
//             number: 5
//           }
//         ]
//       ]
//     },
//     {
//       form: ["outline", "stroke"],
//       tuples: [
//         [
//           {
//             atom: "8000000a450fc8a61aad1bcb"
//           },
//           {
//             atom: "8000000a8ee4c9c9fb8496d3"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["color", "red", "green", "blue"],
//       tuples: [
//         [
//           {
//             atom: "8000000ae187e8ec9ea2883d"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 0
//           },
//           {
//             number: 0
//           }
//         ],
//         [
//           {
//             atom: "greenId"
//           },
//           {
//             number: 0
//           },
//           {
//             number: 1
//           },
//           {
//             number: 0
//           }
//         ]
//       ]
//     },
//     {
//       form: ["circle", "center", "radius"],
//       tuples: [
//         [
//           {
//             atom: "circleID1"
//           },
//           {
//             atom: "8000000a20252f074abbacc4"
//           },
//           {
//             number: 10
//           }
//         ]
//       ]
//     },
//     {
//       form: ["circle", "center", "radius"],
//       tuples: [
//         [
//           {
//             atom: "circleID2"
//           },
//           {
//             atom: "8000000a20252f074abbacc4"
//           },
//           {
//             number: 5
//           }
//         ]
//       ]
//     },
//     {
//       form: ["point", "horizontal", "vertical"],
//       tuples: [
//         [
//           {
//             atom: "8000000a20252f074abbacc4"
//           },
//           {
//             number: 150
//           },
//           {
//             number: 150
//           }
//         ]
//       ]
//     },
//     {
//       form: ["solid", "color"],
//       tuples: [
//         [
//           {
//             atom: "circleID1"
//           },
//           {
//             atom: "8000000ae187e8ec9ea2883d"
//           }
//         ]
//       ]
//     },
//     {
//       form: ["solid", "color"],
//       tuples: [
//         [
//           {
//             atom: "circleID2"
//           },
//           {
//             atom: "greenId"
//           }
//         ]
//       ]
//     }
//   ]
// };
