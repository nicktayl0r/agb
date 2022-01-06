import { AssetManagerAsset, AssetManagerInstance, EditorInstance } from "grapesjs";
import lottie from "lottie-web";

export var AllAssets;

export default (editor: EditorInstance, config) => {
	const am: AssetManagerInstance = editor.AssetManager;
	AllAssets = am.getAll().models;
	AddAssetTypes(am, config);
	SyncProjectAssets(am, config);
	SortAssets(am, config, AllAssets);
	AppendHTML(am, config);
};

function AddAssetTypes(am: AssetManagerInstance, config: any) {
	am.addType("animated-svg", {
		view: {
			getPreview() {
				// const lottieContainer= document.createElement('div');
				const id = this.model.cid;
				// console.log("animated type model", this.model);
				return (
					`<div style="position: relative; width: 100%; height: 100%;" id=` +
					id +
					`></div>`
				);
			}
		},
		isType(value: AssetManagerAsset) {
			if (value.src) {
				const filename = value.src.split(".");
				if (filename[filename.length - 1] == "json") {
					// console.log("animated-svg isType value=", value);
					return {
						src: value.src,
						type: "animated-svg"
					};
				} else return false;
			} else return false;
		}
	});
	am.addType("video-mp4", {
		// view: {
		// 	getPreview() {
		// 		// const lottieContainer= document.createElement('div');
		// 		const id = this.model.cid;
		// 		// console.log("animated type model", this.model);
		// 		return (
		// 			`<div style="position: relative; width: 100%; height: 100%;" id=` +
		// 			id +
		// 			`></div>`
		// 		);
		// 	}
		// },
		isType(value: AssetManagerAsset) {
			if (value.src) {
				const filename = value.src.split(".");
				if (filename[filename.length - 1] == "mp4") {
					// console.log("animated-svg isType value=", value);
					return {
						src: value.src,
						type: "video-mp4"
					};
				} else return false;
			} else return false;
		}
	});
	am.addType("video-webm", {
		// view: {
		// 	getPreview() {
		// 		// const lottieContainer= document.createElement('div');
		// 		const id = this.model.cid;
		// 		// console.log("animated type model", this.model);
		// 		return (
		// 			`<div style="position: relative; width: 100%; height: 100%;" id=` +
		// 			id +
		// 			`></div>`
		// 		);
		// 	}
		// },
		isType(value: AssetManagerAsset) {
			if (value.src) {
				const filename = value.src.split(".");
				if (filename[filename.length - 1] == "webm") {
					// console.log("animated-svg isType value=", value);
					return {
						src: value.src,
						type: "video-webm"
					};
				} else return false;
			} else return false;
		}
	});
}

export function SyncProjectAssets(am: AssetManagerInstance, config: any) {
	// console.log("SyncProjectAssets");
	const ignoreFiles = ["readme.txt", ".*.css", ".DS_Store", "Thumbs.db"];
	const ignorePaths = ["/project/assets/scenes/"];
	let projectFiles;
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				projectFiles = JSON.parse(this.responseText);

				// get asset directory from project directory
				const assets = projectFiles.directories.find(x => x.name === "assets");

				// recursively grab all asset files from asset directory
				// create path and category from dirctory names
				AllAssets = function addAllAssets(root, cat) {
					const assetArray = [] as object[];
					function recurse(r, c) {
						for (const file of r.files) {
							// console.log("path", r.path);
							// use regex to skip paths from the ignore list
							if (
								ignorePaths.some(ignorePath =>
									RegExp(ignorePath, "i").test(r.path)
								)
							) {
								// console.log("ignored", r.path);
								continue;
							}
							// use regex to discard files from the ignore list
							if (
								!ignoreFiles.some(ignoreFile =>
									RegExp(ignoreFile, "i").test(file)
								)
							) {
								assetArray.push({
									f: file,
									p: r.path + "/" + file,
									src: (r.path + "/" + file).replace("../project/", "../../"),
									category: c
								});
							}
						}
						for (const dir of r.directories) {
							recurse(dir, c.concat("." + dir.name));
						}
					}
					recurse(root, cat);
					return assetArray;
				}.call(this, assets, "assets");

				//clear out all previous assets
				am.getAll().reset();
				// add assets to asset manager.
				for (const asset of AllAssets) {
					am.add(
						new grapesAsset(
							asset.category,
							asset.src //update paths to point to project local server
						)
					);
				}
				am.render(); //show the new list of assets
				GeneratePreviews(am);
				// console.log("all assets: ", am.getAll().models);
			} else if (this.status === 400) {
				console.log(
					"ERROR Grapes.StorageManager.loadData api response: " +
					this.responseText
				);
			}
		}
	};

	// request project structure file from project local server
	xhttp.open("GET", config.apiBaseURL + "project/files");
	xhttp.send();
}

export function SortAssets(
	am: AssetManagerInstance,
	config: any,
	list: grapesAsset[]
) {
	list.sort((n1, n2) => {
		let v1: string = n1.src
			.split("/")
			.reverse()[0]
			.toLowerCase();
		let v2: string = n2.src
			.split("/")
			.reverse()[0]
			.toLowerCase();
		return v1 > v2 ? -1 : 1;
	});

	am.getAll().reset();
	for (const asset in list) {
		//console.log("Add: " + list[asset].src.split("/").reverse()[0]);
		am.add(list[asset]);
	}

	am.render();
	GeneratePreviews(am);
}

const refresh =
	'<div class="d-flex justify-content-end gjs-am-assets-header"> \
	<button class="gjs-btn-prim"> <i class="fa fa-file"></i> Refresh </button> \
	</div>';

function AppendHTML(am: AssetManagerInstance, config: any) {
	// console.log("appendHTML");
	am.render();
	const assetWindow: Element = am.getContainer();
	assetWindow.insertAdjacentHTML("afterbegin", refresh);
	const refreshButton: HTMLButtonElement = assetWindow.querySelector("button")!;
	refreshButton.addEventListener("click", () => {
		SyncProjectAssets(am, config);
	});
}
var anims = {}; //dictionary of lottie objs
export function GeneratePreviews(am: AssetManagerInstance) {
	//loop through models of animated svg type to get the cid
	const animatedTypes = am
		.getAll()
		.filter(x => x.get("type") == "animated-svg");
	// console.log("found these animated svgs assets", animatedTypes);
	//initialize lotties using cid
	for (const aSVG of animatedTypes) {
		if (anims[aSVG.cid] != undefined) {
			anims[aSVG.cid].wrapper.removeEventListener("mouseenter", () => {
				anims[aSVG.cid].play();
			});
			anims[aSVG.cid].wrapper.removeEventListener("mouseleave", () => {
				anims[aSVG.cid].pause();
			});
			anims[aSVG.cid].destroy();
		}
		const previewElem = document.getElementById(aSVG.cid);
		if (previewElem != undefined) {
			const anim = lottie.loadAnimation({
				container: previewElem,
				renderer: "svg",
				loop: true,
				autoplay: false, //wait until data_ready before determining when to play
				path: aSVG.get("src"),
				name: aSVG.cid
			});
			//@ts-ignore
			anim.addEventListener("data_ready", () => {
				// console.log("data_ready:", anim.name);
				//@ts-ignore
				anim.wrapper.addEventListener("mouseenter", () => {
					anim.play();
				});
				//@ts-ignore
				anim.wrapper.addEventListener("mouseleave", () => {
					anim.pause();
				});
			});
			anims[aSVG.cid] = anim;
			// console.log("lottie preview: ", aSVG.cid, previewElem);
		}
	}
}

export class grapesAsset implements AssetManagerAsset {
	constructor(public category: string, public src: string) { }
}
