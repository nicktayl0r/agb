import axios from "axios";
import { EventEmitter } from "events";

export default class Editor {
	editorInstance: JSONEditor<object>;
	emitter: EventEmitter;
	constructor(elementID: string, config: JSONEditorOptions<object>) {
		config.theme = "bootstrap3";
		config.iconlib = "fontawesome4";
		// config.template = "handlebars";
		// console.log("elementID: " + elementID);
		this.editorInstance = new JSONEditor(
			document.getElementById(elementID)!,
			config
		);
		// return this.editor_instance;
		axios.defaults.headers.post["Content-Type"] = "application/json";
		const url = window.location.href;
		const split = url.split("/");
		console.log(split);
		if (split.length >= 3) {
			if (split[2].includes("8080") || split[2].includes("8081"))
				axios.defaults.baseURL = "http://localhost:8000/api/";
			else {
				split.length = 3;
				axios.defaults.baseURL = split.join("/") + "/api/";
			}
		} else axios.defaults.baseURL = "api/";

		this.editorInstance.on("ready", () => {
			this.editorReady();
		});
		this.emitter = new EventEmitter();
	}

	editorReady() {
		//overridable
	}

	requestData(url: string) {
		//get request
		axios
			.get(url)
			.then(res => {
				// console.log(res);
				//set value
				this.editorInstance.setValue(res.data);
				this.editorInitialized();
			})
			.catch(error => {
				console.log(error);
			});
	}

	editorInitialized() {
		//overridable
	}
}
