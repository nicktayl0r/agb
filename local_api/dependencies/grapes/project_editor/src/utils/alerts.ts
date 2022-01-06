import swal from "sweetalert";

export function ShowSuccess(heading: string, ...message: string[]) {
	swal({
		title: heading,
		text: message.join(""),
		icon: "success"
		// buttons: [true, "Rockin", false, "Cancel"],
	});
}

export function ShowFailure(heading: string, ...message: string[]) {
	swal({
		title: heading,
		text: message.join(""),
		icon: "error"
		// buttons: [true, "Rockin", false, "Cancel"],
	});
}

export function ShowWarning(heading: string, ...message: string[]) {
	swal({
		title: heading,
		text: message.join(""),
		icon: "warning"
		// buttons: [true, "Rockin", false, "Cancel"],
	});
}

export function ShowWarningDialog(
	heading: string,
	onConfirm: () => void,
	onCancel: () => void,
	...message: string[]
) {
	swal({
		title: heading,
		text: message.join(""),
		icon: "warning",
		buttons: [true, true]
	}).then(value => {
		console.log("dialog value", value);
		if (value) {
			onConfirm();
		} else onCancel();
	});
}
