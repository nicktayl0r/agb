import swal from "sweetalert";

import { ShowFailure, ShowSuccess, ShowWarning } from "../utils/alerts";
import { getGraphQLByEnv, GraphQLClient } from "../graphql/ApolloClient";
import { ConvertToSableRubrics, GetResourceIDs, Sort_CreateOrUpdateRubrics } from "../helpers/rubricsHelper";
import { trackEnum } from "../data models/resourceModels";
import { env } from "../data models/environmentModels";
import { SableRubric, JsonEditorRubricsObject } from "../data models/rubricModels";

let graphQLClient: GraphQLClient;
export async function PublishRubrics(env: env, projectName: string, valueToPublish: JsonEditorRubricsObject) {

    const resourceIDs = {};
    const resourceActivityPromises: any[] = [];
    const resourceActivityTotalScore: any[] = [];

    const toCreate: SableRubric[] = [];
    const toUpdate: SableRubric[] = [];
    let finalMessage = "";
    swal({
        text: "Enter your graphQL Authorization Token for " + env,
        content: {
            element: "input",
        },
        buttons: {
            confirm: {
                text: "Authenticate",
                closeModal: false,
            },
        },
    })
        .then((authToken) => {
            if (!authToken) {
                throw { message: "No Auth Token" };
            } // else console.log("authToken", authToken);

            graphQLClient = new GraphQLClient(getGraphQLByEnv(env), authToken);

            trackEnum.forEach((_track) => {
                const _resourceIDs = GetResourceIDs(valueToPublish, env, _track);
                if (_resourceIDs !== undefined) {
                    resourceIDs[_track] = _resourceIDs;
                    const resource_activity_id = parseInt(resourceIDs[_track].resource_activity_id);
                    const resource_id = parseInt(resourceIDs[_track].resource_id);
                    console.log("TODO: figure out why removing THIS console.log breaks the promises below.");
                    if (resource_id !== 0 && resource_activity_id !== 0) {
                        resourceActivityPromises.push(
                            graphQLClient.GetResourceActivity(
                                resource_activity_id,
                                resource_id
                            )
                        );
                    }
                }
            });

            return Promise.all(resourceActivityPromises);
        })
        .then((values) => {
            const _convertedRubrics = ConvertToSableRubrics(valueToPublish, env);
            const allRubrics: SableRubric[] = [];
            const resourceActivity = {};
            const keys: any[] = [];
            (Object as any).keys(resourceIDs).forEach((_track, index) => {
                allRubrics.push(..._convertedRubrics[_track]);
                resourceActivity[_track] = values[index].data.getResourceActivity;
                keys.push(resourceActivity[_track].key);
            });

            // console.log(allRubrics);

            (Object as any).keys(resourceIDs).forEach((_track) => {
                Sort_CreateOrUpdateRubrics(
                    resourceActivity[_track].resourceActivityRubrics.map((x) => {
                        return x.key;
                    }),
                    _convertedRubrics[_track],
                    toCreate,
                    toUpdate
                );
            });

            return swal({
                title: "Upload " + env + " rubrics?",
                content: {
                    element: GenerateDownloadTemplates(
                        env,
                        projectName,
                        allRubrics,
                        keys,
                        toCreate.length,
                        toUpdate.length
                    ),
                },
                icon: "warning",
                buttons: {
                    cancel: {
                        visible: true,
                        text: "Cancel",
                    },
                    confirm: {
                        text: "Upload",
                        closeModal: false,
                    },
                },
                dangerMode: true,
            });
        })
        .then((ok) => {
            if (ok) {
                //push rubrics
                if (toCreate.length > 0) {
                    return graphQLClient.CreateResourceActivityRubrics(
                        JSON.stringify(toCreate)
                    );
                } else {
                    return Promise.resolve({
                        data: {
                            createResourceActivityRubrics: "No rubrics to create.\n",
                        },
                    });
                }
            } else {
                throw undefined; //just close the window
            }
        })
        .then((results) => {
            //CreateResourceActivityRubrics server response
            finalMessage = results.data.createResourceActivityRubrics + "\n";
            if (toUpdate.length > 0) {
                console.log("create results", JSON.stringify(results));
                return graphQLClient.UpdateResourceActivityRubrics(
                    JSON.stringify(toUpdate)
                );
            } else {
                return Promise.resolve({
                    data: { updateResourceActivityRubrics: "No rubrics to update.\n" },
                });
            }
        })
        .then((results) => {
            //Get Sum
            finalMessage =
                finalMessage + results.data.updateResourceActivityRubrics;

            (Object as any).keys(resourceIDs).forEach((_track) => {
                if (resourceIDs[_track] && resourceIDs[_track].resource_activity_id != 0 && resourceIDs[_track].resource_id != 0) {
                    resourceActivityTotalScore.push(
                        graphQLClient.GetResourceActivityTotalPoints(
                            resourceIDs[_track].resource_activity_id,
                            resourceIDs[_track].resource_id
                        ));
                }
            });

            return Promise.all(resourceActivityTotalScore);
        })
        .then((results) => {
            const _convertedRubrics = ConvertToSableRubrics(valueToPublish, env);
            let correctTotalPointsSum = true;
            (Object as any).keys(resourceIDs).forEach((_track, index) => {
                let totalPoints = 0;
                _convertedRubrics[_track].forEach((rubric) => {
                    if (rubric.resource_activity_rubric_answers.length > 0) {
                        totalPoints += rubric.resource_activity_rubric_answers.sort(
                            (a, b) => {
                                return b.points - a.points;
                            }
                        )[0].points;
                    }
                });

                //console.log(`totalPoints ${totalPoints} results[index].totalPoints ${results[index].data.getResourceActivity.totalPoints}`);
                if (
                    totalPoints !== results[index].data.getResourceActivity.totalPoints
                ) {
                    finalMessage += `\n The tblResourceActivity ${results[index].data.getResourceActivity.key} TotalPoints does not correctly reflect the sum of all Rubric Max Points.`;
                    correctTotalPointsSum = false;
                }
            });
            if (correctTotalPointsSum) {
                return ShowSuccess("Upload to " + env + " is complete.", finalMessage);
            } else {
                return ShowWarning("Upload to " + env + " points are incorrect.", "Please upload the rubrics again.\n" + finalMessage);
            }
        })
        .catch((err) => {
            if (err) {
                // console.log(JSON.stringify(err));
                const title = err.networkError
                    ? err.networkError.statusCode + " Error"
                    : "Error";
                const message = err.networkError
                    ? err.networkError.bodyText
                    : err.message;
                ShowFailure(title, message);
                console.error(err);
            } else {
                //@ts-ignore
                swal.stopLoading();
                //@ts-ignore
                swal.close();
            }
        });
}



function GenerateDownloadTemplates(
    env: env,
    projectName: string,
    allRubrics: SableRubric[],
    envIDs: string[],
    newCount: number,
    updateCount: number
) {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    for (const id of envIDs) {
        const id_P = document.createElement("p");
        id_P.innerText = id;
        wrapper.appendChild(id_P);
    }
    const json_Link = document.createElement("a");
    json_Link.target = "_blank";
    json_Link.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(allRubrics));
    json_Link.download = `${projectName}_${env}_RubricExport.json`;
    json_Link.innerText = "Download For JSON";
    wrapper.appendChild(json_Link);
    const text_Link = document.createElement("a");
    text_Link.target = "_blank";
    text_Link.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(JSON.stringify(allRubrics)));
    text_Link.download = `${projectName}_${env}_RubricExport.txt`;
    text_Link.innerText = "Download For GraphQL";
    wrapper.appendChild(text_Link);
    const summary = document.createElement("h4");
    summary.innerText =
        "Pressing OK will create " +
        newCount +
        " new rubrics and update " +
        updateCount +
        " existing rubrics.";
    wrapper.appendChild(summary);
    return wrapper;
}