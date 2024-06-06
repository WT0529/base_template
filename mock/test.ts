import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/user/query",
    method: "get",
    response: () => {
      return {
        code: 0,
        data: {
          data: [
            {
              name: "vben",
              age: 27,
              height: 170,
            },
            {
              name: "fue",
              age: 20,
              height: 180,
            },
            {
              name: "xwe",
              age: 15,
              height: 160,
            },
            {
              name: "ui",
              age: 22,
              height: 185,
            },
          ],
          total: 4
        },
        message: "成功"
      };
    },
  },
] as MockMethod[];
