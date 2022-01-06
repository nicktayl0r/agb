import grapesJS, { AssetManagerInstance, EditorInstance } from "grapesjs";

import * as PlugInAssets from "../../assets";
import { AssetFilterBar } from "./view/AssetFilterBar";

export const assetManager: any = {
  run(editor: EditorInstance, sender, opts: any) {
    console.log("new asset manager");
    const modal = editor.Modal;
    this.am = editor.AssetManager;
    const config = this.am.getConfig();
    var amContainer = this.am.getContainer();
    const title = opts.modalTitle || config.modalTitle || "";
    const types = opts.types;
    const accept = opts.accept;

    config.addBtnText = "Add from HTTP";

    this.am.setTarget(opts.target);
    this.am.onClick(opts.onClick);
    this.am.onDblClick(opts.onDblClick);
    this.am.onSelect(opts.onSelect);

    if (!this.rendered || types) {
      let assets = this.am.getAll();
      console.log("types: ", types);
      if (types) {
        this.am.render(
          assets.filter((a) => types.indexOf(a.get("type")) !== -1)
        );
      } else {
        this.am.render(assets);
      }
    }
    this.rendered = 1;

    if (accept) {
      const uploadEl = amContainer.querySelector(
        `input#${config.stylePrefix}uploadFile`
      );
      uploadEl && uploadEl.setAttribute("accept", accept);
    }

    amContainer = AssetFilterBar.addChildView(amContainer, editor, opts);
    AssetFilterBar.OnFilterChange = (filter) => {
      this.onFilterChange(this.am, filter, this.assetModels);
    };

    modal.setTitle(title);
    modal.setContent(amContainer);
    modal.open();
    PlugInAssets.GeneratePreviews(this.am);
  },

  onFilterChange(am: AssetManagerInstance, filter: string) {
    //console.log("Filter AssetManager: " + filter);
    am.getAll().reset();
    let filterLower = filter.toLowerCase();
    var list: PlugInAssets.grapesAsset[] = [];
    for (const asset of PlugInAssets.AllAssets) {
      let name = asset.p.split("/").reverse()[0].split(".")[0].toLowerCase();
      if (name.indexOf(filterLower) != -1) {
        list.push(
          new PlugInAssets.grapesAsset(
            asset.category,
            asset.src //update paths to point to project local server
          )
        );
      }
    }

    PlugInAssets.SortAssets(am, am.getConfig(), list);
  },
};

// class grapesAsset implements AssetManagerAsset {
// 	constructor(public category: string, public src: string) {}
// }
