// import * as Backbone from "backbone";
declare let grapesjs: grapesjs.GrapesInstance;
export = grapesjs;

declare namespace grapesjs {
	interface InitConfig {
		container: string | HTMLElement;
		autorender: boolean;
		plugins: any[];
		pluginOptions: object;
	}

	interface GrapesInstance {
		$: any;
		editors: EditorInstance[];
		plugins: PluginManagerInstance;
		version: string;

		init(config: InitConfig | Object): EditorInstance;
	}

	interface EditorConfig {
		container: string;
		components: string | Array<object>;
		style: string | Array<object>;
		fromElement: boolean;
		undoManager: boolean;
		autorender: boolean;
		noticeOnUnload: boolean;
		height: string;
		width: string;
		storage: object;
		styleManager: object;
		commands: object;
		domComponents: object;
		panels: object;
		showDevices: boolean;
		defaultCommand: string;
		plugins: any[];
		pluginsOpts: object;
	}

	interface EditorInstance {
		$: any;
		editor(config: EditorConfig): EditorInstance;
		DomComponents: DomComponentsInstance;
		LayerManager: LayerManagerInstance;
		CssComposer: CSSComposerInstance;
		StorageManager: StorageManagerInstance;
		AssetManager: AssetManagerInstance;
		BlockManager: BlockManagerInstance;
		TraitManager: TraitManagerInstance;
		SelectorManager: SelectorManagerInstance;
		CodeManager: any; // TODO define
		Commands: any; // TODO define
		Keymaps: any; // TODO define
		Modal: ModalInstance; // TODO define
		Panels: PanelsInstance;
		StyleManager: any; // TODO define
		Canvas: CanvasInstance;
		UndoManager: any; // TODO define
		DeviceManager: DeviceManagerInstance;
		RichTextEditor: RichTextEditorInstance;
		Utils: any;
		Config: any;
		init(): EditorInstance;
		getConfig(prop?: string): any;
		getHtml(opts?: object): string;
		getCss(opts: object): string;
		getJS(): string;
		getComponents(): object;
		setComponents(components: Array<object> | object | string): EditorInstance;
		addComponents(
			components: Array<object> | object | string,
			opts: object
		): Backbone.Model | Array<Backbone.Model>;
		getStyle(): object;
		setStyle(style: Array<object> | object | string): EditorInstance;
		getSelected(): Backbone.Model;
		getSelectedToStyle(): Backbone.Model;
		select(el: Component | HTMLElement): EditorInstance;
		setDevice(name: string): EditorInstance;
		getDevice(): string;
		runCommand(id: string, options: object): any;
		stopCommand(id: string, options: object): any;
		store(clb: Function): object;
		load(clb: Function): object;
		getContainer(): HTMLElement;
		refresh(): void;
		setCustomRte(obj: object): void;
		on(event: string, callback: Function): EditorInstance;
		off(event: string, callback: Function): EditorInstance;
		trigger(event: string): EditorInstance;
		getEl(): HTMLElement;
		getModel(): EditorModel;
		render(): HTMLElement;
	}

	interface EditorModel extends Backbone.Model {
		getConfig(prop: string): any;
		loadOnStart(clb: Function): any;
		updateChanges(): void;
		loadModule(moduleName: string): EditorModel;
		init(editor: EditorInstance): EditorModel;
		getEditor(): EditorInstance;
		handleUpdates(model: object, val: any, opt: object): any;
		componentSelected(model: Backbone.Model, val: any, options: object): any;
		getSelected(): Component | null;
		setSelected(el: Component | HTMLElement, opts: object): void;
		setComponents(components: object | string): EditorModel;
		getComponents(): Array<Component>;
		setStyle(style: object | string): EditorModel;
		getStyle(): any;
		getHtml(): string;
		getCss(opts: object): string;
		getJs(): string;
		store(clb: Function): object;
		load(clb: Function): void;
		getCacheLoad(force: boolean, clb: Function): object;
		getDeviceModel(): Device | null;
		runDefault(opts: object): void;
		stopDefault(opts: object): void;
		refreshCanvas(): void;
		clearSelection(win: Window): void;
		getCurrentMedia(): string;
		data(el: HTMLElement, name: string, value: any): any;
	}

	interface CanvasInstance {
		getCanvasView(): any; //returns CanvasView TODO define that
		name: string;
		init(config: object): void;
		getConfig(): object;
		setWrapper(wrp: object): void;
		getElement(): HTMLElement;
		getFrameEl(): HTMLElement;
		getBody(): HTMLElement;
		getWrapperEl(): HTMLElement;
		getToolsEl(): HTMLElement;
		getHighlighter(): HTMLElement;
		getBadgeEl(): HTMLElement;
		getPlacerEl(): HTMLElement;
		getGhostEl(): HTMLElement;
		getToolbarEl(): HTMLElement;
		getResizerEl(): HTMLElement;
		getOffsetViewerEl(): HTMLElement;
		getFixedOffsetViewerEl(): HTMLElement;
		render(): HTMLElement;
		getOffset(): object;
		offset(el: HTMLElement): object;
		setCustomBadgeLabel(f: Function): void;
		getElementPos(el: HTMLElement, opts: object): object;
		/**
		 * This method comes handy when you need to attach something like toolbars
		 * to elements inside the canvas, dealing with all relative position,
		 * offsets, etc. and returning as result the object with positions which are
		 * viewable by the user (when the canvas is scrolled the top edge of the element
		 * is not viewable by the user anymore so the new top edge is the one of the canvas)
		 *
		 * The target should be visible before being passed here as invisible elements
		 * return empty string as width
		 * @param {HTMLElement} target The target in this case could be the toolbar
		 * @param {HTMLElement} element The element on which I'd attach the toolbar
		 * @param {Object} options Custom options
		 * options.toRight - Set to true if you want the toolbar attached to the right
		 */
		getTargetToElementDim(
			target: HTMLElement,
			element: HTMLElement,
			options: object
		): object;
		/**
		 * Instead of simply returning e.clientX and e.clientY this function
		 * calculates also the offset based on the canvas. This is helpful when you
		 * need to get X and Y position while moving between the editor area and
		 * canvas area, which is in the iframe
		 * */
		getMouseRelativePos(e: Event, options: object): object;
		/**
		 * X and Y mouse position relative to the canvas
		 */
		getMouseRelativeCanvas(e: Event, options: object): object;
		/**
		 * Detects if some input is focused (input elements, text components, etc.)
		 * Used internally, for example, to avoid undo/redo in text editing mode
		 */
		isInputFocused(): boolean;
		startAutoscroll(): void;
		autoscroll(e: Event): void;
		stopAutoscroll(): void;
		getScrollListeners(): Array<HTMLElement>;
		postRender(): void;
		getFrameWrapperEl: HTMLElement;
		droppable: DroppableInstance;
	}

	interface RichTextEditorInstance {
		customRte: object;
		name: string;
		init(opt: object): RichTextEditorInstance;
		postRender(ev: object): void;
		initRte(el: HTMLElement): RichTextEditorInstance;
		add(name: string, action: object): void;
		get(name: string): object;
		getAll(): object;
		remove(name: string): object;
		getToolbarEl(): HTMLElement;
		udpatePosition(): void;
		enable(view: object, rte: RichTextEditorInstance): RichTextEditorInstance;
		disable(view: object, rte: RichTextEditorInstance): RichTextEditorInstance;
	}

	interface Component extends Backbone.Model {
		extend(properties: any, classProperties?: any): any;
		prototype: Component;
		tagName: string;
		type: string;
		name: string;
		removable: boolean;
		draggable: boolean;
		droppable: boolean;
		badgable: boolean;
		styleable: boolean;
		"stylable-require": string;
		unstyleable: string;
		highlightable: boolean;
		copyable: boolean;
		resizable: boolean;
		editable: boolean;
		layerable: boolean;
		selectable: boolean;
		hoverable: boolean;
		void: boolean;
		state: string;
		status: string;
		content: string;
		icon: string;
		style: object;
		attributes: object;
		classes: string;
		script: string;
		traits: Array<string | object>;
		propagate: string;
		toolbar: Array<object>;
		handleRemove(removed: Component): void;
		is(type: string): boolean;
		find(query: string): Array<Backbone.Model>;
		closest(query: string): Component;
		tagUpdated(): void;
		attrUpdated(): void;
		setAttributes(attrs: object): void;
		addAttributes(attrs: object): void;
		getStyle(): any;
		setStyle(prop: object, opts: object): object;
		getAttributes(): object;
		addClass(classes: Array<string> | string): Array<string>;
		setClass(classes: Array<string> | string): Array<string>;
		removeClass(classes: Array<string> | string): Array<string>;
		initClasses(): void;
		initComponents(): void;
		init(): void;
		append(components: Component | string, opts: object): Array<Component>;
		/** Set new collection if `components` are provided, otherwise the
		 * current collection is returned */
		components(
			components: Component | string
		): Backbone.Collection<Component> | undefined;
		/** Get parent model */
		parent(): Component;
		scriptUpdated(): void;
		traitsUpdated(): void;
		initToolbar(): void;
		loadTraits(traits: Array<Trait>, opts: object): Component;
		/** Normalize input classes from array to array of objects */
		normalizeClasses(arr: Array<string> | Array<object>): Array<object>;
		clone(): Component;
		getName(): string;
		getIcon(): string;
		toHTML(opts: object): string;
		/** Returns object of attributes for HTML */
		getAttrToHTML(): object;
		/** Return a shallow copy of the model's attributes for JSON stringification. */
		toJSON(...args: any[]): object;
		/** Return model id */
		getId(): string;
		/** Get the DOM element of the model. This works only if the model is alredy rendered */
		getEl(): HTMLElement;
		/**
		 * Return script in string format, cleans 'function() {..' from scripts
		 * if it's a function */
		getScriptString(script: string | Function): string;
		emitUpdate(property: any): any;
		isComponent(el: HTMLElement): object;
		createId(model: Component): string;
		getList(): object;
		opt: any;
	}

	interface ComponentView extends Backbone.View<Component> {
		extend(properties: any, classProperties?: any): any;
		prototype: ComponentView;
		init(): void;
		handleChange(): void;
		importClasses(): void;
		updateState(e: Event): void;
		updateStatus(e: Event): void;
		updateHighlight(): void;
		updateStyle(): void;
		updateClasses(): void;
		setAttribute(name: string, value: string): void;
		getClasses(): Array<string> | null;
		updateAttributes(): void;
		updateContent(): void;
		prevDef(e: Event): void;
		updateScript(): void;
		getChildrenContainer(): void;
		renderChildren(): void;
		renderAttributes(): void;
		onRender(): void;
		model: Component;
		el: HTMLElement;
	}

	interface ComponentType {
		id: string;
		model: Component;
		view: ComponentView;
	}

	interface DomComponentsInstance {
		Component: Component;
		Components: Backbone.Collection<Component>;
		ComponentsView: object;
		componentTypes: Array<ComponentType>;
		componentsById: object;
		getConfig(): object;
		storageKey(): string;
		init(config: object): DomComponentsInstance;
		onLoad(): void;
		postLoad(em: EditorInstance): void;
		handleChanges(model: any, value: any, opts: object): void;
		handleRemoves(model: any, value: any, opts: object): void;
		load(data: object): object;
		store(noStore: boolean): object;
		getComponent(): object;
		getWrapper(): Component;
		getComponents(): Backbone.Collection<Component>;
		addComponent(
			component: object | Component | Array<object>
		): Component | Array<Component>;
		render(): HTMLElement;
		clear(): DomComponentsInstance;
		setComponents(components: object | string): DomComponentsInstance;
		addType(type: string, methods: object): void;
		getType(type: string): ComponentType | undefined;
		componentChanged(): void;
		getTypes(): Array<object>;
		selectAdd(
			component: object | Component | Array<object>,
			opts: object
		): void;
		selectRemove(
			component: object | Component | Array<object>,
			opts: object
		): void;
		componentHovered(): void;
	}

	interface Panel extends Backbone.Model {
		id: string;
		content: string;
		visible: boolean;
		buttons: Button[]; // this might be a collection?
		attributes: object;
		initialize(options: object): void;
	}

	interface Button extends Backbone.Model {
		id: string;
		className: string;
		command: string;
		context: string;
		buttons: Button[]; // this might be a collection?
		attributes: object;
		options: object;
		active: boolean;
		dragDrop: boolean;
		runDefaultCommand: boolean;
		stopDefaultCommand: boolean;
		disable: boolean;
		initialize(options: object): void;
	}

	// interface Modal extends Backbone.Model {
	// 	defaults: object;
	// }

	interface ModalInstance {
		open(): ModalInstance;
		close(): ModalInstance;
		getContent(): string;
		getTitle(): string;
		isOpen(): boolean;
		setContent(content: string | HTMLElement): ModalInstance;
		setTitle(title: string): ModalInstance;
		getModel(): any;
	}

	interface PanelsInstance {
		addButton(panelId: string, button: object | Button): Button | null;
		removeButton(panelId: string, id: string): Button | null;
		addPanel(panel: object | Panel): Panel;
		getButton(panelId: string, id: string): Button | null;
		getPanel(id: string): Panel | null;
		getPanels(): Backbone.Collection<Panel>;
		render(): HTMLElement;
	}

	interface PluginManagerConfig {
		plugins: any[];
	}

	interface PluginManagerInstance {
		plugin_manager(config: PluginManagerConfig): PluginManagerInstance;
		add(id: string, plugin: any): any;
		get(id: string): any;
		getAll(): any;
	}

	interface Selector {
		getFullName(): string;
	}

	interface SelectorManagerInstance {
		add(name: string, opts?: object): Selector;
		addClass(classes: string | Array<string>): Array<string>;
		get(name: string, type?: any): any;
		getAll(): object;
	}

	interface CSSRule {
		getAtRule(): string;
		selectorsToString(opt?: object): string;
		getDeclaration(opt?: object): string;
		toCSS(opt?: object): string;
		compare(
			selectors: object,
			state: string,
			width: string,
			ruleProps?: object
		): boolean;
		set(param: string, value: object): any;
	}

	interface CSSComposerInstance {
		load(data: object): object;
		store(noStore: boolean): object;
		add(
			selectors: Array<Selector>,
			state?: string,
			width?: string,
			opts?: object
		): CSSRule;
		get(
			selectors: Array<Selector>,
			state?: string,
			width?: string,
			ruleProps?: object
		): CSSRule;
		getAll(): any;
		clear(): CSSComposerInstance;
		setIdRule(name: string, style?: object, opts?: object): CSSRule;
		getIdRule(name: string, opts?: object): CSSRule;
		setClassRule(name: string, style?: object, opts?: object): CSSRule;
		getClassRule(name: string, opts?: object): CSSRule;
	}

	type StorageType = "local" | "remote" | ""; // "" = do not store

	interface StorageManagerConfig {
		id: string;
		autosave: boolean;
		stepsBeforeSave: number;
		type: StorageType;
	}

	interface StorageInstance {
		store(data: object, clb: Function): object;
		load(keys: string[], clb: Function): object;
	}

	interface StorageManagerInstance {
		init(config: StorageManagerConfig): StorageManagerInstance;
		isAutosave(): boolean;
		setAutosave(v: boolean): StorageManagerInstance;
		getStepsBeforeSave(): number;
		setStepsBeforeSave(v: number): StorageManagerInstance;
		add(id: string, storage: StorageInstance): any;
		get(id: string): any;
		getStorages(): Array<StorageInstance>;
		getCurrent(): string;
		setCurrent(id: string): StorageManagerInstance;
		store(data: object, clb: Function): object | null;
		load(keys: string | Array<string>, clb: Function): void;
	}

	interface AssetManagerConfig {
		assets: AssetManagerAsset[];
		noAssets: string;
		stylePrefix: string;
		uploadText: string;
		addBtnText: string;
		upload: string;
		uploadName: string;
		headers: object;
		params: object;
		modalTitle: string;
	}

	interface AssetManagerInstance {
		getConfig(): AssetManagerConfig;
		init(config: AssetManagerConfig): AssetManagerInstance;
		add(
			asset:
				| AssetManagerAsset
				| Array<AssetManagerAsset>
				| string
				| Array<string>
				| Array<object>,
			options?: any
		): AssetManagerAsset;
		get(src: string): AssetManagerAsset;
		getAll(): Backbone.Collection<Backbone.Model>;
		getAllVisible(): Backbone.Collection<Backbone.Model>;
		remove(src: string): AssetManagerInstance;
		store(noStore: boolean): any;
		load(data: any): Backbone.Collection<Backbone.Model>;
		getContainer(): HTMLElement;
		getAssetsEL(): HTMLElement;
		//render(assets?: AssetManagerAsset[]): HTMLElement;		// AssetManagerAsset[] cannot be assigned from Collection<Model>
		render(assets?: object): HTMLElement;
		addType(id: string, definition: Backbone.Model | AssetManagerType): void;
		getType(id: string): Backbone.Model;
		getTypes(): Backbone.Model[];
		setTarget(m: Backbone.Model): void;
		onSelect(f: () => void): void;
		onclick(func: () => void): void;
		onDblClick(func: () => void): void;
		onClick(func: () => void): void;
	}

	interface AssetManagerAsset {
		category: string;
		src: string;
	}

	interface AssetManagerType {
		model?: any;
		view?: any;
		isType(value: AssetManagerAsset): any;
	}

	interface TraitManagerInstance {
		TraitsView: any;
		name: string;
		getConfig(): object;
		init(config: object): TraitManagerInstance;
		getTraitsViewer(): any; // returns TraitsViewer TODO: define that
		addType(name: string, trait: TraitView | any): void;
		getType(name: string): TraitView;
	}

	interface Trait extends Backbone.Model {
		events: object;
		initialize(): void;
		targetUpdated(): void;
		getTargetValue(): any;
		setTargetValue(value: any): void;
		setValueFromInput(value: any, final: number, opts: object): void;
		getInitValue(): string;
	}

	interface TraitView extends Backbone.View<Trait> {
		extend(properties: any, classProperties?: any): any;
		prototype: TraitView;
		attributes(): any;
		onChange(): void;
		getValueForTarget(): any;
		setInputValue(value: any): void;
		onValueChange(model: any, value: any, opts: object): void;
		renderLabel(): void;
		getLabel(): string;
		getInputEl(): HTMLElement;
		getModelValue(): any;
		renderField(): void;
	}

	interface Block extends Backbone.Model {}

	interface BlockOptions {
		label: string;
		content?: string | object;
		category?: string;
		attributes?: object;
	}

	interface BlockManagerInstance {
		add(id: string, options: BlockOptions): Block;
		get(id: string): Block;
		getAll(): Backbone.Collection<Backbone.Model>;
		getAllVisible(): Backbone.Collection<Backbone.Model>;
		remove(id: string): Block;
		getCategories(): Backbone.Collection<Backbone.Model> | any[];
		getContainer(): HTMLElement;
		render(blocks: Block[]): void;
	}

	interface DroppableInstance {
		constructor(em: Backbone.Model): void;
		endDrop(cancel: any, ev: Event): void;
		handleDragLeave(ev: Event): void;
		updateCounter(value: any, ev: Event): void;
		handleDragEnter(ev: Event): void;
		handleDragOver(ev: Event): any;
		handleDrop(ev: Event): any;
		getContentByData(dataTransfer: any): any;
		sorter: SorterInstance;
	}

	interface SorterInstance extends Backbone.View<Backbone.Model> {
		initialize(opt: object): void;
		getContainerEl(): HTMLElement;
		getDocuments(): any;
		updateOffset(): void;
		setDropContent(content: string | object): void;
		toggleSortCursor(active: boolean): void;
		setDragHelper(el: HTMLElement, event: Event): void;
		moveDragHelper(e: Event): void;
		/**
		 * Returns true if the element matches with selector
		 * @param {Element} el
		 * @param {String} selector
		 */
		matches(el: Element, selector: string, useBody: boolean): boolean;
		/**
		 * Closest parent
		 * @param {Element} el
		 * @param {String} selector
		 * @return {Element|null}
		 */
		closest(el: Element, selector: string): Element | null;
		offset(el: Element): object;
		createPlaceholder(): HTMLElement;
		startSort(src: HTMLElement): void;
		/**
		 * Get the model from HTMLElement target
		 * */
		getTargetModel(el: HTMLElement): Backbone.Model | null;
		getSourceModel(source: HTMLElement): Backbone.Model;
		selectTargetModel(model: Backbone.Model | null): void;
		onMove(e: Event): void;
		isInFlow(el: HTMLElement, parent: HTMLElement): boolean;
		styleInFlow(el: HTMLElement, parent: HTMLElement): boolean;
		validTarget(trg: HTMLElement): boolean;
		dimsFromTarget(target: HTMLElement, rX: number, rY: number): Array<any>;
		getTargetFromEl(el: HTMLElement): HTMLElement;
		nearElBorders(el: HTMLElement): boolean;
		getCurrentPos(): object;
		getDim(el: HTMLElement): Array<number>;
		getChildrenDim(trg: HTMLElement): Array<number>;
		nearBorders(dim: Array<number>, rX: number, rY: number): boolean;
		findPosition(dims: Array<any>, posX: number, posY: number): object;
		movePlaceholder(
			plh: HTMLElement,
			dims: Array<any>,
			pos: object,
			trgDim: Array<number>
		): void;
		endMove(e: Event): void;
		move(dst: HTMLElement, src: HTMLElement, pos: object): void;
		rollback(e: Event): void;
	}

	interface Device extends Backbone.Model {
		name: string;
		width: string;
		height: string;
		widthMedia: string | null;
	}

	interface DeviceManagerInstance {
		add(name: string, width: string, opts: object): Device;
		get(name: string): Device;
		getAll(): Backbone.Collection<Device>;
		render(): HTMLElement;
	}

	interface LayerManagerInstance {
		init(opts: object): LayerManagerInstance;
		onLoad(): void;
		postRender(): void;
		getAll(): any; //Backbone.View<Model>;
		componentChanged(e: any, md: any, opts: object): void;
		render(): HTMLElement;
	}
}
