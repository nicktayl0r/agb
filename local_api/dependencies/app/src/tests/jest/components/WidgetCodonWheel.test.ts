import { getLocalVue, getCleanStore } from "@/tests/jest/jestSetup";
import { Maybe } from "true-myth";

const localVue = getLocalVue();
let store = getCleanStore();

import { shallowMount } from "@vue/test-utils";
import { WidgetBaseTests } from "@/tests/jest/components/WidgetBaseTests";

import WidgetCodonWheel from "@/components/WidgetCodonWheel.vue";
import { CODON_DICTIONARY } from "@/components/CodonDictionary";

import {
  readWidgetEntryVal,
  dispatchUpdateWidget
} from "@/store/modules/userData";

describe("WidgetCodonWheel", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  WidgetBaseTests(WidgetCodonWheel);

  it("matches html snapshot", () => {
    const wrapper = shallowMount(WidgetCodonWheel, {
      propsData: {
        id: "testWidget",
        text: "button text"
      },
      localVue,
      store
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("WidgetCodonWheel amino acids", () => {
  beforeEach(() => {
    store = getCleanStore();
  });

  it("should handle value updates as expected", async () => {
    const wrapper = shallowMount(WidgetCodonWheel, {
      propsData: {
        id: "testWidgetCodon"
      },
      localVue,
      store
    });

    dispatchUpdateWidget(store, {
      pageID: "testPage",
      widgetID: "testWidgetCodon",
      key: "codonCode",
      value: "UUU"
    });

    await wrapper.vm.$nextTick();

    const widgetVal = readWidgetEntryVal(store)(
      "testPage",
      "testWidgetCodon",
      "aminoAcid"
    );



    expect(Maybe.unsafelyUnwrap(widgetVal)).toBe("Phenylalanine");
  });

  it.each`
    codonCode | aminoAcid
    ${"UUU"}  | ${"Phenylalanine"}
    ${"UUC"}  | ${"Phenylalanine"}
    ${"UUA"}  | ${"Leucine"}
    ${"UUG"}  | ${"Leucine"}
    ${"UCU"}  | ${"Serine"}
    ${"UCC"}  | ${"Serine"}
    ${"UCA"}  | ${"Serine"}
    ${"UCG"}  | ${"Serine"}
    ${"UAU"}  | ${"Tyrosine"}
    ${"UAC"}  | ${"Tyrosine"}
    ${"UAA"}  | ${"Stop"}
    ${"UAG"}  | ${"Stop"}
    ${"UGU"}  | ${"Cysteine"}
    ${"UGC"}  | ${"Cysteine"}
    ${"UGA"}  | ${"Stop_UGA"}
    ${"UGG"}  | ${"Tryptophan"}
    ${"CUU"}  | ${"Leucine"}
    ${"CUC"}  | ${"Leucine"}
    ${"CUA"}  | ${"Leucine"}
    ${"CUG"}  | ${"Leucine"}
    ${"CCU"}  | ${"Proline"}
    ${"CCC"}  | ${"Proline"}
    ${"CCA"}  | ${"Proline"}
    ${"CCG"}  | ${"Proline"}
    ${"CAU"}  | ${"Histidine"}
    ${"CAC"}  | ${"Histidine"}
    ${"CAA"}  | ${"Glutamine"}
    ${"CAG"}  | ${"Glutamine"}
    ${"CGU"}  | ${"Arginine"}
    ${"CGC"}  | ${"Arginine"}
    ${"CGA"}  | ${"Arginine"}
    ${"CGG"}  | ${"Arginine"}
    ${"AUU"}  | ${"Isoleucine"}
    ${"AUC"}  | ${"Isoleucine"}
    ${"AUA"}  | ${"Isoleucine"}
    ${"AUG"}  | ${"Methionine"}
    ${"ACU"}  | ${"Threonine"}
    ${"ACC"}  | ${"Threonine"}
    ${"ACA"}  | ${"Threonine"}
    ${"ACG"}  | ${"Threonine"}
    ${"AAU"}  | ${"Asparagine"}
    ${"AAC"}  | ${"Asparagine"}
    ${"AAA"}  | ${"Lysine"}
    ${"AAG"}  | ${"Lysine"}
    ${"AGU"}  | ${"Serine"}
    ${"AGC"}  | ${"Serine"}
    ${"AGA"}  | ${"Arginine"}
    ${"AGG"}  | ${"Arginine"}
    ${"GUU"}  | ${"Valine"}
    ${"GUC"}  | ${"Valine"}
    ${"GUA"}  | ${"Valine"}
    ${"GUG"}  | ${"Valine"}
    ${"GCU"}  | ${"Alanine"}
    ${"GCC"}  | ${"Alanine"}
    ${"GCA"}  | ${"Alanine"}
    ${"GCG"}  | ${"Alanine"}
    ${"GAU"}  | ${"Aspartic acid"}
    ${"GAC"}  | ${"Aspartic acid"}
    ${"GAA"}  | ${"Glutamic acid"}
    ${"GAG"}  | ${"Glutamic acid"}
    ${"GGU"}  | ${"Glycine"}
    ${"GGC"}  | ${"Glycine"}
    ${"GGA"}  | ${"Glycine"}
    ${"GGG"}  | ${"Glycine"}
  `("$codonCode to $aminoAcid", ({ codonCode, aminoAcid }) => {
    expect(CODON_DICTIONARY[codonCode]).toBe(aminoAcid);
  });
});
