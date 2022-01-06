import { ConvertedRubrics, SableRubric, JsonEditorRubricsObject } from "../data models/rubricModels";
import { trackCodeMap, track, ResourceIDs } from "../data models/resourceModels";
import { env } from "../data models/environmentModels";



export function ConvertToSableRubrics(toPublish: JsonEditorRubricsObject, env: env): ConvertedRubrics {
    //create array for each resource. 4 total - case_HS [], handbook_HS, etc.
    const sableRubrics = {};
    (Object as any).keys(trackCodeMap).forEach((element) => {
        const list: SableRubric[] = [];
        sableRubrics[element] = list;
    });

    //loop through rubrics
    //copy rubric object
    for (const rubricData of toPublish.rubrics) {
        // const rubricData = toPublish.rubrics[4];

        const sableRubric = CreateSableRubric(rubricData);
        //convert "resource_activity_rubric_skills" from string array to object array { "resource_activity_skill": "Core Concepts" }
        for (const skill of rubricData.resource_activity_rubric_skills) {
            sableRubric.resource_activity_rubric_skills.push({
                resource_activity_skill: skill,
            });
        }

        //convert screenshots string names into:
        // {
        // 	"url": "CellularRespiration.LHA.InputsOutputs_Correct_1a.jpg",
        // 	"caption": "",
        // 	"order": 1
        // },
        for (
            let i = 0;
            i < rubricData.resource_activity_rubric_screenshots.length;
            i++
        ) {
            sableRubric.resource_activity_rubric_screenshots.push({
                url: rubricData.resource_activity_rubric_screenshots[i] as string,
                caption: "",
                order: i,
            });
        }

        //make new copy for each track
        //based on track bools set copy resource_id and resource_activity_id
        //set order based on track array length.
        //push to array

        (Object as any).keys(trackCodeMap).forEach((element) => {
            if (rubricData[trackCodeMap[element]]) {
                sableRubrics[element].push(
                    AssignOrder(AssignResourceIDs(env, element, toPublish, { ...sableRubric }), sableRubrics[element].length + 1)
                );
            }
        });
    }
    //combine all arrays
    return sableRubrics as ConvertedRubrics;
}

function CreateSableRubric(rubric: any): SableRubric {
    return {
        autograde: rubric.autograde,
        brief: rubric.brief,
        exemplar_answer: rubric.exemplar_answer,
        key: rubric.key,
        order: 0, //will be set later
        question: rubric.question,
        resource_activity_rubric_answers: rubric.resource_activity_rubric_answers,
        resource_activity_rubric_skills: [], //will be set later
        resource_activity_rubric_type: rubric.resource_activity_rubric_type,
        resource_activity_id: 0, //will be set later
        resource_id: 0, //will be set later
        rubrique: rubric.rubrique,
        resource_activity_rubric_screenshots: [], //will be set later
    };
}


function AssignResourceIDs(
    env: env,
    track: track,
    rubricData: any,
    sable: SableRubric
) {
    const resourceIDs = GetResourceIDs(rubricData, env, track);
    if (resourceIDs !== undefined && resourceIDs.resource_activity_id !== undefined) {
        sable.resource_activity_id = resourceIDs.resource_activity_id;
        sable.resource_id = resourceIDs.resource_id;
    }
    return sable;
}

function AssignOrder(sable: SableRubric, order: number) {
    sable.order = order;
    return sable;
}

export function GetResourceIDs(rubricData: any, env: env, track: track): ResourceIDs | undefined {
    if (rubricData[env] && rubricData[env][track] && rubricData[env][track].resource_id !== 0 && rubricData[env][track].resource_activity_id !== 0)
        return rubricData[env][track]; //{	"resource_id": number, "resource_activity_id": number }
    else
        return undefined;
}


export function Sort_CreateOrUpdateRubrics(
    rA_keys: string[],
    trackRubrics: SableRubric[],
    toCreate: SableRubric[],
    toUpdate: SableRubric[]
) {
    // console.log(rA_keys);
    for (const rubric of trackRubrics) {
        if (rA_keys.indexOf(rubric.key) != -1) toUpdate.push(rubric);
        else toCreate.push(rubric);
    }
}