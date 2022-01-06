import grapesjs from "grapesjs";

export default (editor: grapesjs.EditorInstance, config) => {
	const sm = editor.StyleManager;

	const lengthUnits = [
		{
			value: "0",
			name: "none"
		},
		{
			value: "var(--length1)",
			name: "length1"
		},
		{
			value: "var(--length2)",
			name: "length2"
		},
		{
			value: "var(--length3)",
			name: "length3"
		},
		{
			value: "var(--length4)",
			name: "length4"
		}
	];

	const unitArray = ["vh", "vw", "rem", "em", "%", "px"];

	sm.addSector("General", {
		name: "General",
		open: false,
		buildProps: [
			"display",
			"position",
			"top",
			"right",
			"bottom",
			"left",
			"float"
		],
		properties: [
			{
				name: "Display",
				property: "display",
				type: "select",
				list: [
					{ value: "block" },
					{ value: "inline" },
					{ value: "inline-block" },
					{ value: "grid" },
					{ value: "inline-grid" },
					{ value: "flex" },
					{ value: "inline-flex" },
					{ value: "none" }
				]
			},
			{
				name: "Alignment",
				property: "float",
				type: "radio",
				defaults: "none",
				list: [
					{ value: "none", title: "none", className: "fa fa-times" },
					{ value: "left", title: "left", className: "fa fa-align-left" },
					{ value: "right", title: "right", className: "fa fa-align-right" }
				]
			},
			{
				name: "Vertical Align",
				property: "vertical-align",
				type: "select",
				defaults: "baseline",
				list: [
					{ value: "baseline" },
					{ value: "sub" },
					{ value: "super" },
					{ value: "top" },
					{ value: "text-top" },
					{ value: "middle" },
					{ value: "bottom" },
					{ value: "text-bottom" }
				]
			},
			{ property: "position", type: "select" }
		]
	});

	sm.addSector("Dimension", {
		name: "Dimension",
		open: false,
		buildProps: [
			"width",
			"height",
			"max-width",
			"min-height",
			"margin",
			"padding"
		],
		properties: [
			{
				property: "margin",
				properties: [
					{ name: "Top", property: "margin-top" },
					{ name: "Right", property: "margin-right" },
					{ name: "Bottom", property: "margin-bottom" },
					{ name: "Left", property: "margin-left" }
				]
			},
			{
				property: "padding",
				properties: [
					{ name: "Top", property: "padding-top" },
					{ name: "Right", property: "padding-right" },
					{ name: "Bottom", property: "padding-bottom" },
					{ name: "Left", property: "padding-left" }
				]
			}
		]
	});

	sm.addSector("Typography", {
		name: "Typography",
		open: false,
		buildProps: [
			"font-family",
			"font-size",
			"font-weight",
			"letter-spacing",
			"color",
			"line-height",
			"text-align",
			"text-decoration",
			"text-shadow"
		],
		properties: [
			{
				name: "Font",
				property: "font-family",
				list: [
					{ value: "Roboto, sans-serif", name: "Roboto, sans-serif" },
					{ value: "Roboto", name: "Roboto" }
				],
				defaults: "Roboto, sans-serif"
			},
			{ name: "Weight", property: "font-weight" },
			{ name: "Font color", property: "color" },
			{
				property: "text-align",
				type: "radio",
				defaults: "left",
				list: [
					{ value: "left", title: "left", className: "fa fa-align-left" },
					{ value: "center", title: "center", className: "fa fa-align-center" },
					{ value: "right", title: "right", className: "fa fa-align-right" },
					{
						value: "justify",
						title: "justify",
						className: "fa fa-align-justify"
					}
				]
			},
			{
				property: "text-decoration",
				type: "radio",
				defaults: "none",
				list: [
					{ value: "none", title: "none", className: "fa fa-times" },
					{
						value: "underline",
						title: "underline",
						className: "fa fa-underline"
					},
					{
						value: "line-through",
						title: "line-through",
						className: "fa fa-strikethrough"
					}
				]
			},
			{
				property: "text-shadow",
				properties: [
					{ name: "X position", property: "text-shadow-h" },
					{ name: "Y position", property: "text-shadow-v" },
					{ name: "Blur", property: "text-shadow-blur" },
					{ name: "Color", property: "text-shadow-color" }
				]
			}
		]
	});

	sm.addSector("Decorations", {
		name: "Decorations",
		open: false,
		buildProps: [
			"opacity",
			"border-radius",
			"border",
			"box-shadow",
			"background",
			"background-color"
		],
		properties: [
			{
				type: "slider",
				property: "opacity",
				defaults: 1,
				step: 0.01,
				max: 1,
				min: 0
			},
			{
				property: "border-radius",
				properties: [
					{ name: "Top", property: "border-top-left-radius" },
					{ name: "Right", property: "border-top-right-radius" },
					{ name: "Bottom", property: "border-bottom-left-radius" },
					{ name: "Left", property: "border-bottom-right-radius" }
				]
			},
			{
				property: "box-shadow",
				properties: [
					{ name: "X position", property: "box-shadow-h" },
					{ name: "Y position", property: "box-shadow-v" },
					{ name: "Blur", property: "box-shadow-blur" },
					{ name: "Spread", property: "box-shadow-spread" },
					{ name: "Color", property: "box-shadow-color" },
					{ name: "Shadow type", property: "box-shadow-type" }
				]
			},
			{
				property: "background",
				properties: [
					{ name: "Image", property: "background-image" },
					{ name: "Repeat", property: "background-repeat" },
					{ name: "Position", property: "background-position" },
					{ name: "Attachment", property: "background-attachment" },
					{ name: "Size", property: "background-size" }
				]
			}
		]
	});

	sm.addSector("Extra", {
		name: "Extra",
		open: false,
		buildProps: ["transition", "perspective", "transform"],
		properties: [
			{
				property: "transition",
				properties: [
					{ name: "Property", property: "transition-property" },
					{ name: "Duration", property: "transition-duration" },
					{ name: "Easing", property: "transition-timing-function" }
				]
			},
			{
				property: "transform",
				properties: [
					{ name: "Rotate X", property: "transform-rotate-x" },
					{ name: "Rotate Y", property: "transform-rotate-y" },
					{ name: "Rotate Z", property: "transform-rotate-z" },
					{ name: "Scale X", property: "transform-scale-x" },
					{ name: "Scale Y", property: "transform-scale-y" },
					{ name: "Scale Z", property: "transform-scale-z" }
				]
			}
		]
	});

	// add "em" and "rem" to units for all that are ["px","%"]
	const sectors = sm.getSectors();
	//console.log("sectors", sectors);

	for (let sector of sectors.models) {
		const properties = sector.get("properties");
		addEmsRems(properties);
	}

	function addEmsRems(properties) {
		//console.log("properties", properties);
		for (let prop of properties.models) {
			//console.log("prop", prop);
			const propName = prop.get("name");

			const units = prop.get("units");
			let unit = prop.get("unit");
			if (units) {
				//console.log("units", units, propName);
			  if(units.length && units[0] !== "deg") {
					// we use vh as the basis for sizing the case, if there are other units available, add vh to that list
					// set vh as the default unit
					units.push('vh');
					prop.set("unit", "vh")
				}

				if (units[0] == "px" && units[1] == "%") {

					// console.log("yep", propName);

					if (prop.type !== "select") {
						prop.set("units", unitArray);
						prop.set("unit", "vh");
					}

					if (prop.input) {
						prop.input.unitEl = null;
						prop.input.getUnitEl();
					}
					//console.log("input?", prop.input);
				}
			}
			if(propName === "Max width" || propName === "Max height") {
				prop.set("units", [...units, "none", "max-content", "min-content"]);
				prop.set("defaults", "none");
				prop.set("fixedValues", ["auto", "none"]);
			}
			if (prop.get("type") === "composite") {
				addEmsRems(prop.get("properties"));
			}
		}
	}

	sm.addSector("css-grid", {
		name: "Grid Container",
		open: false,
		properties: [
			{
				name: "Columns",
				property: "grid-template-columns",
				type: "stack",
				properties: [
					{
						name: "track-size",
						type: "integer",
						defaults: "1",
						units: ["fr"].concat(unitArray),
						fixedValues: ["min-content", "max-content", "auto"]
					}
				]
			},
			{
				name: "Rows",
				property: "grid-template-rows",
				type: "stack",
				properties: [
					{
						name: "track-size",
						type: "integer",
						defaults: "1",
						units: ["fr"].concat(unitArray),
						fixedValues: ["min-content", "max-content", "auto"]
					}
				]
			},
			{
				name: "Column Gap",
				property: "grid-column-gap",
				type: "integer",
				units: unitArray,
				defaults: "0",
				min: 0
			},
			{
				name: "Row Gap",
				property: "grid-row-gap",
				type: "integer",
				units: unitArray,
				defaults: "0",
				min: 0
			},
			{
				name: "Justify Items",
				property: "justify-items",
				type: "radio",
				defaults: "center",
				list: [
					{
						value: "start",
						title: "Start",
						className: "icons-flex icon-al-start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-al-end"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-al-center"
					}
				]
			},
			{
				name: "Align Items",
				property: "align-items",
				type: "radio",
				defaults: "stretch",
				list: [
					{
						value: "start",
						title: "Start",
						className: "icons-flex icon-al-start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-al-end"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-al-center"
					}
				]
			},
			{
				name: "Justify Content",
				property: "justify-content",
				type: "select",
				defaults: "start",
				list: [
					{
						value: "start",
						className: "icons-flex icon-just-start",
						title: "Start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-just-end"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-just-sp-cent"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "space-around",
						title: "Space around",
						className: "icons-flex icon-just-sp-ar"
					},
					{
						value: "space-between",
						title: "Space between",
						className: "icons-flex icon-just-sp-bet"
					},
					{
						value: "space-evenly",
						title: "Space evenly"
					}
				]
			},
			{
				name: "Align Content",
				property: "align-content",
				type: "select",
				defaults: "start",
				list: [
					{
						value: "start",
						className: "icons-flex icon-just-start",
						title: "Start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-just-end"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-just-sp-cent"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "space-around",
						title: "Space around",
						className: "icons-flex icon-just-sp-ar"
					},
					{
						value: "space-between",
						title: "Space between",
						className: "icons-flex icon-just-sp-bet"
					},
					{
						value: "space-evenly",
						title: "Space evenly"
					}
				]
			}
		]
	});
	const colProp = sm.getProperty("css-grid", "grid-template-columns");
	const rowProp = sm.getProperty("css-grid", "grid-template-rows");
	const colLayers = colProp.get("layers");
	const rowLayers = rowProp.get("layers");

	// by default grapes renders layers to css with a comma and spaces separating them
	// we want to separate these with only a space, so we need to do our won parsing
	const getLayersFromValueFunc = function (value: string) {
		const layers = [];
		let layerValues: string[] = [];
		if (value) {
			// console.log("grid template value", value);
			const backwardsCompatibilityRegex = /repeat\(([0-9]+),\s*([0-9]+[a-zA-Z%]+)\)/g;
			const matches = backwardsCompatibilityRegex.exec(value);
			if (matches) {
				const repeat = Number(matches[1]);
				const units = matches[2];
				// console.log("back compat repeat", repeat, "units", units);
				for (let i = 0; i < repeat; i++) {
					layerValues.push(units);
				}
			} else {
				layerValues = value.split(" ");
			}
		}
		layerValues.forEach(layerValue => {
			//@ts-ignore
			layers.push({ properties: this.properties.parseValue(layerValue) });
		});
		return layers;
	};
	colLayers.getLayersFromValue = getLayersFromValueFunc;
	rowLayers.getLayersFromValue = getLayersFromValueFunc;

	// and joining
	const getFullValFunc = function (val) {
		let result = [];
		//@ts-ignore
		this.each(layer => result.push(layer.getFullValue()));
		return result.join(" ");
	};
	colLayers.getFullValue = getFullValFunc;
	rowLayers.getFullValue = getFullValFunc;

	sm.addSector("css-grid-item", {
		name: "Grid Item",
		open: false,
		properties: [
			{
				name: "Column Start",
				property: "grid-column-start",
				type: "integer",
				min: 1
			},
			{
				name: "Column End",
				property: "grid-column-end",
				type: "integer",
				min: 2
			},
			{
				name: "Row Start",
				property: "grid-row-start",
				type: "integer",
				min: 1
			},
			{
				name: "Row End",
				property: "grid-row-end",
				type: "integer",
				min: 2
			},
			{
				name: "Justify Self",
				property: "justify-self",
				type: "radio",
				defaults: "stretch",
				list: [
					{
						value: "start",
						title: "Start",
						className: "icons-flex icon-al-start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-al-end"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-al-center"
					}
				]
			},
			{
				name: "Align Self",
				property: "align-self",
				type: "radio",
				defaults: "stretch",
				list: [
					{
						value: "start",
						title: "Start",
						className: "icons-flex icon-al-start"
					},
					{
						value: "end",
						title: "End",
						className: "icons-flex icon-al-end"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-al-center"
					}
				]
			}
		]
	});

	sm.addSector("flex", {
		name: "Flex Container",
		open: false,
		properties: [
			{
				name: "Direction",
				property: "flex-direction",
				type: "radio",
				defaults: "row",
				list: [
					{
						value: "row",
						name: "Row",
						className: "icons-flex icon-dir-row",
						title: "Row"
					},
					{
						value: "row-reverse",
						name: "Row reverse",
						className: "icons-flex icon-dir-row-rev",
						title: "Row reverse"
					},
					{
						value: "column",
						name: "Column",
						title: "Column",
						className: "icons-flex icon-dir-col"
					},
					{
						value: "column-reverse",
						name: "Column reverse",
						title: "Column reverse",
						className: "icons-flex icon-dir-col-rev"
					}
				]
			},
			{
				name: "Flex Wrap",
				property: "flex-wrap",
				type: "select",
				defaults: "nowrap",
				list: [
					{ value: "nowrap" },
					{ value: "wrap" },
					{ value: "wrap-reverse" }
				]
			},
			{
				name: "Justify Content",
				property: "justify-content",
				type: "radio",
				defaults: "flex-start",
				list: [
					{
						value: "flex-start",
						className: "icons-flex icon-just-start",
						title: "Start"
					},
					{
						value: "flex-end",
						title: "End",
						className: "icons-flex icon-just-end"
					},
					{
						value: "space-between",
						title: "Space between",
						className: "icons-flex icon-just-sp-bet"
					},
					{
						value: "space-around",
						title: "Space around",
						className: "icons-flex icon-just-sp-ar"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-just-sp-cent"
					}
				]
			},
			{
				name: "Align Items",
				property: "align-items",
				type: "radio",
				defaults: "stretch",
				list: [
					{
						value: "flex-start",
						title: "Start",
						className: "icons-flex icon-al-start"
					},
					{
						value: "flex-end",
						title: "End",
						className: "icons-flex icon-al-end"
					},
					{
						value: "stretch",
						title: "Stretch",
						className: "icons-flex icon-al-str"
					},
					{
						value: "center",
						title: "Center",
						className: "icons-flex icon-al-center"
					}
				]
			},
			{
				name: "Align Content",
				property: "align-content",
				type: "select",
				defaults: "stretch",
				list: [
					{ value: "flex-start" },
					{ value: "flex-end" },
					{ value: "center" },
					{ value: "space-between" },
					{ value: "space-around" },
					{ value: "stretch" }
				]
			}
		]
	});

	sm.addSector("flex-item", {
		name: "Flex Item",
		open: false,
		properties: [
			{
				name: "Order",
				property: "order",
				type: "integer",
				defaults: 0,
				min: 0
			},
			{
				name: "Flex",
				property: "flex",
				type: "composite",
				properties: [
					{
						name: "Grow",
						property: "flex-grow",
						type: "integer",
						defaults: 0,
						min: 0
					},
					{
						name: "Shrink",
						property: "flex-shrink",
						type: "integer",
						defaults: 0,
						min: 0
					},
					{
						name: "Basis",
						property: "flex-basis",
						type: "integer",
						units: ["px", "%", "", "vh"],
						unit: "",
						defaults: "auto"
					}
				]
			},
			{
				name: "Align Self",
				property: "align-self",
				type: "select",
				defaults: "auto",
				list: [
					{ value: "auto" },
					{ value: "flex-start" },
					{ value: "flex-end" },
					{ value: "center" },
					{ value: "baseline" },
					{ value: "stretch" }
				]
			}
		]
	});
};
