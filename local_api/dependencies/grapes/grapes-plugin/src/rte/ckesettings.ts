declare var CKEDITOR: any;

export default function() {
	//hacky fix to let you edit spans: https://stackoverflow.com/questions/14575036/enable-ckeditor4-inline-on-span-and-other-inline-tags
	CKEDITOR.dtd.$editable.span = 1;
	CKEDITOR.dtd.$editable.a = 1;
	CKEDITOR.dtd.$editable.widgetlink = 1;
	// console.log("CKEDITOR.dtd.$editable: " + JSON.stringify(CKEDITOR.dtd.$editable));
	CKEDITOR.dtd.$editable["widget-link"] = 1;

	CKEDITOR.config.contentsCss = "./dist/css/vue-extracted-styles.css"; //set the css to use our case css so the style previews will work
	// CKEDITOR.config.extraPlugins = "stylesheetparser";
	// CKEDITOR.config.stylesheetParser_validSelectors = /\.color\w+/; //trying to get it to auto generate defintions... but it's not working.
	// CKEDITOR.config.contentsCss = 'sample_CSS_file.css'; //example
	// CKEDITOR.config.stylesSet = []; //example
	CKEDITOR.config.stylesSet = [
		//set the options in the style dropdown
		{
			name: "Glossary",
			element: "span",
			attributes: { class: "linkGlossaryTerm" }
		},
		{
			name: "white",
			element: "span",
			attributes: { class: "colorWhite" }
		},
		{
			name: "Black",
			element: "span",
			attributes: { class: "colorBlack" }
		},
		{
			name: "Grey1",
			element: "span",
			attributes: { class: "colorGrey1" }
		},
		{
			name: "Grey2",
			element: "span",
			attributes: { class: "colorGrey2" }
		},
		{
			name: "Grey3",
			element: "span",
			attributes: { class: "colorGrey3" }
		},
		{
			name: "Grey4",
			element: "span",
			attributes: { class: "colorGrey4" }
		},
		{
			name: "Grey5",
			element: "span",
			attributes: { class: "colorGrey5" }
		},
		{
			name: "Grey6",
			element: "span",
			attributes: { class: "colorGrey6" }
		},
		{
			name: "Grey7",
			element: "span",
			attributes: { class: "colorGrey7" }
		},
		{
			name: "Red1",
			element: "span",
			attributes: { class: "colorRed1" }
		},
		{
			name: "Red2",
			element: "span",
			attributes: { class: "colorRed2" }
		},
		{
			name: "Red3",
			element: "span",
			attributes: { class: "colorRed3" }
		},
		{
			name: "Orange1",
			element: "span",
			attributes: { class: "colorOrange1" }
		},
		{
			name: "Orange2",
			element: "span",
			attributes: { class: "colorOrange2" }
		},
		{
			name: "Orange3",
			element: "span",
			attributes: { class: "colorOrange3" }
		},
		{
			name: "Orange4",
			element: "span",
			attributes: { class: "colorOrange4" }
		},
		{
			name: "Orange5",
			element: "span",
			attributes: { class: "colorOrange5" }
		},
		{
			name: "Yellow1",
			element: "span",
			attributes: { class: "colorYellow1" }
		},
		{
			name: "Yellow2",
			element: "span",
			attributes: { class: "colorYellow2" }
		},
		{
			name: "Yellow3",
			element: "span",
			attributes: { class: "colorYellow3" }
		},
		{
			name: "Green1",
			element: "span",
			attributes: { class: "colorGreen1" }
		},
		{
			name: "Green2",
			element: "span",
			attributes: { class: "colorGreen2" }
		},
		{
			name: "Green3",
			element: "span",
			attributes: { class: "colorGreen3" }
		},
		{
			name: "Green4",
			element: "span",
			attributes: { class: "colorGreen4" }
		},
		{
			name: "Green5",
			element: "span",
			attributes: { class: "colorGreen5" }
		},
		{
			name: "Teal1",
			element: "span",
			attributes: { class: "colorTeal1" }
		},
		{
			name: "Teal2",
			element: "span",
			attributes: { class: "colorTeal2" }
		},
		{
			name: "Teal3",
			element: "span",
			attributes: { class: "colorTeal3" }
		},
		{
			name: "Blue1",
			element: "span",
			attributes: { class: "colorBlue1" }
		},
		{
			name: "Blue2",
			element: "span",
			attributes: { class: "colorBlue2" }
		},
		{
			name: "Blue3",
			element: "span",
			attributes: { class: "colorBlue3" }
		},
		{
			name: "Blue4",
			element: "span",
			attributes: { class: "colorBlue4" }
		},
		{
			name: "Blue5",
			element: "span",
			attributes: { class: "colorBlue5" }
		},
		{
			name: "Blue6",
			element: "span",
			attributes: { class: "colorBlue6" }
		},
		{
			name: "Blue7",
			element: "span",
			attributes: { class: "colorBlue7" }
		},
		{
			name: "Indigo1",
			element: "span",
			attributes: { class: "colorIndigo1" }
		},
		{
			name: "Indigo2",
			element: "span",
			attributes: { class: "colorIndigo2" }
		},
		{
			name: "Purple1",
			element: "span",
			attributes: { class: "colorPurple1" }
		},
		{
			name: "Purple2",
			element: "span",
			attributes: { class: "colorPurple2" }
		},
		{
			name: "Purple3",
			element: "span",
			attributes: { class: "colorPurple3" }
		},
		{
			name: "Purple4",
			element: "span",
			attributes: { class: "colorPurple4" }
		},
		{
			name: "Pink1",
			element: "span",
			attributes: { class: "colorPink1" }
		},
		{
			name: "Pink2",
			element: "span",
			attributes: { class: "colorPink2" }
		},
		{
			name: "Pink3",
			element: "span",
			attributes: { class: "colorPink3" }
		}
	];
	// console.log("ckEditor: ", CKEDITOR);
}
