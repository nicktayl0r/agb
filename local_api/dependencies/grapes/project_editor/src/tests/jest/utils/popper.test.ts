/**
 * @jest-environment jsdom
 */
import { ClosePopper, Popper } from "../../../utils/popper";

describe("popper utility", () => {
	beforeEach(() => {
		//create a dummy template div with a close button.
		document.body.innerHTML = `<div id="styleTemplate>
		<button id="popperClose"></button>
		</div>`;
		// //create an element to attach to
		// const button = document.createElement("button");
		// document.body.appendChild(button);
	});


	test('popper is created', () => {
		const button = document.createElement("button");
		Popper("sectionName", "rubricType", button);
		const popper = document.getElementById('popper');
		expect(popper).toBeDefined();
	});

	test("popper is removed when closed", () => {
		let popper = document.getElementById('popper');
		expect(popper).toBeDefined();
		ClosePopper();
		popper = document.getElementById('popper');
		expect(popper).toBe(null);
	});
});
