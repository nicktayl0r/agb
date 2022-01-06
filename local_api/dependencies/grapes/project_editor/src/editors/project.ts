import axios from "axios";

import { ShowFailure, ShowSuccess } from "../utils/alerts";
import Editor from "./editor";
import { Change } from "./pages";

declare var Awesomplete;

const config = {
	// Enable fetching schemas via ajax
	ajax: true,
	// The schema for the editor
	schema: {
		$ref: require("../schema/projectSchema.json")
	},
	disable_edit_json: true,
	disable_properties: true
};

interface Pair {
	name: string;
	id: string;
}

interface ModulePairs {
	case: Pair[];
	guide: Pair[];
	glossary: Pair[];
}

interface AwesompleteModules {
	case: Awesomplete[];
	guide: Awesomplete[];
	glossary: Awesomplete[];
}

export class ProjectEditor extends Editor {
	constructor(elementID: string) {
		super(elementID, config);
		// console.log("project.ts");
	}

	editorReady() {
		this.requestData("/project");
	}

	init = false;
	editorInitialized() {
		const submitButton = document.getElementById("submit");
		if (submitButton) {
			submitButton.addEventListener("click", () => {
				this.onSubmitClick();
			});
		}
		// console.log("project.editorInit");
		this.init = true;
		this.ProjectReadyInitAutoComplete();

		// set browser tab title
		const proj = this.editorInstance.getValue();
		const projectName = proj["name"];
		if (projectName) {
			document.title = projectName + ": Project Editor";
			const projectNameEl = document.getElementById("project-name");
			if (projectNameEl) projectNameEl.innerHTML = projectName;
		}
	}

	onSubmitClick() {
		if (this.validateTracks()) this.saveProject();
	}

	validateTracks() {
		//look through all page data, compare tracks.
		return (
			this.validateModule("case") &&
			this.validateModule("guide") &&
			this.validateGlossary()
		);
	}

	validateModule(mod: string) {
		const proj = this.editorInstance.getValue();
		for (const t of proj[mod].tracks) {
			let existingSectionNames: string[] = [];
			for (const s of t.sections) {
				if (existingSectionNames.findIndex((sectionName: string) => { return sectionName === s.name }) !== -1) {
					ShowFailure(
						"INVALID SECTION :: DUPLICATE NAME",
						"In ",
						mod,
						" track: ",
						t.name,
						", section: ",
						s.name,
						" name already exists in track. \n\n Section Names must be unique."
					);
					return false;
				}
				else {
					existingSectionNames.push(s.name);
				}

				if (s.parentSectionName) {
					if (s.parentSectionName === s.name) {
						ShowFailure(
							"INVALID SECTION :: BAD PARENT NAME",
							"In ",
							mod,
							" track: ",
							t.name,
							", section: ",
							s.name,
							" has sectionParentName: [",
							s.parentSectionName,
							"]\n\n Sections cannot be parented to themselves."
						);
						return false;
					}
					if (t.sections.findIndex((section) => { return section.name === s.parentSectionName }) === -1) {
						ShowFailure(
							"INVALID SECTION :: NO SUCH PARENT ",
							"In ",
							mod,
							" track: ",
							t.name,
							", section: ",
							s.name,
							" has sectionParentName: [",
							s.parentSectionName,
							"]\n\n Section Parent could not be found."
						);
						return false;
					}
				}

				for (const p of s.pages) {
					const allP = this.allPageData[mod].find(aP => {
						return aP.id === p.pageID;
					});
					if (!allP) {
						ShowFailure(
							"INVALID PAGE ID",
							"In ",
							mod,
							" track: ",
							t.name,
							", section: ",
							s.name,
							", the page id: ",
							p.pageID,
							" does not exist in All Pages in the .",
							mod,
							" module."
						);
						return false;
					}
				}
			}
		}
		return true;
	}

	validateGlossary() {
		const mod = "glossary";
		const proj = this.editorInstance.getValue();
		for (const t of proj[mod].tracks) {
			for (const p of t.pages) {
				const allP = this.allPageData[mod].find(aP => {
					return aP.id === p.pageID;
				});
				if (!allP) {
					ShowFailure(
						"INVALID PAGE ID",
						"In ",
						mod,
						" track: ",
						t.name,
						", the page id: ",
						p.pageID,
						" does not exist in All Pages in the .",
						mod,
						" module."
					);
					return false;
				}
			}
		}
		return true;
	}

	saveProject() {
		const newProject = this.editorInstance.getValue();
		axios
			.post("project", newProject)
			.then(res => {
				ShowSuccess("Project Saved!", "Successfully saved the project.");
				console.log("save project success");
			})
			.catch(error => {
				ShowFailure(
					"API ERROR!",
					"There was a problem saving your project. See the browser console for details."
				);
			});
	}

	public AutoCompleteAdd(moduleID: string, pageID: string, pageName: string) {
		// console.log("AutoCompleteAdd", moduleID, pageID, pageName);
		//update the auto completes
		this.allPageData[moduleID].push({
			id: pageID,
			name: pageName,
			modue: moduleID
		});
		for (const auto of this.allFieldsDict[moduleID]) {
			auto.list = this.allPageData[moduleID];
		}
	}
	public AutoCompleteRemove(moduleID: string, pageID: string) {
		// console.log("AutoCompleteRemove", moduleID, pageID);
		//update the auto completes
		const remove = this.allPageData[moduleID].find(p => {
			return p.id === pageID;
		});
		if (remove) {
			const index = this.allPageData[moduleID].indexOf(remove);
			this.allPageData[moduleID].splice(index, 1);
			for (const auto of this.allFieldsDict[moduleID]) {
				auto.list = this.allPageData[moduleID];
			}
		}
	}

	public AutoCompleteEditModule(moduleID: string, changes: Change[]) {
		for (const change of changes) {
			this.allPageData[moduleID][change.index].id = change.id;
			this.allPageData[moduleID][change.index].name = change.name;
		}
		this.FindAutoFieldsOnAllModules(this.editorInstance.getValue());
	}

	private allPageData: ModulePairs;
	private pageDataLoaded = false;
	public AutoCompleteInitData(allPageData: ModulePairs) {
		// console.log("AutoCompleteInitData", allPageData);
		this.allPageData = allPageData; //store data for when this editor is ready
		console.log("all page data: ", this.allPageData);
		if (this.init && !this.pageDataLoaded) this.AutoCompleteInit();
		else
			console.warn(
				"Delaying initializing auto complete because the editor isn't initialized. This should be ok, the editor will try once it's initialized."
			);
	}

	ProjectReadyInitAutoComplete() {
		//AutoCompleteInit might fire before this editor is ready
		if (this.init && !this.pageDataLoaded && this.allPageData != undefined) {
			this.AutoCompleteInit();
		} else
			console.warn(
				"Delaying initializing auto complete because the pageData. This should be ok, the editor will try once it's initialized."
			);
	}

	AutoCompleteInit() {
		this.pageDataLoaded = true;
		// console.log("AutoCompleteInit");
		//go through all of the current editor instance
		this.FindAutoFieldsOnAllModules(this.editorInstance.getValue());
		//create auto complete references for each module
		// console.log("AutoCompleteInit.post find all");
		this.editorInstance.on("change", () => {
			this.FindAutoFieldsOnAllModules(this.editorInstance.getValue());
		});
	}

	FindAutoFieldsOnAllModules(edInstance: any) {
		// console.log("FindAutoFieldsOnAllModules");
		this.FindAutoFieldsOnModule("case", edInstance);
		this.FindAutoFieldsOnModule("guide", edInstance);
		this.FindAutoFieldsOnGlossary(edInstance);
		this.FindAutoCompleteFieldsOnGroupIDs(edInstance);
		console.log("Finished adding autocomplete to modules");
	}

	FindAutoFieldsOnModule(mod: string, projectEdData: any) {
		//need to find all the selectors based on what we have in the project already
		for (let i = 0; i < projectEdData[mod].tracks.length; i++) {
			for (let j = 0; j < projectEdData[mod].tracks[i].sections.length; j++) {
				for (
					let k = 0;
					k < projectEdData[mod].tracks[i].sections[j].pages.length;
					k++
				) {
					//find the pageID field element and assign an aweseomplete
					const selector =
						"[name='root[" +
						mod +
						"][tracks][" +
						i +
						"][sections][" +
						j +
						"][pages][" +
						k +
						"][pageID]']";
					const pageIDField = document.querySelector(selector);
					if (pageIDField) {
						if (pageIDField.parentElement) {
							//do not add awesomeplete on an element that already has it.
							if (!pageIDField.parentElement.classList.contains("awesomplete"))
								this.AddAutoCompleteToFields(
									mod,
									pageIDField,
									this.allPageData,
									this.allFieldsDict
								);
						}
					} else
						console.error("Could not find element with selector: ", selector);
				}
			}
			// console.log("track id: ", projectEdData[mod].tracks[i].trackID);
			if (
				this.allTrackIDs[mod].find(
					x => x.id == projectEdData[mod].tracks[i].trackID
				) == undefined
			) {
				this.allTrackIDs[mod].push({
					name: projectEdData[mod].tracks[i].name,
					id: projectEdData[mod].tracks[i].trackID
				});
				// console.log("pushed new track to allTrackIDs: ", this.allTrackIDs);
			}
		}
		//add watches to all the paths: on track, on section, on page
	}

	FindAutoFieldsOnGlossary(projectEdData: any) {
		const mod = "glossary";
		//need to find all the selectors based on what we have in the project already
		for (let i = 0; i < projectEdData[mod].tracks.length; i++) {
			for (let k = 0; k < projectEdData[mod].tracks[i].pages.length; k++) {
				//find the pageID field element and assign an aweseomplete
				const selector =
					"[name='root[" +
					mod +
					"][tracks][" +
					i +
					"][pages][" +
					k +
					"][pageID]']";
				const pageIDField = document.querySelector(selector);
				if (pageIDField) {
					if (pageIDField.parentElement) {
						//do not add awesomeplete on an element that already has it.
						if (!pageIDField.parentElement.classList.contains("awesomplete"))
							this.AddAutoCompleteToFields(
								mod,
								pageIDField,
								this.allPageData,
								this.allFieldsDict
							);
					}
				} else {
					console.error("Could not find element with selector: ", selector);
				}
				for (
					let l = 0;
					l < projectEdData[mod].tracks[i].pages[k].relatedTerms.length;
					l++
				) {
					const relSelector =
						"[name='root[" +
						mod +
						"][tracks][" +
						i +
						"][pages][" +
						k +
						"][relatedTerms][" +
						l +
						"][pageID]";
					const relIDField = document.querySelector(relSelector);
					if (relIDField) {
						if (relIDField.parentElement) {
							if (!relIDField.parentElement.classList.contains("awesomplete"))
								this.AddAutoCompleteToFields(
									mod,
									relIDField,
									this.allPageData,
									this.allFieldsDict
								);
						}
					} else {
						console.error("Could not find element with selector: ", selector);
					}
				}
			}
			// console.log("track id: ", projectEdData[mod].tracks[i].trackID);
			if (
				this.allTrackIDs[mod].find(
					x => x.id == projectEdData[mod].tracks[i].trackID
				) == undefined
			) {
				this.allTrackIDs[mod].push({
					name: projectEdData[mod].tracks[i].name,
					id: projectEdData[mod].tracks[i].trackID
				});
				// console.log("pushed new track to allTrackIDs: ", this.allTrackIDs);
			}
		}
		//add watches to all the paths: on track, on section, on page
	}

	allFieldsDict: AwesompleteModules = { case: [], guide: [], glossary: [] };
	AddAutoCompleteToFields(
		mod: string,
		field: Element,
		list: ModulePairs,
		dict: AwesompleteModules
	) {
		// console.log("adding awesomeplete to: ", field);
		const auto = new Awesomplete(field, {
			list: list[mod],
			data: (item, input) => {
				return { label: "(" + item.id + ") " + item.name, value: item.id };
			},
			minChars: 1
		});
		dict[mod].push(auto);
	}

	allTrackIDs: ModulePairs = { case: [], guide: [], glossary: [] }; //where to store the ids of each track for easy reference
	allTrackIDFieldsDict: AwesompleteModules = {
		case: [],
		guide: [],
		glossary: []
	};
	FindAutoCompleteFieldsOnGroupIDs(projectEdData: any) {
		for (let i = 0; i < projectEdData.trackGroups.length; i++) {
			for (const mod in this.allTrackIDs) {
				//easy way to get "case", "guide", "glossary"
				const typeSel = "[name='root[trackGroups][" + i + "][" + mod + "ID]']";
				const typeSelField = document.querySelector(typeSel);
				if (typeSelField) {
					if (typeSelField.parentElement) {
						if (!typeSelField.parentElement.classList.contains("awesomplete")) {
							this.AddAutoCompleteToFields(
								mod,
								typeSelField,
								this.allTrackIDs,
								this.allTrackIDFieldsDict
							);
						}
					}
				}
			}
		}
	}
}
