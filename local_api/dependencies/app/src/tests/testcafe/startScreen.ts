import { Selector } from 'testcafe';

fixture`case-trackGroup`
    .page`http://localhost:8080/?debug=true#/evolution_case_ap-v.1.0.0/`;

test('displays project type STEM Case', async t => {
    await t
        .expect(Selector('#projectType').textContent).eql("STEM Case.");
});


fixture`handbook-trackGroup`
    .page`http://localhost:8080/?debug=true#/evolution_guide_highschool-v.1.0.0/`;

test('displays project type Handbook', async t => {
    await t
        .expect(Selector('#projectType').textContent).eql("Handbook.");
});