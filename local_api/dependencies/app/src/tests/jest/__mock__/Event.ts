class dataTransfer {
	data: any = {};

	getData(name: string) {
	  return this.data[name];
	}

	setData(name: string, value: string) {
	  this.data[name] = value;
	}
}

export function MockDragEvent(type: string): Event {
  const e = new Event(type, { bubbles: true });
  //@ts-ignore
  e.dataTransfer = new dataTransfer();
  return e;
}
