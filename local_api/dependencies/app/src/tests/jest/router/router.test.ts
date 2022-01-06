import { beforeEach } from '@/router';

import { Route } from "vue-router";
require("@/tests/jest/__mock__/Console")


describe('Router', () => {


  //Router should not be able allow to from a Named Page to the RoutePage
  it.each
    `pathTo | pathFrom | reject 
    ${"/a"} | ${"/b"} | ${false}
    ${"/a"} | ${"/"} | ${false}
    ${'/'} | ${'/b'} | ${true}
    ${"/"} | ${"/"} | ${false}
  `

    ('beforeEach', ({ pathTo, pathFrom, reject }) => {
      const next = jest.fn();
      const routeTo: Route = { path: pathTo, hash: "", query: {}, matched: [], fullPath: pathTo, params: {} }
      const routeFrom: Route = { path: pathFrom, hash: "", query: {}, matched: [], fullPath: pathFrom, params: {} }

      beforeEach(routeTo, routeFrom, next);
      expect(next).toBeCalled();
      if (reject)
        expect(next).toBeCalledWith(false);
    });

});
