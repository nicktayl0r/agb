import { $ } from "backbone";
import grapesJS, { EditorInstance } from "grapesjs";

export const AssetFilterBar: any = {
  OnFilterChange: function (value: string) {
    console.log("OnFilterChange: " + value);
  },

  addChildView(amContainer: HTMLElement, editor: EditorInstance, opts: any) {
    const am = editor.AssetManager;
    const config = am.getConfig();

    if (!this.assetCont) {
      this.assetCont = amContainer.getElementsByClassName(
        "gjs-am-assets-cont"
      )[0];
      console.dir(this.assetCont);

      const $div = $(`<div class="gjs-am-assets-header gjs-field gjs-am-add-field">
                                </div>`);

      var filterField = document.createElement("input");
      filterField.id = "filterByName";
      filterField.placeholder = "Filter by Name";
      filterField.oninput = (e) => {
        this.OnFilterChange(filterField.value);
      };

      $div.append(filterField);
      this.assetCont.insertBefore(
        $div[0],
        this.assetCont.getElementsByClassName("gjs-am-assets")[0]
      );
    }

    return amContainer;
  },
};
