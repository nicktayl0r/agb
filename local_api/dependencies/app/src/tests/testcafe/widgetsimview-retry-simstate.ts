import { Selector, RequestMock } from 'testcafe';
import { startCase } from "./testcafeHelpers";

fixture`widgetSimView-retry-simstate`
    .page`http://localhost:8080/?debug=true?teacherView=true/#/evolution_case_ap-v.1.0.0/pages/sim1`.beforeEach(
        async t => startCase(t)
    );


const mock = RequestMock()
    .onRequestTo(/.*\/16787r.json/)
    .respond((req, res) => { // a custom response
        res.statusCode = '404';
    });
//fail sim state request once, retry and recover
test
    .requestHooks(mock)
    ('fail once', async (t: any) => {
        await t
            .click(Selector('#showSim\\ '))
            .click(Selector('#changeSim\\ '));
        await t.removeRequestHooks(mock);
        await t.wait(1000)
            .click(Selector('#retrySimStateButton'))
            .wait(1000)
            .expect(Selector('#retrySimStateButton').visible).eql(false);
    });
//fail sim state request twice, retry and recover
test
    .requestHooks(mock)
    ('fail twice', async (t: any) => {
        await t
            .click(Selector('#showSim\\ '))
            .click(Selector('#changeSim\\ '))
            .wait(1000)
            .click(Selector('#retrySimStateButton'))
            .wait(1000);
        await t.removeRequestHooks(mock);
        await t.click(Selector('#retrySimStateButton'))
            .wait(1000)
            .expect(Selector('#retrySimStateButton').visible).eql(false);
    });
//fail sim state request thrice and fire end and loop effects
test
    .requestHooks(mock)
    ('fail thrice', async (t: any) => {
        await t
            .click(Selector('#showSim\\ '))
            .click(Selector('#changeSim\\ '))
            .wait(1000)
            .click(Selector('#retrySimStateButton'))
            .wait(1000)
            .click(Selector('#retrySimStateButton'))
            .wait(1000)
            .expect(Selector('#endEffects').visible).eql(true)
            .expect(Selector('#loopEffects').visible).eql(true);
    });