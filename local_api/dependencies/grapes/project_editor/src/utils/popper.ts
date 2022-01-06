import { createPopper } from "@popperjs/core";

let popperInstance: any = null; //Instance type

export function Popper(
	sectionName: string,
	rubricType: string,
	buttonElement: Element
) {
	const template = document.getElementById(
		"styleTemplate"
	) as HTMLTemplateElement;
	ClosePopper();
	if (template !== null) {
		const contentNode = template!.content.cloneNode(true);

		const parentElement = document.createElement('div');
		parentElement.id = "popper"
		parentElement.appendChild(contentNode);
		document.body.appendChild(parentElement);
		// console.log(popperHTML);
		const closeButton = document.getElementById(
			"popperClose"
		)
		closeButton?.addEventListener("click", ClosePopper);
		popperInstance = createPopper(buttonElement, parentElement, {
			placement: "left",
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 5],
					},
				},
			],
		});

		const customId = sectionName + "-" + rubricType.replace(/ /g, "");
		// console.log("show", customId);
		const styleSection = document.getElementById(customId);
		if (styleSection !== null) styleSection.style.display = "block";
	}
}

export function ClosePopper() {
	if (popperInstance !== null) {
		popperInstance.destroy();
		popperInstance = null;
		const oldPopper = document.getElementById("popper");
		if (oldPopper !== null) oldPopper.remove();
	}
}