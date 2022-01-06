import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
  bm.add("zoomBox", {
    label: "<img src='./img/blocks/blockIcon_ZoomBox.svg'></img><br>Zoom Box",
    category: "Arrows",
    content: AddPageIDToString(`
        <container-show-hide :visible="false" id="iq18" class="SH_SmallZoomSquare" data-gjs-custom-name="SH_SmallZoomSquare">
            <widget-arrow :visible="false" id="iwql" :source-offset-x="100" :source-offset-y="5" :target-offset-x="1" :target-offset-y="1" source-id="" color="white" :width="3" :show-head="false" :duration="0" :delay="0" target-id="iq18" data-gjs-custom-name="arrow_ZoomLine1">
            </widget-arrow>
            <widget-arrow :visible="false" id="io5x" :source-offset-x="100" :source-offset-y="95" :target-offset-x="1" :target-offset-y="99" source-id="" color="white" :width="3" :show-head="false" :duration="0" :delay="0" target-id="iq18" data-gjs-custom-name="arrow_ZoomLine2">
            </widget-arrow>
        </container-show-hide>
        <style>
            .SH_SmallZoomSquare.$$pageID$$ {
                width: 2vh;
                height: 2vh;
                border: .4vh solid white;
                z-index: 1;
            }
        </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
  bm.add("zoomBox2", {
    label: "<img src='./img/blocks/blockIcon_ZoomBox2.svg'></img><br>Zoom Box 2",
    category: "Arrows",
    content: AddPageIDToString(`
        <div class="grid_ZoomBox2" data-gjs-custom-name="div_ZoomBox2">
            <div class="div_Line item1_ZB lineVertical" data-gjs-custom-name="div_Line">
            </div>
            <div class="div_Box item2_ZB" data-gjs-custom-name="div_Box">
            </div>
        </div>

        <style>
        .grid_ZoomBox2.$$pageID$$ {
            width:100%;
            height:100%;
            display:grid;
            grid-template-columns:1fr;
            grid-template-rows:1fr min-content;
          }
          .item1_ZB.$$pageID$$ {
            grid-column-start:1;
            grid-column-end:2;
            grid-row-start:1;
            grid-row-end:2;
            justify-self:center;
          }
          .item2_ZB.$$pageID$$ {
            grid-column-start:1;
            grid-column-end:2;
            grid-row-start:2;
            grid-row-end:3;
            justify-self:center;
            align-self:center;
          }
          .div_Box.$$pageID$$ {
            min-width:4.5vh;
            min-height:4.5vh;
            border-radius:1vh;
            border:0.5vh solid #ffffff;
          }
          .div_Line.$$pageID$$ {
            background-color:#ffffff;
            width:0.5vh;
            height:100%;
          }
          
        </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
  bm.add("bracket-right", {
    label: "<img src='./img/blocks/blockIcon_Bracket_Right.svg'></img><br>Bracket Right",
    category: "Arrows",
    content: AddPageIDToString(`
    <div class="grid_bracketRight" data-gjs-custom-name="grid_bracketRight">
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
    </div>
    <style>
    .grid_bracketRight.$$pageID$$ {
        grid-template-columns: 1fr 0.4vw 1fr;
        grid-template-rows: 0.4vw 1fr 0.4vw 1fr 0.4vw;
        display: grid;
        width: 100%;
        height: 100%;
    }
    .bracketLine.$$pageID$$ {
        background-color: #000000;
    }
    </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
  bm.add("bracket-left", {
    label: "<img src='./img/blocks/blockIcon_Bracket_Left.svg'></img><br>Bracket Left",
    category: "Arrows",
    content: AddPageIDToString(`
    <div class="grid_bracketLeft" data-gjs-custom-name="grid_bracketLeft">
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
    </div>
    <style>
    .grid_bracketLeft.$$pageID$$ {
      grid-template-columns: 1fr 0.4vw 1fr;
      grid-template-rows: 0.4vw 1fr 0.4vw 1fr 0.4vw;
      display: grid;
      width: 100%;
      height: 100%;
    }
    .bracketLine.$$pageID$$ {
        background-color: #000000;
    }
    </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
  bm.add("bracket-up", {
    label: "<img src='./img/blocks/blockIcon_Bracket_Up.svg'></img><br>Bracket Up",
    category: "Arrows",
    content: AddPageIDToString(`
    <div class="grid_bracketUp" data-gjs-custom-name="grid_bracketUp">
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
    </div>
    <style>
    .grid_bracketUp.$$pageID$$ {
      grid-template-rows: 1fr 0.4vw 1fr;
      grid-template-columns: 0.4vw 1fr 0.4vw 1fr 0.4vw;
      display: grid;
      width: 100%;
      height: 100%;
    }
    .bracketLine.$$pageID$$ {
        background-color: #000000;
    }
    </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
  bm.add("bracket-down", {
    label: "<img src='./img/blocks/blockIcon_Bracket_Down.svg'></img><br>Bracket Down",
    category: "Arrows",
    content: AddPageIDToString(`
    <div class="grid_bracketDown" data-gjs-custom-name="grid_bracketDown">
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="" data-gjs-custom-name="div"></div>
      <div class="bracketLine" data-gjs-custom-name="bracketLine"></div>
    </div>
    <style>
    .grid_bracketDown.$$pageID$$ {
        grid-template-rows: 1fr 0.4vw 1fr;
        grid-template-columns: 0.4vw 1fr 0.4vw 1fr 0.4vw;
        display: grid;
        width: 100%;
        height: 100%;
    }
    .bracketLine.$$pageID$$ {
        background-color: #000000;
    }
    </style>`),
    attributes: {
      class: "imgIcon"
    }
  });
};
