require("@/tests/jest/__polyfill__/TextEncoder");
import {
  setDebug, isDebug, showHandbookPages, showDebugLabel
} from "@/helpers/debugHelpers";
import {
  logMessage, logInfo, logWarning, logException, logError
} from "@/helpers/debugHelpers";
import {
  gizmoLogSecurely, logWarningSecurely, logExceptionSecurely, logErrorSecurely
} from "@/helpers/debugHelpers";

const mockConsole = require("@/tests/jest/__mock__/Console");

const mockMutationHistoryPlugin = require("@/store/mutationHistoryPlugin");
const mockSentryHelpers = require("@/helpers/sentryHelper");
const mockCaptureSentryEvent = jest.spyOn(mockSentryHelpers, "captureSentryEvent");
const mockCaptureSentryException = jest.spyOn(mockSentryHelpers, "captureSentryException");

const message = "test message";

describe("debugHelper", () => {
  beforeEach(() => {
    delete (window as any).location;
    (window as any).location = { href: "" };

    mockCaptureSentryEvent.mockClear();
    mockCaptureSentryException.mockClear();
  });
  afterEach(() => {
    window.location = location;
  });


  it.each`
        SET_DEBUG | URL | IS_DEBUG
        ${false} | ${"http://localhost/#/"} | ${false}
        ${true} |  ${"http://localhost/#/"}| ${true}
        ${false} | ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=true#/pages/xxxx/"} | ${true}
        ${true} |  ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=true#/pages/xxxx/"}| ${true}`("setDebug/isDebug", ({ SET_DEBUG, URL, IS_DEBUG }) => {
    setDebug(SET_DEBUG);

    window.location.href = URL;

    expect(window.location.href).toBe(URL);
    expect(isDebug()).toBe(IS_DEBUG);
  });

  it.each`
        URL | EXPECT
        ${"http://localhost/#/"} | ${false}
        ${"http://localhost/#/"}| ${false}
        ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=true#/pages/xxxx/"} | ${true}
        ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=false#/pages/xxxx/"}| ${false}`("showHandbookPages", ({ URL, EXPECT }) => {
    window.location.href = URL;

    expect(showHandbookPages()).toBe(EXPECT);
  });

  it.each`
        URL | EXPECT
        ${"http://localhost/#/"} | ${true}
        ${"http://localhost/#/"}| ${true}
        ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=true?debugLabel=true#/pages/xxxx/"} | ${true}
        ${"http://localhost:8000/preview/?debug=true?teacherView=true?handbookPages=true?debugLabel=false#/pages/xxxx/"}| ${false}`("showDebugLabel", ({ URL, EXPECT }) => {
    window.location.href = URL;

    expect(showDebugLabel()).toBe(EXPECT);
  });

  it.each`
        LOG_FUNC | PAGE_UNLOADING | EXPECT_SENTRY
        ${logMessage} | ${false} | ${false}             //logMessage will NEVER call Sentry
        ${logMessage} |${true} | ${false}        
        ${logInfo} | ${false} | ${true}
        ${logInfo} |${true} | ${false}
        ${logWarning} | ${false} | ${true}
        ${logWarning} |${true} | ${false}
        ${logError} | ${false} | ${true}
        ${logError} |${true} | ${false}       
        ${gizmoLogSecurely} | ${false} | ${false}             //gizmoLogSecurely will NEVER call Sentry
        ${gizmoLogSecurely} |${true} | ${false}        
        ${logWarningSecurely} | ${false} | ${true}
        ${logWarningSecurely} |${true} | ${false}
        ${logErrorSecurely} | ${false} | ${true}
        ${logErrorSecurely} |${true} | ${false}`("logMessage/Info/Warning/Error - SENTRY blocked by unloading",
    ({ LOG_FUNC, PAGE_UNLOADING, EXPECT_SENTRY }) => {
      mockMutationHistoryPlugin.pageIsUnloading = jest.fn(() => { return PAGE_UNLOADING; });

      expect(mockMutationHistoryPlugin.pageIsUnloading()).toBe(PAGE_UNLOADING);

      LOG_FUNC(message);

      if (EXPECT_SENTRY) { expect(mockCaptureSentryEvent).toBeCalled(); } else { expect(mockCaptureSentryEvent).not.toBeCalled(); }
    });

  it.each`
        LOG_FUNC | PAGE_UNLOADING | EXPECT_SENTRY          
        ${logException} | ${false} | ${true}           
        ${logException} |${true} | ${false}           
        ${logExceptionSecurely} | ${false} | ${true}
        ${logExceptionSecurely} |${true} | ${false}`("logException - SENTRY blocked by unloading",
    ({ LOG_FUNC, PAGE_UNLOADING, EXPECT_SENTRY }) => {
      mockMutationHistoryPlugin.pageIsUnloading = jest.fn(() => { return PAGE_UNLOADING; });

      expect(mockMutationHistoryPlugin.pageIsUnloading()).toBe(PAGE_UNLOADING);

      LOG_FUNC(message);

      if (EXPECT_SENTRY) { expect(mockCaptureSentryException).toBeCalled(); } else { expect(mockCaptureSentryException).not.toBeCalled(); }
    });
});