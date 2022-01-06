import { Condition } from "@/data models/conditionModels";
import { evaluateCondition } from "@/helpers/conditionHelpers";
import { EnvironmentOptions, setEnv } from "@/helpers/envHelpers";
let conditionHelpers = require("@/helpers/conditionHelpers");

let debugHelpers = require("@/helpers/__mocks__/debugHelpers");

const conditionData = require("@/tests/jest/__data__/conditions.json");

describe("ConditionHelper logging", () => {
  beforeAll(() => {
    conditionHelpers = require("@/helpers/conditionHelpers");
    debugHelpers = require("@/helpers/__mocks__/debugHelpers");
  });
  beforeEach(() => {
    //conditionHelpers.evaluateComparisions = jest.fn();
  });

  afterAll(() => {
    conditionHelpers = require("@/helpers/conditionHelpers");
    debugHelpers = require("@/helpers/__mocks__/debugHelpers");
  });


  it.each`
  env | expectWarn | condition | pageID 
  ${EnvironmentOptions.production} | ${false} | ${conditionData.emptyCondition_Or_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${true}  | ${conditionData.emptyCondition_Or_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${true}  | ${conditionData.emptyCondition_Or_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${true}  | ${conditionData.emptyCondition_Or_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.production} | ${false} | ${conditionData.emptyCondition_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${true}  | ${conditionData.emptyCondition_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${true}  | ${conditionData.emptyCondition_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${true}  | ${conditionData.emptyCondition_And_PageLoad} | ${"pageID"}

  ${EnvironmentOptions.production} | ${false} | ${conditionData.condition_1PassEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${false}  | ${conditionData.condition_1PassEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${false}  | ${conditionData.condition_1PassEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${false}  | ${conditionData.condition_1PassEffect_And_PageLoad} | ${"pageID"}

  ${EnvironmentOptions.production} | ${false} | ${conditionData.condition_1ResponsePass_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${false}  | ${conditionData.condition_1ResponsePass_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${false}  | ${conditionData.condition_1ResponsePass_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${false}  | ${conditionData.condition_1ResponsePass_And_PageLoad} | ${"pageID"}

  ${EnvironmentOptions.production} | ${false} | ${conditionData.condition_1FailEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${false}  | ${conditionData.condition_1FailEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${false}  | ${conditionData.condition_1FailEffect_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${false}  | ${conditionData.condition_1FailEffect_And_PageLoad} | ${"pageID"}

  ${EnvironmentOptions.production} | ${false} | ${conditionData.condition_1ResponseFail_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.staging} | ${false}  | ${conditionData.condition_1ResponseFail_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.developement} | ${false}  | ${conditionData.condition_1ResponseFail_And_PageLoad} | ${"pageID"}
  ${EnvironmentOptions.debug} | ${false}  | ${conditionData.condition_1ResponseFail_And_PageLoad} | ${"pageID"}

  `
    ("evaluateCondition - log empty by env", ({ env, expectWarn, condition, pageID }) => {
      debugHelpers.logWarning = jest.fn();
      setEnv(env);
      expect(evaluateCondition(condition, pageID)).toBe(true);

      if (expectWarn)
        expect(debugHelpers.logWarning).toBeCalledWith("condition has no effects or responses:", condition);
      else
        expect(debugHelpers.logWarning).not.toBeCalled();
    });
});