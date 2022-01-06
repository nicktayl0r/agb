import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { mount, shallowMount } from "@vue/test-utils";
import { setDebug } from "@/helpers/debugHelpers.ts";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetPlayableTests } from "@/tests/jest/mixins/MixinWidgetPlayableTests";

import WidgetStopwatch from "@/components/WidgetStopwatch.vue";
import {
  readWidgetEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";

describe("WidgetStopwatch", () => {
  WidgetBaseTests(WidgetStopwatch);
  MixinWidgetPlayableTests(WidgetStopwatch);
});

describe("WidgetStopwatch snapshot", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  it.each`
		_format        | _start     | _end       | _setDateNowTo
		${"secs"}     | ${0}      | ${5000}   | ${4000}
		${"secs"}     | ${5000}   | ${0}      | ${4000}
		${"mins"}     | ${0}      | ${300000} | ${240000}
		${"mins"}     | ${300000} | ${0}      | ${240000}
		${"colon"}    | ${0}      | ${5000}   | ${4125}
		${"colon"}    | ${5000}   | ${0}      | ${3725}
		${"colon"}    | ${0}      | ${300000} | ${240125}
		${"colon"}    | ${300000} | ${0}      | ${239275}
		${"hrs/mins"} | ${0}      | ${300000} | ${240000}
		${"hrs/mins"} | ${300000} | ${0}      | ${240000}
	`("stopwatch snapshots", ({
    _format, _start, _end, _setDateNowTo
  }) => {
    const wrapper = shallowMount(WidgetStopwatch, {
      propsData: {
        id: "testWidgetStopwatch",
        text: "stopwatch text",
        start_ms: _start,
        end_ms: _end,
        speed: 1,
        autoPlay: false,
        format: _format,
        playState: "default"
      },
      localVue,
      store
    });

    const { vm } = wrapper;
    const { updateCurrentTime } = (vm as any);

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidgetStopwatch",
      key: "playState",
      value: "play"
    });

    updateCurrentTime();
    global.Date.now = jest.fn(() => _setDateNowTo);
    updateCurrentTime();

    expect(wrapper.element).toMatchSnapshot();
  });
  //add more snapshots for each distinctive property configuration.
});

describe("WidgetStopwatch functionality", () => {
  beforeEach(() => {
    store = getCleanStore();

    global.Date.now = jest.fn(() => 0);
    setDebug(true);

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidgetStopwatch",
      key: "elapsedMS",
      value: 0
    });
  });

  it.each`
		start   | end
		${0}    | ${5000}
		${5000} | ${0}
	`("Goto playState state", ({ start, end }) => {
    const wrapper = shallowMount(WidgetStopwatch, {
      propsData: {
        id: "testWidgetStopwatch",
        start_ms: start,
        end_ms: end,
        speed: 1,
        autoPlay: false,
        format: "secs",
        playState: "default"
      },
      localVue,
      store
    });

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidgetStopwatch",
      key: "playState",
      value: "play"
    });

    const widgetVal = readWidgetEntryVal(store)(
      "testPage",
      "testWidgetStopwatch",
      "playState"
    );
    expect(widgetVal.unsafelyUnwrap()).toBe("play");
  });

  it.each`
		start   | end     | countDown
		${0}    | ${5000} | ${false}
		${5000} | ${0}    | ${true}
	`("CountDown = start > end?", ({ start, end, countDown }) => {
    const wrapper = shallowMount(WidgetStopwatch, {
      propsData: {
        id: "testWidgetStopwatch",
        start_ms: start,
        end_ms: end,
        speed: 1,
        autoPlay: false,
        format: "secs",
        playState: "default"
      },
      localVue,
      store
    });
    const { vm } = wrapper;
    expect((vm as any).countDown).toBe(countDown);
  });

  //todo: add a speed parameter to fully represent the combinations of properties
  it.each`
		_format        | _start      | _end       | _setDateNowTo  | _formattedTimeString  | _totalMS   | _speed
		${"secs"}     | ${1000}    | ${5000}   | ${3000}       | ${"4"}               | ${4000}   | ${1}
		${"secs"}     | ${5000}    | ${1000}   | ${3000}       | ${"2"}               | ${2000}   | ${1}
		${"secs"}     | ${-1000}   | ${5000}   | ${3000}       | ${"2"}               | ${2000}   | ${1}
		${"secs"}     | ${-5000}   | ${1000}   | ${3000}       | ${"-2"}              | ${-2000}  | ${1}
		${"secs"}     | ${300000}  | ${1000}   | ${240000}     | ${"60"}              | ${60000}  | ${1}
		${"mins"}     | ${1000}    | ${300000} | ${240000}     | ${"4"}               | ${241000} | ${1}
		${"mins"}     | ${300000}  | ${1000}   | ${240000}     | ${"1"}               | ${60000}  | ${1}
		${"mins"}     | ${-1000}   | ${300000} | ${240000}     | ${"3"}               | ${239000} | ${1}
		${"mins"}     | ${-300000} | ${1000}   | ${240000}     | ${"-1"}              | ${-60000} | ${1}
		${"colon"}    | ${1000}    | ${5000}   | ${2125}       | ${"03:13"}           | ${3125}   | ${1}
		${"colon"}    | ${5000}    | ${1000}   | ${3725}       | ${"01:28"}           | ${1275}   | ${1}
		${"colon"}    | ${-1000}   | ${5000}   | ${2125}       | ${"01:13"}           | ${1125}   | ${1}
		${"colon"}    | ${-5000}   | ${1000}   | ${3725}       | ${"-01:27"}          | ${-1275}  | ${1}
		${"colon"}    | ${1000}    | ${300000} | ${240125}     | ${"04:01:13"}        | ${241125} | ${1}
		${"colon"}    | ${300000}  | ${1000}   | ${238275}     | ${"01:01:73"}        | ${61725}  | ${1}
		${"hrs/mins"} | ${1000}    | ${300000} | ${239000}     | ${"00 hrs 04 mins"}  | ${240000} | ${1}
		${"hrs/mins"} | ${300000}  | ${1000}   | ${240000}     | ${"00 hrs 01 mins"}  | ${60000}  | ${1}
		${"hrs/mins"} | ${-1000}   | ${300000} | ${239000}     | ${"00 hrs 03 mins"}  | ${238000} | ${1}
		${"hrs/mins"} | ${-300000} | ${1000}   | ${240000}     | ${"-00 hrs 01 mins"} | ${-60000} | ${1}
		${"secs"}     | ${1000}    | ${5000}   | ${1500}       | ${"4"}               | ${4000}   | ${2}
		${"secs"}     | ${5000}    | ${1000}   | ${1500}       | ${"2"}               | ${2000}   | ${2}
		${"secs"}     | ${-1000}   | ${5000}   | ${1500}       | ${"2"}               | ${2000}   | ${2}
		${"secs"}     | ${-5000}   | ${1000}   | ${1500}       | ${"-2"}              | ${-2000}  | ${2}
		${"secs"}     | ${300000}  | ${1000}   | ${120000}     | ${"60"}              | ${60000}  | ${2}
		${"mins"}     | ${1000}    | ${300000} | ${120000}     | ${"4"}               | ${241000} | ${2}
		${"mins"}     | ${300000}  | ${1000}   | ${120000}     | ${"1"}               | ${60000}  | ${2}
		${"mins"}     | ${-1000}   | ${300000} | ${120000}     | ${"3"}               | ${239000} | ${2}
		${"mins"}     | ${-300000} | ${1000}   | ${120000}     | ${"-1"}              | ${-60000} | ${2}
		${"colon"}    | ${1000}    | ${5000}   | ${1062}       | ${"03:13"}           | ${3125}   | ${2}
		${"colon"}    | ${5000}    | ${1000}   | ${3725 / 2}   | ${"01:28"}           | ${1275}   | ${2}
		${"colon"}    | ${-1000}   | ${5000}   | ${1062}       | ${"01:13"}           | ${1125}   | ${2}
		${"colon"}    | ${-5000}   | ${1000}   | ${3725 / 2}   | ${"-01:27"}          | ${-1275}  | ${2}
		${"colon"}    | ${1000}    | ${300000} | ${240125 / 2} | ${"04:01:13"}        | ${241125} | ${2}
		${"colon"}    | ${300000}  | ${1000}   | ${238275 / 2} | ${"01:01:73"}        | ${61725}  | ${2}
		${"hrs/mins"} | ${1000}    | ${300000} | ${239000 / 2} | ${"00 hrs 04 mins"}  | ${240000} | ${2}
		${"hrs/mins"} | ${300000}  | ${1000}   | ${240000 / 2} | ${"00 hrs 01 mins"}  | ${60000}  | ${2}
		${"hrs/mins"} | ${-1000}   | ${300000} | ${239000 / 2} | ${"00 hrs 03 mins"}  | ${238000} | ${2}
		${"hrs/mins"} | ${-300000} | ${1000}   | ${240000 / 2} | ${"-00 hrs 01 mins"} | ${-60000} | ${2}
	`(
    "formattedTimeString - Format=$format; $start -> $end after $setDateNowTo MS",
    ({
      _format,
      _start,
      _end,
      _setDateNowTo,
      _formattedTimeString,
      _totalMS,
      _speed
    }) => {
      const wrapper = shallowMount(WidgetStopwatch, {
        propsData: {
          id: "testWidgetStopwatch",
          start_ms: _start,
          end_ms: _end,
          speed: _speed,
          autoPlay: false,
          format: _format,
          playState: "default"
        },
        localVue,
        store
      });
      const { vm } = wrapper;
      const { updateCurrentTime } = (vm as any);

      dispatchUpdateWidget(store, {
        pageID: "testPage",
        widgetID: "testWidgetStopwatch",
        key: "playState",
        value: "play"
      });

      updateCurrentTime();
      global.Date.now = jest.fn(() => _setDateNowTo);
      updateCurrentTime();

      // expect(vm.totalElapsedMS).toBe(setDateNowTo);
      // expect(vm.totalMS).toBe(totalMS);
      expect((vm as any).formattedTimeString).toBe(_formattedTimeString);
    }
  );
});
