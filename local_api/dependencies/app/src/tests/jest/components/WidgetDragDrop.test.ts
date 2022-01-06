import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
const localVue = getLocalVue();
let store = getCleanStore();

import { mount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";
import { MixinWidgetEnabledTests } from "@/tests/jest/mixins/MixinWidgetEnabledTests";

import WidgetDrag from "@/components/WidgetDrag.vue";
import WidgetDrop from "@/components/WidgetDrop.vue";
import { MockDragEvent } from "@/tests/jest/__mock__/Event";
import {
  readWidgetEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";

let elem: any;


describe("WidgetDragDrop", () => {
  beforeEach(() => {
    store = getCleanStore();
    elem = document.createElement('div');
    if (document.body) {
      document.body.appendChild(elem);
    }
  });

  afterEach(() => {

  });

  WidgetBaseTests(WidgetDrag);
  MixinWidgetEnabledTests(WidgetDrag);

  WidgetBaseTests(WidgetDrop);
  MixinWidgetEnabledTests(WidgetDrop);

  it("matches html snapshot", async () => {
    const wrapperDrop = mount(WidgetDrop, {
      propsData: {
        id: "testDrop"
      },
      localVue,
      store,
      attachTo: elem
    });
    const wrapperDrag = mount(WidgetDrag, {
      propsData: {
        id: "testDrag",
        dropId: "testDrop"
      },
      localVue,
      store
    });
    await wrapperDrag.vm.$nextTick();

    expect(wrapperDrop.find('.dragSlot').find("#testDrag")).not.toBeNull();
    expect((wrapperDrop.find('.dragSlot').find("#testDrag") as any).id).toBe((wrapperDrag.vm.$el.parentElement as any).selector);
    expect(wrapperDrop.element).toMatchSnapshot();
    wrapperDrop.destroy();
  });
});

//DONE test that when dropped, a drag sets the right dropID in the store. Also that the dragID is in the drop.dragID, and also removed from the first drop
//DONE test that if disabled, a drop doesn't accept a drag
//e2e - test that drags dropped over a drop.maxChildren are swapped out (track store ids)
//DONE test that if a drop.dragID is a string, that it gets converted to an array with that string

describe("WidgetDragDrop interaction", () => {
  beforeEach(() => {
    store = getCleanStore();
    elem = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
    if (document.body) {
      elem.forEach((element: any) => {
        document.body.appendChild(element);
      });
    }
  });

  it("drag.dropId is correct", async () => {
    const dropStart = mount(WidgetDrop, {
      propsData: {
        id: "dropStart",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[0]
    });
    const dropEnd = mount(WidgetDrop, {
      propsData: {
        id: "dropEnd",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[1]
    });
    const drag1 = mount(WidgetDrag, {
      propsData: {
        id: "drag1",
        dropId: "dropStart", //attach to wrapperDropStart to begin
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[2]
    });
    const dropEvent = MockDragEvent("drop");
    //@ts-ignore
    dropEvent.dataTransfer.setData("draggedWidgetID", "drag1");
    dropEnd.vm.$el.dispatchEvent(dropEvent);

    await drag1.vm.$nextTick();
    await dropStart.vm.$nextTick();
    await dropEnd.vm.$nextTick();

    const startDrag1dropId = readWidgetEntryVal(store)(
      "testPage",
      "drag1",
      "dropId"
    );
    expect(startDrag1dropId.unsafelyUnwrap()).toBe("dropEnd");
    expect(drag1.vm.$el.parentElement!.parentElement!.id).toBe("dropEnd");

    drag1.destroy();
    dropStart.destroy();
    dropEnd.destroy();
  });

  it("drop.dragId is an array and correct", async () => {
    const dropStart = mount(WidgetDrop, {
      propsData: {
        id: "dropStart",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[0]
    });
    const dropEnd = mount(WidgetDrop, {
      propsData: {
        id: "dropEnd",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[1]
    });
    const drag1 = mount(WidgetDrag, {
      propsData: {
        id: "drag1",
        dropId: "dropStart", //attach to wrapperDropStart to begin
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[2]
    });
    const dropEvent = MockDragEvent("drop");
    //@ts-ignore
    dropEvent.dataTransfer.setData("draggedWidgetID", "drag1");
    dropEnd.vm.$el.dispatchEvent(dropEvent);

    await drag1.vm.$nextTick();
    await dropStart.vm.$nextTick();
    await dropEnd.vm.$nextTick();

    const startDrag1dropId = readWidgetEntryVal(store)(
      "testPage",
      "dropEnd",
      "dragId"
    );
    expect(startDrag1dropId.unsafelyUnwrap()).toStrictEqual(["drag1"]);

    drag1.destroy();
    dropStart.destroy();
    dropEnd.destroy();
  });

  it("drop.dragId is removed from array", async () => {
    const dropStart = mount(WidgetDrop, {
      propsData: {
        id: "dropStart",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[0]
    });
    const drop2 = mount(WidgetDrop, {
      propsData: {
        id: "drop2",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[1]
    });
    const drag1 = mount(WidgetDrag, {
      propsData: {
        id: "drag1",
        dropId: "dropStart", //attach to wrapperDropStart to begin
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[2]
    });
    const dropEvent = MockDragEvent("drop");
    //@ts-ignore
    dropEvent.dataTransfer.setData("draggedWidgetID", "drag1");
    //first drop on drop2
    drop2.vm.$el.dispatchEvent(dropEvent);

    await drag1.vm.$nextTick();
    await dropStart.vm.$nextTick();
    await drop2.vm.$nextTick();

    const dropStartDrag1dropId = readWidgetEntryVal(store)(
      "testPage",
      "dropStart",
      "dragId"
    );
    //confirm that drag1 moved to drop2

    expect(dropStartDrag1dropId.unsafelyUnwrap()).toStrictEqual([]);

    drag1.destroy();
    dropStart.destroy();
    drop2.destroy();
  });

  it("disabled drop doesn't accept drag", async () => {
    const dropStart = mount(WidgetDrop, {
      propsData: {
        id: "dropStart",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[0]
    });
    const drop2 = mount(WidgetDrop, {
      propsData: {
        id: "drop2",
        pageID: "testPage",
        enabled: false
      },
      localVue,
      store,
      attachTo: elem[1]
    });
    const drag1 = mount(WidgetDrag, {
      propsData: {
        id: "drag1",
        dropId: "dropStart", //attach to wrapperDropStart to begin
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[2]
    });
    const dropEvent = MockDragEvent("drop");
    //@ts-ignore
    dropEvent.dataTransfer.setData("draggedWidgetID", "drag1");
    //first drop on drop2
    drop2.vm.$el.dispatchEvent(dropEvent);

    await drag1.vm.$nextTick();
    await dropStart.vm.$nextTick();
    await drop2.vm.$nextTick();

    const dropStartDrag1dropId = readWidgetEntryVal(store)(
      "testPage",
      "drop2",
      "dragId"
    );
    //confirm that drag1 is not stored in drop2
    expect(dropStartDrag1dropId.isNothing()).toBe(true);

    drag1.destroy();
    dropStart.destroy();
    drop2.destroy();
  });

  it("backwardsCompat: string dragId is perserved in array", async () => {
    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "dropStart",
      key: "dragId",
      value: "testId"
    });
    const dropStart = mount(WidgetDrop, {
      propsData: {
        id: "dropStart",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[0]
    });
    const drop2 = mount(WidgetDrop, {
      propsData: {
        id: "drop2",
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[1]
    });
    const drag1 = mount(WidgetDrag, {
      propsData: {
        id: "drag1",
        dropId: "dropStart", //attach to dropStart to begin
        pageID: "testPage"
      },
      localVue,
      store,
      attachTo: elem[2]
    });

    await drag1.vm.$nextTick();
    await dropStart.vm.$nextTick();
    await drop2.vm.$nextTick();

    const dropStartDrag1dropId = readWidgetEntryVal(store)(
      "testPage",
      "dropStart",
      "dragId"
    );

    //confirm that drag2 is now in dropStart since it was swapped out.
    expect(dropStartDrag1dropId.unsafelyUnwrap()).toStrictEqual([
      "testId",
      "drag1"
    ]);

    drag1.destroy();
    dropStart.destroy();
    drop2.destroy();
  });
});
