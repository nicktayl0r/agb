import { ServerEnv } from "../editors/rubrics";
import { Project } from "../types/projectModels";

export async function ValidateResourceActivityKeys(
	project: Project,
	keys: ServerEnv
) {
	//first take resource and activity id from serverEnv
	//ask graqhQL if each exists - check "key" against project.trackgroups

	// for (const trackGroup of project.trackGroups) {
	// 	if (trackGroup.trackGroupID)
	// }
	return true;
}
