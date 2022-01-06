import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
	const gridItemAttr = {
		"data-gjs-resizable": {
			tl: 0, // Top left
			tc: 1, // Top center
			tr: 0, // Top right
			cl: 1, // Center left
			cr: 1, // Center right
			bl: 0, // Bottom left
			bc: 1, // Bottom center
			br: 0, // Bottom right
			minDim: 1,
			step: 1,
			keyHeight: "grid-row",
			keyWidth: "grid-column"
		}
	};

	const attrsToString = attrs => {
		const result = new Array<any>();

		for (let key in attrs) {
			let value = attrs[key];
			const toParse = value instanceof Array || value instanceof Object;
			value = toParse ? JSON.stringify(value) : value;
			result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
		}

		return result.length ? ` ${result.join(" ")}` : "";
	};
	/*
		I didn't figure out the dragging yet, but you'd add ${attrsToString(gridItemAttr)} to the grid item div
	*/
	bm.add("grid10_1", {
		label: "grid_10x10_1",
		category: "Grids",
		attributes: { class: "fa fa-th" },
		content: AddPageIDToString(`
		<div class="grid_T10x10" data-gjs-custom-name="grid_T10x10">
		</div>
		<style>
		.grid_T10x10.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-column-gap:0;
			grid-row-gap:0;
			width:100%;
			height:100%;
			padding:0vh;
			position:absolute;
		  }
		</style>`)
	});

	bm.add("grid10_2", {
		label: "grid_10x10_2",
		category: "Grids",
		attributes: { class: "fa fa-th" },
		content: AddPageIDToString(`
			<div class="grid_T10x10 " data-gjs-custom-name="grid_T10x10">
  <div class="item1_T10x10 " data-gjs-custom-name="item1_T10x10">
    <p class="" data-gjs-custom-name="text_1">text_1
    </p>
  </div>
  <div class="item2_T10x10 " data-gjs-custom-name="item2_T10x10">
    <p class="" data-gjs-custom-name="text_2">text_2
    </p>
  </div>
  <div class="item3_T10x10 " data-gjs-custom-name="item3_T10x10">
    <p class="" data-gjs-custom-name="text_3">text_3
    </p>
  </div>
  <div class="item4_T10x10 " data-gjs-custom-name="item4_T10x10">
    <p class="" data-gjs-custom-name="text_4">text_4
    </p>
  </div>
  <div class="item5_T10x10 " data-gjs-custom-name="item5_T10x10">
    <p class="" data-gjs-custom-name="text_5">text_5
    </p>
  </div>
  <div class="item6_T10x10 " data-gjs-custom-name="item6_T10x10">
    <p class="" data-gjs-custom-name="text_6">text_6
    </p>
  </div>
  <div class="item7_T10x10 " data-gjs-custom-name="item7_T10x10">
    <p class="" data-gjs-custom-name="text_7">text_7
    </p>
  </div>
  <div class="item8_T10x10 " data-gjs-custom-name="item8_T10x10">
    <p class="" data-gjs-custom-name="text_8">text_8
    </p>
  </div>
  <div class="item9_T10x10 " data-gjs-custom-name="item9_T10x10">
    <p class="" data-gjs-custom-name="text_9">text_9
    </p>
  </div>
  <div class="item10_T10x10 " data-gjs-custom-name="item10_T10x10">
    <p class="" data-gjs-custom-name="text_10">text_10
    </p>
  </div>
  <div class="item11_T10x10 " data-gjs-custom-name="item11_T10x10">
    <p class="" data-gjs-custom-name="text_11">text_11
    </p>
  </div>
  <div class="item12_T10x10 " data-gjs-custom-name="item12_T10x10">
    <p class="" data-gjs-custom-name="text_12">text_12
    </p>
  </div>
  <div class="item13_T10x10 " data-gjs-custom-name="item13_T10x10">
    <p class="" data-gjs-custom-name="text_13">text_13
    </p>
  </div>
  <div class="item14_T10x10 " data-gjs-custom-name="item14_T10x10">
    <p class="" data-gjs-custom-name="text_14">text_14
    </p>
  </div>
  <div class="item15_T10x10 " data-gjs-custom-name="item15_T10x10">
    <p class="" data-gjs-custom-name="text_15">text_15
    </p>
  </div>
  <div class="item16_T10x10 " data-gjs-custom-name="item16_T10x10">
    <p class="" data-gjs-custom-name="text_16">text_16
    </p>
  </div>
  <div class="item17_T10x10 " data-gjs-custom-name="item17_T10x10">
    <p class="" data-gjs-custom-name="text_17">text_17
    </p>
  </div>
  <div class="item18_T10x10 " data-gjs-custom-name="item18_T10x10">
    <p class="" data-gjs-custom-name="text_18">text_18
    </p>
  </div>
  <div class="item19_T10x10 " data-gjs-custom-name="item19_T10x10">
    <p class="" data-gjs-custom-name="text_19">text_19
    </p>
  </div>
  <div class="item20_T10x10 " data-gjs-custom-name="item20_T10x10">
    <p class="" data-gjs-custom-name="text_20">text_20
    </p>
  </div>
  <div class="item21_T10x10 " data-gjs-custom-name="item21_T10x10">
    <p class="" data-gjs-custom-name="text_21">text_21
    </p>
  </div>
  <div class="item22_T10x10 " data-gjs-custom-name="item22_T10x10">
    <p class="" data-gjs-custom-name="text_22">text_22
    </p>
  </div>
  <div class="item23_T10x10 " data-gjs-custom-name="item23_T10x10">
    <p class="" data-gjs-custom-name="text_23">text_23
    </p>
  </div>
  <div class="item24_T10x10 " data-gjs-custom-name="item24_T10x10">
    <p class="" data-gjs-custom-name="text_24">text_24
    </p>
  </div>
  <div class="item25_T10x10 " data-gjs-custom-name="item25_T10x10">
    <p class="" data-gjs-custom-name="text_25">text_25
    </p>
  </div>
  <div class="item26_T10x10 " data-gjs-custom-name="item26_T10x10">
    <p class="" data-gjs-custom-name="text_26">text_26
    </p>
  </div>
  <div class="item27_T10x10 " data-gjs-custom-name="item27_T10x10">
    <p class="" data-gjs-custom-name="text_27">text_27
    </p>
  </div>
  <div class="item28_T10x10 " data-gjs-custom-name="item28_T10x10">
    <p class="" data-gjs-custom-name="text_28">text_28
    </p>
  </div>
  <div class="item29_T10x10 " data-gjs-custom-name="item29_T10x10">
    <p class="" data-gjs-custom-name="text_29">text_29
    </p>
  </div>
  <div class="item30_T10x10 " data-gjs-custom-name="item30_T10x10">
    <p class="" data-gjs-custom-name="text_30">text_30
    </p>
  </div>
  <div class="item31_T10x10 " data-gjs-custom-name="item31_T10x10">
    <p class="" data-gjs-custom-name="text_31">text_31
    </p>
  </div>
  <div class="item32_T10x10 " data-gjs-custom-name="item32_T10x10">
    <p class="" data-gjs-custom-name="text_32">text_32
    </p>
  </div>
  <div class="item33_T10x10 " data-gjs-custom-name="item33_T10x10">
    <p class="" data-gjs-custom-name="text_33">text_33
    </p>
  </div>
  <div class="item34_T10x10s " data-gjs-custom-name="item34_T10x10">
    <p class="" data-gjs-custom-name="text_34">text_34
    </p>
  </div>
  <div class="item35_T10x10 " data-gjs-custom-name="item35_T10x10">
    <p class="" data-gjs-custom-name="text_35">text_35
    </p>
  </div>
  <div class="item36_T10x10 " data-gjs-custom-name="item36_T10x10">
    <p class="" data-gjs-custom-name="text_36">text_36
    </p>
  </div>
  <div class="item37_T10x10 " data-gjs-custom-name="item37_T10x10">
    <p class="" data-gjs-custom-name="text_37">text_37
    </p>
  </div>
  <div class="item38_T10x10 " data-gjs-custom-name="item38_T10x10">
    <p class="" data-gjs-custom-name="text_38">text_38
    </p>
  </div>
  <div class="item39_T10x10 " data-gjs-custom-name="item39_T10x10">
    <p class="" data-gjs-custom-name="text_39">text_39
    </p>
  </div>
  <div class="item40_T10x10 " data-gjs-custom-name="item40_T10x10">
    <p class="" data-gjs-custom-name="text_40">text_40
    </p>
  </div>
  <div class="item41_T10x10 " data-gjs-custom-name="item41_T10x10">
    <p class="" data-gjs-custom-name="text_41">text_41
    </p>
  </div>
  <div class="item42_T10x10 " data-gjs-custom-name="item42_T10x10">
    <p class="" data-gjs-custom-name="text_42">text_42
    </p>
  </div>
  <div class="item43_T10x10 " data-gjs-custom-name="item43_T10x10">
    <p class="" data-gjs-custom-name="text_43">text_43
    </p>
  </div>
  <div class="item44_T10x10 " data-gjs-custom-name="item44_T10x10">
    <p class="" data-gjs-custom-name="text_44">text_44
    </p>
  </div>
  <div class="item45_T10x10 " data-gjs-custom-name="item45_T10x10">
    <p class="" data-gjs-custom-name="text_45">text_45
    </p>
  </div>
  <div class="item46_T10x10 " data-gjs-custom-name="item46_T10x10">
    <p class="" data-gjs-custom-name="text_46">text_46
    </p>
  </div>
  <div class="item47_T10x10 " data-gjs-custom-name="item47_T10x10">
    <p class="" data-gjs-custom-name="text_47">text_47
    </p>
  </div>
  <div class="item48_T10x10 " data-gjs-custom-name="item48_T10x10">
    <p class="" data-gjs-custom-name="text_48">text_48
    </p>
  </div>
  <div class="item49_T10x10 " data-gjs-custom-name="item49_T10x10">
    <p class="" data-gjs-custom-name="text_49">text_49
    </p>
  </div>
  <div class="item50_T10x10 " data-gjs-custom-name="item50_T10x10">
    <p class="" data-gjs-custom-name="text_50">text_50
    </p>
  </div>
  <div class="item51_T10x10 " data-gjs-custom-name="item51_T10x10">
    <p class="" data-gjs-custom-name="text_51">text_51
    </p>
  </div>
  <div class="item52_T10x10 " data-gjs-custom-name="item52_T10x10">
    <p class="" data-gjs-custom-name="text_52">text_52
    </p>
  </div>
  <div class="item53_T10x10 " data-gjs-custom-name="item53_T10x10">
    <p class="" data-gjs-custom-name="text_53">text_53
    </p>
  </div>
  <div class="item54_T10x10 " data-gjs-custom-name="item54_T10x10">
    <p class="" data-gjs-custom-name="text_54">text_54
    </p>
  </div>
  <div class="item55_T10x10 " data-gjs-custom-name="item55_T10x10">
    <p class="" data-gjs-custom-name="text_55">text_55
    </p>
  </div>
  <div class="item56_T10x10 " data-gjs-custom-name="item56_T10x10">
    <p class="" data-gjs-custom-name="text_56">text_56
    </p>
  </div>
  <div class="item57_T10x10 " data-gjs-custom-name="item57_T10x10">
    <p class="" data-gjs-custom-name="text_57">text_57
    </p>
  </div>
  <div class="item58_T10x10 " data-gjs-custom-name="item58_T10x10">
    <p class="" data-gjs-custom-name="text_58">text_58
    </p>
  </div>
  <div class="item59_T10x10 " data-gjs-custom-name="item59_T10x10">
    <p class="" data-gjs-custom-name="text_59">text_59
    </p>
  </div>
  <div class="item60_T10x10 " data-gjs-custom-name="item60_T10x10">
    <p class="" data-gjs-custom-name="text_60">text_60
    </p>
  </div>
  <div class="item61_T10x10 " data-gjs-custom-name="item61_T10x10">
    <p class="" data-gjs-custom-name="text_61">text_61
    </p>
  </div>
  <div class="item62_T10x10 " data-gjs-custom-name="item62_T10x10">
    <p class="" data-gjs-custom-name="text_62">text_62
    </p>
  </div>
  <div class="item63_T10x10 " data-gjs-custom-name="item63_T10x10">
    <p class="" data-gjs-custom-name="text_63">text_63
    </p>
  </div>
  <div class="item64_T10x10 " data-gjs-custom-name="item64_T10x10">
    <p class="" data-gjs-custom-name="text_64">text_64
    </p>
  </div>
  <div class="item65_T10x10 " data-gjs-custom-name="item65_T10x10">
    <p class="" data-gjs-custom-name="text_65">text_65
    </p>
  </div>
  <div class="item66_T10x10 " data-gjs-custom-name="item66_T10x10">
    <p class="" data-gjs-custom-name="text_66">text_66
    </p>
  </div>
  <div class="item67_T10x10 " data-gjs-custom-name="item67_T10x10">
    <p class="" data-gjs-custom-name="text_67">text_67
    </p>
  </div>
  <div class="item68_T10x10 " data-gjs-custom-name="item68_T10x10">
    <p class="" data-gjs-custom-name="text_68">text_68
    </p>
  </div>
  <div class="item69_T10x10 " data-gjs-custom-name="item69_T10x10">
    <p class="" data-gjs-custom-name="text_69">text_69
    </p>
  </div>
  <div class="item70_T10x10 " data-gjs-custom-name="item70_T10x10">
    <p class="" data-gjs-custom-name="text_70">text_70
    </p>
  </div>
  <div class="item71_T10x10 " data-gjs-custom-name="item71_T10x10">
    <p class="" data-gjs-custom-name="text_71">text_71
    </p>
  </div>
  <div class="item72_T10x10 " data-gjs-custom-name="item72_T10x10">
    <p class="" data-gjs-custom-name="text_72">text_72
    </p>
  </div>
  <div class="item73_T10x10 " data-gjs-custom-name="item73_T10x10">
    <p class="" data-gjs-custom-name="text_73">text_73
    </p>
  </div>
  <div class="item74_T10x10 " data-gjs-custom-name="item74_T10x10">
    <p class="" data-gjs-custom-name="text_74">text_74
    </p>
  </div>
  <div class="item75_T10x10 " data-gjs-custom-name="item75_T10x10">
    <p class="" data-gjs-custom-name="text_75">text_75
    </p>
  </div>
  <div class="item76_T10x10 " data-gjs-custom-name="item76_T10x10">
    <p class="" data-gjs-custom-name="text_76">text_76
    </p>
  </div>
  <div class="item77_T10x10 " data-gjs-custom-name="item77_T10x10">
    <p class="" data-gjs-custom-name="text_77">text_77
    </p>
  </div>
  <div class="item78_T10x10 " data-gjs-custom-name="item78_T10x10">
    <p class="" data-gjs-custom-name="text_78">text_78
    </p>
  </div>
  <div class="item79_T10x10 " data-gjs-custom-name="item79_T10x10">
    <p class="" data-gjs-custom-name="text_79">text_79
    </p>
  </div>
  <div class="item80_T10x10 " data-gjs-custom-name="item80_T10x10">
    <p class="" data-gjs-custom-name="text_80">text_80
    </p>
  </div>
  <div class="item81_T10x10 " data-gjs-custom-name="item81_T10x10">
    <p class="" data-gjs-custom-name="text_81">text_81
    </p>
  </div>
  <div class="item82_T10x10 " data-gjs-custom-name="item82_T10x10">
    <p class="" data-gjs-custom-name="text_82">text_82
    </p>
  </div>
  <div class="item83_T10x10 " data-gjs-custom-name="item83_T10x10">
    <p class="" data-gjs-custom-name="text_83">text_83
    </p>
  </div>
  <div class="item84_T10x10 " data-gjs-custom-name="item84_T10x10">
    <p class="" data-gjs-custom-name="text_84">text_84
    </p>
  </div>
  <div class="item85_T10x10 " data-gjs-custom-name="item85_T10x10">
    <p class="" data-gjs-custom-name="text_85">text_85
    </p>
  </div>
  <div class="item86_T10x10 " data-gjs-custom-name="item86_T10x10">
    <p class="" data-gjs-custom-name="text_86">text_86
    </p>
  </div>
  <div class="item87_T10x10 " data-gjs-custom-name="item87_T10x10">
    <p class="" data-gjs-custom-name="text_87">text_87
    </p>
  </div>
  <div class="item88_T10x10 " data-gjs-custom-name="item88_T10x10">
    <p class="" data-gjs-custom-name="text_88">text_88
    </p>
  </div>
  <div class="item89_T10x10 " data-gjs-custom-name="item89_T10x10">
    <p class="" data-gjs-custom-name="text_89">text_89
    </p>
  </div>
  <div class="item90_T10x10 " data-gjs-custom-name="item90_T10x10">
    <p class="" data-gjs-custom-name="text_90">text_90
    </p>
  </div>
  <div class="item91_T10x10 " data-gjs-custom-name="item91_T10x10">
    <p class="" data-gjs-custom-name="text_91">text_91
    </p>
  </div>
  <div class="item92_T10x10 " data-gjs-custom-name="item92_T10x10">
    <p class="" data-gjs-custom-name="text_92">text_92
    </p>
  </div>
  <div class="item93_T10x10 " data-gjs-custom-name="item93_T10x10">
    <p class="" data-gjs-custom-name="text_93">text_93
    </p>
  </div>
  <div class="item94_T10x10 " data-gjs-custom-name="item94_T10x10">
    <p class="" data-gjs-custom-name="text_94">text_94
    </p>
  </div>
  <div class="item95_T10x10 " data-gjs-custom-name="item95_T10x10">
    <p class="" data-gjs-custom-name="text_95">text_95
    </p>
  </div>
  <div class="item96_T10x10 " data-gjs-custom-name="item96_T10x10">
    <p class="" data-gjs-custom-name="text_96">text_96
    </p>
  </div>
  <div class="item97_T10x10 " data-gjs-custom-name="item97_T10x10">
    <p class="" data-gjs-custom-name="text_97">text_97
    </p>
  </div>
  <div class="item98_T10x10 " data-gjs-custom-name="item98_T10x10">
    <p class="" data-gjs-custom-name="text_98">text_98
    </p>
  </div>
  <div class="item99_T10x10 " data-gjs-custom-name="item99_T10x10">
    <p class="" data-gjs-custom-name="text_99">text_99
    </p>
  </div>
  <div class="item100_T10x10 " data-gjs-custom-name="item100_T10x10">
    <p class="" data-gjs-custom-name="text_100">text_100
    </p>
  </div>
</div>
	<style>
	.grid_T10x10.$$pageID$$ {
		display:grid;
		grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-column-gap:0;
		grid-row-gap:0;
		width:100%;
		height:100%;
		padding:6vh;
		position:absolute;
	}
	.item1_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item2_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item3_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item4_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item5_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item6_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item7_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item8_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item9_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item10_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:1;
		grid-row-end:span 1;
	}
	.item11_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item12_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item13_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item14_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item15_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item16_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item17_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item18_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item19_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item20_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:2;
		grid-row-end:span 1;
	}
	.item21_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item22_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item23_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item24_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item25_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item26_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item27_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item28_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item29_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item30_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:3;
		grid-row-end:span 1;
	}
	.item31_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item32_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item33_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item34_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item35_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item36_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item37_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item38_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item39_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item40_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:4;
		grid-row-end:span 1;
	}
	.item41_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item42_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item43_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item44_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item45_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item46_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item47_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item48_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item49_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item50_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:5;
		grid-row-end:span 1;
	}
	.item51_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item52_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item53_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item54_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item55_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item56_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item57_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item58_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item59_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item60_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:6;
		grid-row-end:span 1;
	}
	.item61_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item62_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item63_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item64_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item65_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item66_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item67_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item68_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item69_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item70_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:7;
		grid-row-end:span 1;
	}
	.item71_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item72_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item73_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item74_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item75_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item76_T10x10e{
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item77_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item78_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item79_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item80_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:8;
		grid-row-end:span 1;
	}
	.item81_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item82_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item83_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item84_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item85_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item86_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item87_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item88_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item89_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item90_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:9;
		grid-row-end:span 1;
	}
	.item91_T10x10.$$pageID$$ {
		grid-column-start:1;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item92_T10x10.$$pageID$$ {
		grid-column-start:2;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item93_T10x10.$$pageID$$ {
		grid-column-start:3;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item94_T10x10.$$pageID$$ {
		grid-column-start:4;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item95_T10x10.$$pageID$$ {
		grid-column-start:5;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item96_T10x10.$$pageID$$ {
		grid-column-start:6;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item97_T10x10.$$pageID$$ {
		grid-column-start:7;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item98_T10x10.$$pageID$$ {
		grid-column-start:8;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item99_T10x10.$$pageID$$ {
		grid-column-start:9;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	.item100_T10x10.$$pageID$$ {
		grid-column-start:10;
		grid-column-end:span 1;
		grid-row-start:10;
		grid-row-end:span 1;
	}
	

			</style>`)
	});

	bm.add("grid16_1", {
		label: "grid_16x12_1",
		category: "Grids",
		attributes: { class: "fa fa-th" },
		content: AddPageIDToString(`
		<div class="grid_T16x12" data-gjs-custom-name="grid_T16x12">
		</div>
		<style>
		.grid_T16x12.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:0vh;
			position:absolute;
		  }
		</style>`)
	});

	bm.add("grid16_2", {
		label: "grid_16x12_2",
		category: "Grids",
		attributes: { class: "fa fa-th" },
		content: AddPageIDToString(`
		<div class="grid_T16x12 " data-gjs-custom-name="grid_T16x12">
			<div class="item1_T16x12 " data-gjs-custom-name="item_1">
				<p class="" data-gjs-custom-name="text_1">1
				</p>
			</div>
			<div class="item2_T16x12 " data-gjs-custom-name="item_2">
				<p class="" data-gjs-custom-name="text_2">2
				</p>
			</div>
			<div class="item3_T16x12 " data-gjs-custom-name="item_3">
				<p class="" data-gjs-custom-name="text_3">3
				</p>
			</div>
			<div class="item4_T16x12 " data-gjs-custom-name="item_4">
				<p class="" data-gjs-custom-name="text_4">4
				</p>
			</div>
			<div class="item5_T16x12 " data-gjs-custom-name="item_5">
				<p class="" data-gjs-custom-name="text_5">5
				</p>
			</div>
			<div class="item6_T16x12 " data-gjs-custom-name="item_6">
				<p class="" data-gjs-custom-name="text_6">6
				</p>
			</div>
			<div class="item7_T16x12 " data-gjs-custom-name="item_7">
				<p class="" data-gjs-custom-name="text_7">7
				</p>
			</div>
			<div class="item8_T16x12 " data-gjs-custom-name="item_8">
				<p class="" data-gjs-custom-name="text_8">8
				</p>
			</div>
			<div class="item9_T16x12 " data-gjs-custom-name="item_9">
				<p class="" data-gjs-custom-name="text_9">9
				</p>
			</div>
			<div class="item10_T16x12 " data-gjs-custom-name="item_10">
				<p class="" data-gjs-custom-name="text_10">10
				</p>
			</div>
			<div class="item11_T16x12 " data-gjs-custom-name="item_11">
				<p class="" data-gjs-custom-name="text_11">11
				</p>
			</div>
			<div class="item12_T16x12 " data-gjs-custom-name="item_12">
				<p class="" data-gjs-custom-name="text_12">12
				</p>
			</div>
			<div class="item13_T16x12 " data-gjs-custom-name="item_13">
				<p class="" data-gjs-custom-name="text_13">13
				</p>
			</div>
			<div class="item14_T16x12 " data-gjs-custom-name="item_14">
				<p class="" data-gjs-custom-name="text_14">14
				</p>
			</div>
			<div class="item15_T16x12 " data-gjs-custom-name="item_15">
				<p class="" data-gjs-custom-name="text_15">15
				</p>
			</div>
			<div class="item16_T16x12 " data-gjs-custom-name="item_16">
				<p class="" data-gjs-custom-name="text_16">16
				</p>
			</div>
			<div class="item17_T16x12 " data-gjs-custom-name="item_17">
				<p class="" data-gjs-custom-name="text_17">17
				</p>
			</div>
			<div class="item18_T16x12 " data-gjs-custom-name="item_18">
				<p class="" data-gjs-custom-name="text_18">18
				</p>
			</div>
			<div class="item19_T16x12 " data-gjs-custom-name="item_19">
				<p class="" data-gjs-custom-name="text_19">19
				</p>
			</div>
			<div class="item20_T16x12 " data-gjs-custom-name="item_20">
				<p class="" data-gjs-custom-name="text_20">20
				</p>
			</div>
			<div class="item21_T16x12 " data-gjs-custom-name="item_21">
				<p class="" data-gjs-custom-name="text_21">21
				</p>
			</div>
			<div class="item22_T16x12 " data-gjs-custom-name="item_22">
				<p class="" data-gjs-custom-name="text_22">22
				</p>
			</div>
			<div class="item23_T16x12 " data-gjs-custom-name="item_23">
				<p class="" data-gjs-custom-name="text_23">23
				</p>
			</div>
			<div class="item24_T16x12 " data-gjs-custom-name="item_24">
				<p class="" data-gjs-custom-name="text_24">24
				</p>
			</div>
			<div class="item25_T16x12 " data-gjs-custom-name="item_25">
				<p class="" data-gjs-custom-name="text_25">25
				</p>
			</div>
			<div class="item26_T16x12 " data-gjs-custom-name="item_26">
				<p class="" data-gjs-custom-name="text_26">26
				</p>
			</div>
			<div class="item27_T16x12 " data-gjs-custom-name="item_27">
				<p class="" data-gjs-custom-name="text_27">27
				</p>
			</div>
			<div class="item28_T16x12 " data-gjs-custom-name="item_28">
				<p class="" data-gjs-custom-name="text_28">28
				</p>
			</div>
			<div class="item29_T16x12 " data-gjs-custom-name="item_29">
				<p class="" data-gjs-custom-name="text_29">29
				</p>
			</div>
			<div class="item30_T16x12 " data-gjs-custom-name="item_30">
				<p class="" data-gjs-custom-name="text_30">30
				</p>
			</div>
			<div class="item31_T16x12 " data-gjs-custom-name="item_31">
				<p class="" data-gjs-custom-name="text_31">31
				</p>
			</div>
			<div class="item32_T16x12 " data-gjs-custom-name="item_32">
				<p class="" data-gjs-custom-name="text_32">32
				</p>
			</div>
			<div class="item33_T16x12 " data-gjs-custom-name="item_33">
				<p class="" data-gjs-custom-name="text_33">33
				</p>
			</div>
			<div class="item34_T16x12s " data-gjs-custom-name="item_34">
				<p class="" data-gjs-custom-name="text_34">34
				</p>
			</div>
			<div class="item35_T16x12 " data-gjs-custom-name="item_35">
				<p class="" data-gjs-custom-name="text_35">35
				</p>
			</div>
			<div class="item36_T16x12 " data-gjs-custom-name="item_36">
				<p class="" data-gjs-custom-name="text_36">36
				</p>
			</div>
			<div class="item37_T16x12 " data-gjs-custom-name="item_37">
				<p class="" data-gjs-custom-name="text_37">37
				</p>
			</div>
			<div class="item38_T16x12 " data-gjs-custom-name="item_38">
				<p class="" data-gjs-custom-name="text_38">38
				</p>
			</div>
			<div class="item39_T16x12 " data-gjs-custom-name="item_39">
				<p class="" data-gjs-custom-name="text_39">39
				</p>
			</div>
			<div class="item40_T16x12 " data-gjs-custom-name="item_40">
				<p class="" data-gjs-custom-name="text_40">40
				</p>
			</div>
			<div class="item41_T16x12 " data-gjs-custom-name="item_41">
				<p class="" data-gjs-custom-name="text_41">41
				</p>
			</div>
			<div class="item42_T16x12 " data-gjs-custom-name="item_42">
				<p class="" data-gjs-custom-name="text_42">42
				</p>
			</div>
			<div class="item43_T16x12 " data-gjs-custom-name="item_43">
				<p class="" data-gjs-custom-name="text_43">43
				</p>
			</div>
			<div class="item44_T16x12 " data-gjs-custom-name="item_44">
				<p class="" data-gjs-custom-name="text_44">44
				</p>
			</div>
			<div class="item45_T16x12 " data-gjs-custom-name="item_45">
				<p class="" data-gjs-custom-name="text_45">45
				</p>
			</div>
			<div class="item46_T16x12 " data-gjs-custom-name="item_46">
				<p class="" data-gjs-custom-name="text_46">46
				</p>
			</div>
			<div class="item47_T16x12 " data-gjs-custom-name="item_47">
				<p class="" data-gjs-custom-name="text_47">47
				</p>
			</div>
			<div class="item48_T16x12 " data-gjs-custom-name="item_48">
				<p class="" data-gjs-custom-name="text_48">48
				</p>
			</div>
			<div class="item49_T16x12 " data-gjs-custom-name="item_49">
				<p class="" data-gjs-custom-name="text_49">49
				</p>
			</div>
			<div class="item50_T16x12 " data-gjs-custom-name="item_50">
				<p class="" data-gjs-custom-name="text_50">50
				</p>
			</div>
			<div class="item51_T16x12 " data-gjs-custom-name="item_51">
				<p class="" data-gjs-custom-name="text_51">51
				</p>
			</div>
			<div class="item52_T16x12 " data-gjs-custom-name="item_52">
				<p class="" data-gjs-custom-name="text_52">52
				</p>
			</div>
			<div class="item53_T16x12 " data-gjs-custom-name="item_53">
				<p class="" data-gjs-custom-name="text_53">53
				</p>
			</div>
			<div class="item54_T16x12 " data-gjs-custom-name="item_54">
				<p class="" data-gjs-custom-name="text_54">54
				</p>
			</div>
			<div class="item55_T16x12 " data-gjs-custom-name="item_55">
				<p class="" data-gjs-custom-name="text_55">55
				</p>
			</div>
			<div class="item56_T16x12 " data-gjs-custom-name="item_56">
				<p class="" data-gjs-custom-name="text_56">56
				</p>
			</div>
			<div class="item57_T16x12 " data-gjs-custom-name="item_57">
				<p class="" data-gjs-custom-name="text_57">57
				</p>
			</div>
			<div class="item58_T16x12 " data-gjs-custom-name="item_58">
				<p class="" data-gjs-custom-name="text_58">58
				</p>
			</div>
			<div class="item59_T16x12 " data-gjs-custom-name="item_59">
				<p class="" data-gjs-custom-name="text_59">59
				</p>
			</div>
			<div class="item60_T16x12 " data-gjs-custom-name="item_60">
				<p class="" data-gjs-custom-name="text_60">60
				</p>
			</div>
			<div class="item61_T16x12 " data-gjs-custom-name="item_61">
				<p class="" data-gjs-custom-name="text_61">61
				</p>
			</div>
			<div class="item62_T16x12 " data-gjs-custom-name="item_62">
				<p class="" data-gjs-custom-name="text_62">62
				</p>
			</div>
			<div class="item63_T16x12 " data-gjs-custom-name="item_63">
				<p class="" data-gjs-custom-name="text_63">63
				</p>
			</div>
			<div class="item64_T16x12 " data-gjs-custom-name="item_64">
				<p class="" data-gjs-custom-name="text_64">64
				</p>
			</div>
			<div class="item65_T16x12 " data-gjs-custom-name="item_65">
				<p class="" data-gjs-custom-name="text_65">65
				</p>
			</div>
			<div class="item66_T16x12 " data-gjs-custom-name="item_66">
				<p class="" data-gjs-custom-name="text_66">66
				</p>
			</div>
			<div class="item67_T16x12 " data-gjs-custom-name="item_67">
				<p class="" data-gjs-custom-name="text_67">67
				</p>
			</div>
			<div class="item68_T16x12 " data-gjs-custom-name="item_68">
				<p class="" data-gjs-custom-name="text_68">68
				</p>
			</div>
			<div class="item69_T16x12 " data-gjs-custom-name="item_69">
				<p class="" data-gjs-custom-name="text_69">69
				</p>
			</div>
			<div class="item70_T16x12 " data-gjs-custom-name="item_70">
				<p class="" data-gjs-custom-name="text_70">70
				</p>
			</div>
			<div class="item71_T16x12 " data-gjs-custom-name="item_71">
				<p class="" data-gjs-custom-name="text_71">71
				</p>
			</div>
			<div class="item72_T16x12 " data-gjs-custom-name="item_72">
				<p class="" data-gjs-custom-name="text_72">72
				</p>
			</div>
			<div class="item73_T16x12 " data-gjs-custom-name="item_73">
				<p class="" data-gjs-custom-name="text_73">73
				</p>
			</div>
			<div class="item74_T16x12 " data-gjs-custom-name="item_74">
				<p class="" data-gjs-custom-name="text_74">74
				</p>
			</div>
			<div class="item75_T16x12 " data-gjs-custom-name="item_75">
				<p class="" data-gjs-custom-name="text_75">75
				</p>
			</div>
			<div class="item76_T16x12 " data-gjs-custom-name="item_76">
				<p class="" data-gjs-custom-name="text_76">76
				</p>
			</div>
			<div class="item77_T16x12 " data-gjs-custom-name="item_77">
				<p class="" data-gjs-custom-name="text_77">77
				</p>
			</div>
			<div class="item78_T16x12 " data-gjs-custom-name="item_78">
				<p class="" data-gjs-custom-name="text_78">78
				</p>
			</div>
			<div class="item79_T16x12 " data-gjs-custom-name="item_79">
				<p class="" data-gjs-custom-name="text_79">79
				</p>
			</div>
			<div class="item80_T16x12 " data-gjs-custom-name="item_80">
				<p class="" data-gjs-custom-name="text_80">80
				</p>
			</div>
			<div class="item81_T16x12 " data-gjs-custom-name="item_81">
				<p class="" data-gjs-custom-name="text_81">81
				</p>
			</div>
			<div class="item82_T16x12 " data-gjs-custom-name="item_82">
				<p class="" data-gjs-custom-name="text_82">82
				</p>
			</div>
			<div class="item83_T16x12 " data-gjs-custom-name="item_83">
				<p class="" data-gjs-custom-name="text_83">83
				</p>
			</div>
			<div class="item84_T16x12 " data-gjs-custom-name="item_84">
				<p class="" data-gjs-custom-name="text_84">84
				</p>
			</div>
			<div class="item85_T16x12 " data-gjs-custom-name="item_85">
				<p class="" data-gjs-custom-name="text_85">85
				</p>
			</div>
			<div class="item86_T16x12 " data-gjs-custom-name="item_86">
				<p class="" data-gjs-custom-name="text_86">86
				</p>
			</div>
			<div class="item87_T16x12 " data-gjs-custom-name="item_87">
				<p class="" data-gjs-custom-name="text_87">87
				</p>
			</div>
			<div class="item88_T16x12 " data-gjs-custom-name="item_88">
				<p class="" data-gjs-custom-name="text_88">88
				</p>
			</div>
			<div class="item89_T16x12 " data-gjs-custom-name="item_89">
				<p class="" data-gjs-custom-name="text_89">89
				</p>
			</div>
			<div class="item90_T16x12 " data-gjs-custom-name="item_90">
				<p class="" data-gjs-custom-name="text_90">90
				</p>
			</div>
			<div class="item91_T16x12 " data-gjs-custom-name="item_91">
				<p class="" data-gjs-custom-name="text_91">91
				</p>
			</div>
			<div class="item92_T16x12 " data-gjs-custom-name="item_92">
				<p class="" data-gjs-custom-name="text_92">92
				</p>
			</div>
			<div class="item93_T16x12 " data-gjs-custom-name="item_93">
				<p class="" data-gjs-custom-name="text_93">93
				</p>
			</div>
			<div class="item94_T16x12 " data-gjs-custom-name="item_94">
				<p class="" data-gjs-custom-name="text_94">94
				</p>
			</div>
			<div class="item95_T16x12 " data-gjs-custom-name="item_95">
				<p class="" data-gjs-custom-name="text_95">95
				</p>
			</div>
			<div class="item96_T16x12 " data-gjs-custom-name="item_96">
				<p class="" data-gjs-custom-name="text_96">96
				</p>
			</div>
			<div class="item97_T16x12 " data-gjs-custom-name="item_97">
				<p class="" data-gjs-custom-name="text_97">97
				</p>
			</div>
			<div class="item98_T16x12 " data-gjs-custom-name="item_98">
				<p class="" data-gjs-custom-name="text_98">98
				</p>
			</div>
			<div class="item99_T16x12 " data-gjs-custom-name="item_99">
				<p class="" data-gjs-custom-name="text_99">99
				</p>
			</div>
			<div class="item100_T16x12 " data-gjs-custom-name="item_100">
				<p class="" data-gjs-custom-name="text_100">100
				</p>
			</div>
			<div class="item101_T16x12 " data-gjs-custom-name="item_101">
				<p class="" data-gjs-custom-name="text_101">101
				</p>
			</div>
			<div class="item102_T16x12 " data-gjs-custom-name="item_102">
				<p class="" data-gjs-custom-name="text_102">102
				</p>
			</div>
			<div class="item103_T16x12 " data-gjs-custom-name="item_103">
				<p class="" data-gjs-custom-name="text_103">103
				</p>
			</div>
			<div class="item104_T16x12 " data-gjs-custom-name="item_104">
				<p class="" data-gjs-custom-name="text_104">104
				</p>
			</div>
			<div class="item105_T16x12 " data-gjs-custom-name="item_105">
				<p class="" data-gjs-custom-name="text_105">105
				</p>
			</div>
			<div class="item106_T16x12 " data-gjs-custom-name="item_106">
				<p class="" data-gjs-custom-name="text_106">106
				</p>
			</div>
			<div class="item107_T16x12 " data-gjs-custom-name="item_107">
				<p class="" data-gjs-custom-name="text_107">107
				</p>
			</div>
			<div class="item108_T16x12 " data-gjs-custom-name="item_108">
				<p class="" data-gjs-custom-name="text_108">108
				</p>
			</div>
			<div class="item109_T16x12 " data-gjs-custom-name="item_109">
				<p class="" data-gjs-custom-name="text_109">109
				</p>
			</div>
			<div class="item110_T16x12 " data-gjs-custom-name="item_110">
				<p class="" data-gjs-custom-name="text_110">110
				</p>
			</div>
			<div class="item111_T16x12 " data-gjs-custom-name="item_111">
				<p class="" data-gjs-custom-name="text_111">111
				</p>
			</div>
			<div class="item112_T16x12 " data-gjs-custom-name="item_112">
				<p class="" data-gjs-custom-name="text_112">112
				</p>
			</div>
			<div class="item113_T16x12 " data-gjs-custom-name="item_113">
				<p class="" data-gjs-custom-name="text_113">113
				</p>
			</div>
			<div class="item114_T16x12 " data-gjs-custom-name="item_114">
				<p class="" data-gjs-custom-name="text_114">114
				</p>
			</div>
			<div class="item115_T16x12 " data-gjs-custom-name="item_115">
				<p class="" data-gjs-custom-name="text_115">115
				</p>
			</div>
			<div class="item116_T16x12 " data-gjs-custom-name="item_116">
				<p class="" data-gjs-custom-name="text_116">116
				</p>
			</div>
			<div class="item117_T16x12 " data-gjs-custom-name="item_117">
				<p class="" data-gjs-custom-name="text_117">117
				</p>
			</div>
			<div class="item118_T16x12 " data-gjs-custom-name="item_118">
				<p class="" data-gjs-custom-name="text_118">118
				</p>
			</div>
			<div class="item119_T16x12 " data-gjs-custom-name="item_119">
				<p class="" data-gjs-custom-name="text_119">119
				</p>
			</div>
			<div class="item120_T16x12 " data-gjs-custom-name="item_120">
				<p class="" data-gjs-custom-name="text_120">120
				</p>
			</div>
			<div class="item121_T16x12 " data-gjs-custom-name="item_121">
				<p class="" data-gjs-custom-name="text_121">121
				</p>
			</div>
			<div class="item122_T16x12 " data-gjs-custom-name="item_122">
				<p class="" data-gjs-custom-name="text_122">122
				</p>
			</div>
			<div class="item123_T16x12 " data-gjs-custom-name="item_123">
				<p class="" data-gjs-custom-name="text_123">123
				</p>
			</div>
			<div class="item124_T16x12 " data-gjs-custom-name="item_124">
				<p class="" data-gjs-custom-name="text_124">124
				</p>
			</div>
			<div class="item125_T16x12 " data-gjs-custom-name="item_125">
				<p class="" data-gjs-custom-name="text_125">125
				</p>
			</div>
			<div class="item126_T16x12 " data-gjs-custom-name="item_126">
				<p class="" data-gjs-custom-name="text_126">126
				</p>
			</div>
			<div class="item127_T16x12 " data-gjs-custom-name="item_127">
				<p class="" data-gjs-custom-name="text_127">127
				</p>
			</div>
			<div class="item128_T16x12 " data-gjs-custom-name="item_128">
				<p class="" data-gjs-custom-name="text_128">128
				</p>
			</div>
			<div class="item129_T16x12 " data-gjs-custom-name="item_129">
				<p class="" data-gjs-custom-name="text_129">129
				</p>
			</div>
			<div class="item130_T16x12 " data-gjs-custom-name="item_130">
				<p class="" data-gjs-custom-name="text_130">130
				</p>
			</div>
			<div class="item131_T16x12 " data-gjs-custom-name="item_131">
				<p class="" data-gjs-custom-name="text_131">131
				</p>
			</div>
			<div class="item132_T16x12 " data-gjs-custom-name="item_132">
				<p class="" data-gjs-custom-name="text_132">132
				</p>
			</div>
			<div class="item133_T16x12 " data-gjs-custom-name="item_133">
				<p class="" data-gjs-custom-name="text_133">133
				</p>
			</div>
			<div class="item134_T16x12s " data-gjs-custom-name="item_134">
				<p class="" data-gjs-custom-name="text_134">134
				</p>
			</div>
			<div class="item135_T16x12 " data-gjs-custom-name="item_135">
				<p class="" data-gjs-custom-name="text_135">135
				</p>
			</div>
			<div class="item136_T16x12 " data-gjs-custom-name="item_136">
				<p class="" data-gjs-custom-name="text_136">136
				</p>
			</div>
			<div class="item137_T16x12 " data-gjs-custom-name="item_137">
				<p class="" data-gjs-custom-name="text_137">137
				</p>
			</div>
			<div class="item138_T16x12 " data-gjs-custom-name="item_138">
				<p class="" data-gjs-custom-name="text_138">138
				</p>
			</div>
			<div class="item139_T16x12 " data-gjs-custom-name="item_139">
				<p class="" data-gjs-custom-name="text_139">139
				</p>
			</div>
			<div class="item140_T16x12 " data-gjs-custom-name="item_140">
				<p class="" data-gjs-custom-name="text_140">140
				</p>
			</div>
			<div class="item141_T16x12 " data-gjs-custom-name="item_141">
				<p class="" data-gjs-custom-name="text_141">141
				</p>
			</div>
			<div class="item142_T16x12 " data-gjs-custom-name="item_142">
				<p class="" data-gjs-custom-name="text_142">142
				</p>
			</div>
			<div class="item143_T16x12 " data-gjs-custom-name="item_143">
				<p class="" data-gjs-custom-name="text_143">143
				</p>
			</div>
			<div class="item144_T16x12 " data-gjs-custom-name="item_144">
				<p class="" data-gjs-custom-name="text_144">144
				</p>
			</div>
			<div class="item145_T16x12 " data-gjs-custom-name="item_145">
				<p class="" data-gjs-custom-name="text_145">145
				</p>
			</div>
			<div class="item146_T16x12 " data-gjs-custom-name="item_146">
				<p class="" data-gjs-custom-name="text_146">146
				</p>
			</div>
			<div class="item147_T16x12 " data-gjs-custom-name="item_147">
				<p class="" data-gjs-custom-name="text_147">147
				</p>
			</div>
			<div class="item148_T16x12 " data-gjs-custom-name="item_148">
				<p class="" data-gjs-custom-name="text_148">148
				</p>
			</div>
			<div class="item149_T16x12 " data-gjs-custom-name="item_149">
				<p class="" data-gjs-custom-name="text_149">149
				</p>
			</div>
			<div class="item150_T16x12 " data-gjs-custom-name="item_150">
				<p class="" data-gjs-custom-name="text_150">150
				</p>
			</div>
			<div class="item151_T16x12 " data-gjs-custom-name="item_151">
				<p class="" data-gjs-custom-name="text_151">151
				</p>
			</div>
			<div class="item152_T16x12 " data-gjs-custom-name="item_152">
				<p class="" data-gjs-custom-name="text_152">152
				</p>
			</div>
			<div class="item153_T16x12 " data-gjs-custom-name="item_153">
				<p class="" data-gjs-custom-name="text_153">153
				</p>
			</div>
			<div class="item154_T16x12 " data-gjs-custom-name="item_154">
				<p class="" data-gjs-custom-name="text_154">154
				</p>
			</div>
			<div class="item155_T16x12 " data-gjs-custom-name="item_155">
				<p class="" data-gjs-custom-name="text_155">155
				</p>
			</div>
			<div class="item156_T16x12 " data-gjs-custom-name="item_156">
				<p class="" data-gjs-custom-name="text_156">156
				</p>
			</div>
			<div class="item157_T16x12 " data-gjs-custom-name="item_157">
				<p class="" data-gjs-custom-name="text_157">157
				</p>
			</div>
			<div class="item158_T16x12 " data-gjs-custom-name="item_158">
				<p class="" data-gjs-custom-name="text_158">158
				</p>
			</div>
			<div class="item159_T16x12 " data-gjs-custom-name="item_159">
				<p class="" data-gjs-custom-name="text_159">159
				</p>
			</div>
			<div class="item160_T16x12 " data-gjs-custom-name="item_160">
				<p class="" data-gjs-custom-name="text_160">160
				</p>
			</div>
			<div class="item161_T16x12 " data-gjs-custom-name="item_161">
				<p class="" data-gjs-custom-name="text_161">161
				</p>
			</div>
			<div class="item162_T16x12 " data-gjs-custom-name="item_162">
				<p class="" data-gjs-custom-name="text_162">162
				</p>
			</div>
			<div class="item163_T16x12 " data-gjs-custom-name="item_163">
				<p class="" data-gjs-custom-name="text_163">163
				</p>
			</div>
			<div class="item164_T16x12 " data-gjs-custom-name="item_164">
				<p class="" data-gjs-custom-name="text_164">164
				</p>
			</div>
			<div class="item165_T16x12 " data-gjs-custom-name="item_165">
				<p class="" data-gjs-custom-name="text_165">165
				</p>
			</div>
			<div class="item166_T16x12 " data-gjs-custom-name="item_166">
				<p class="" data-gjs-custom-name="text_166">166
				</p>
			</div>
			<div class="item167_T16x12 " data-gjs-custom-name="item_167">
				<p class="" data-gjs-custom-name="text_167">167
				</p>
			</div>
			<div class="item168_T16x12 " data-gjs-custom-name="item_168">
				<p class="" data-gjs-custom-name="text_168">168
				</p>
			</div>
			<div class="item169_T16x12 " data-gjs-custom-name="item_169">
				<p class="" data-gjs-custom-name="text_169">169
				</p>
			</div>
			<div class="item170_T16x12 " data-gjs-custom-name="item_170">
				<p class="" data-gjs-custom-name="text_170">170
				</p>
			</div>
			<div class="item171_T16x12 " data-gjs-custom-name="item_171">
				<p class="" data-gjs-custom-name="text_171">171
				</p>
			</div>
			<div class="item172_T16x12 " data-gjs-custom-name="item_172">
				<p class="" data-gjs-custom-name="text_172">172
				</p>
			</div>
			<div class="item173_T16x12 " data-gjs-custom-name="item_173">
				<p class="" data-gjs-custom-name="text_173">173
				</p>
			</div>
			<div class="item174_T16x12 " data-gjs-custom-name="item_174">
				<p class="" data-gjs-custom-name="text_174">174
				</p>
			</div>
			<div class="item175_T16x12 " data-gjs-custom-name="item_175">
				<p class="" data-gjs-custom-name="text_175">175
				</p>
			</div>
			<div class="item176_T16x12 " data-gjs-custom-name="item_176">
				<p class="" data-gjs-custom-name="text_176">176
				</p>
			</div>
			<div class="item177_T16x12 " data-gjs-custom-name="item_177">
				<p class="" data-gjs-custom-name="text_177">177
				</p>
			</div>
			<div class="item178_T16x12 " data-gjs-custom-name="item_178">
				<p class="" data-gjs-custom-name="text_178">178
				</p>
			</div>
			<div class="item179_T16x12 " data-gjs-custom-name="item_179">
				<p class="" data-gjs-custom-name="text_179">179
				</p>
			</div>
			<div class="item180_T16x12 " data-gjs-custom-name="item_180">
				<p class="" data-gjs-custom-name="text_180">180
				</p>
			</div>
			<div class="item181_T16x12 " data-gjs-custom-name="item_181">
				<p class="" data-gjs-custom-name="text_181">181
				</p>
			</div>
			<div class="item182_T16x12 " data-gjs-custom-name="item_182">
				<p class="" data-gjs-custom-name="text_182">182
				</p>
			</div>
			<div class="item183_T16x12 " data-gjs-custom-name="item_183">
				<p class="" data-gjs-custom-name="text_183">183
				</p>
			</div>
			<div class="item184_T16x12 " data-gjs-custom-name="item_184">
				<p class="" data-gjs-custom-name="text_184">184
				</p>
			</div>
			<div class="item185_T16x12 " data-gjs-custom-name="item_85">
				<p class="" data-gjs-custom-name="text_185">185
				</p>
			</div>
			<div class="item186_T16x12 " data-gjs-custom-name="item_186">
				<p class="" data-gjs-custom-name="text_186">186
				</p>
			</div>
			<div class="item187_T16x12 " data-gjs-custom-name="item_187">
				<p class="" data-gjs-custom-name="text_187">187
				</p>
			</div>
			<div class="item188_T16x12 " data-gjs-custom-name="item_188">
				<p class="" data-gjs-custom-name="text_188">188
				</p>
			</div>
			<div class="item189_T16x12 " data-gjs-custom-name="item_189">
				<p class="" data-gjs-custom-name="text_189">189
				</p>
			</div>
			<div class="item190_T16x12 " data-gjs-custom-name="item_190">
				<p class="" data-gjs-custom-name="text_190">190
				</p>
			</div>
			<div class="item191_T16x12 " data-gjs-custom-name="item_191">
				<p class="" data-gjs-custom-name="text_191">191
				</p>
			</div>
			<div class="item192_T16x12 " data-gjs-custom-name="item_192">
				<p class="" data-gjs-custom-name="text_192">192
				</p>
			</div>
		</div>
		<style>
			.grid_T16x12.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
				grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
				grid-column-gap:0vh;
				grid-row-gap:0vh;
				width:100%;
				height:100%;
				padding:6vh;
				position:absolute;
			}
			.item1_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item2_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item3_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item4_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item5_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item6_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item7_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item8_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item9_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item10_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item11_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item12_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item13_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item14_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item15_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item16_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			.item17_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item18_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item19_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item20_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item21_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item22_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item23_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item24_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item25_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item26_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item27_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item28_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item29_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item30_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item31_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item32_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			.item33_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item34_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item35_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item36_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item37_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item38_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item39_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item40_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item41_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item42_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item43_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item44_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item45_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item46_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item47_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item48_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:3;
				grid-row-end:span 1;
			}
			.item49_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item50_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item51_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item52_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item53_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item54_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item55_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item56_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item57_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item58_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item59_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item60_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item61_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item62_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item63_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item64_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:4;
				grid-row-end:span 1;
			}
			.item65_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item66_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item67_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item68_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item69_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item70_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item71_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item72_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item73_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item74_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item75_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item76_T16x12e{
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item77_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item78_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item79_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item80_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:5;
				grid-row-end:span 1;
			}
			.item81_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item82_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item83_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item84_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item85_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item86_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item87_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item88_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item89_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item90_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item91_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item92_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item93_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item94_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item95_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item96_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:6;
				grid-row-end:span 1;
			}
			.item97_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item98_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item99_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item100_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item101_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item102_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item103_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item104_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item105_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item106_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item107_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item108_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item109_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item110_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item111_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item112_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:7;
				grid-row-end:span 1;
			}
			.item113_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item114_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item115_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item116_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item117_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item118_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item119_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item120_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item121_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item122_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item123_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item124_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item125_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item126_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item127_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item128_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:8;
				grid-row-end:span 1;
			}
			.item129_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item130_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item131_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item132_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item133_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item134_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item135_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item136_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item137_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item138_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item139_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item140_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item141_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item142_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item143_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item144_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:9;
				grid-row-end:span 1;
			}
			.item145_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item146_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item147_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item148_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item149_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item150_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item151_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item152_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item153_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item154_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item155_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item156_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item157_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item158_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item159_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item160_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:10;
				grid-row-end:span 1;
			}
			.item161_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item162_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item163_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item164_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item165_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item166_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item167_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item168_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item169_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item170_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item171_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item172_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item173_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item174_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item175_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item176_T16x12e{
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:11;
				grid-row-end:span 1;
			}
			.item177_T16x12.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item178_T16x12.$$pageID$$ {
				grid-column-start:2;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item179_T16x12.$$pageID$$ {
				grid-column-start:3;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item180_T16x12.$$pageID$$ {
				grid-column-start:4;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item181_T16x12.$$pageID$$ {
				grid-column-start:5;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item182_T16x12.$$pageID$$ {
				grid-column-start:6;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item183_T16x12.$$pageID$$ {
				grid-column-start:7;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item184_T16x12.$$pageID$$ {
				grid-column-start:8;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item185_T16x12.$$pageID$$ {
				grid-column-start:9;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item186_T16x12.$$pageID$$ {
				grid-column-start:10;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item187_T16x12.$$pageID$$ {
				grid-column-start:11;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item188_T16x12.$$pageID$$ {
				grid-column-start:12;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item189_T16x12.$$pageID$$ {
				grid-column-start:13;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item190_T16x12.$$pageID$$ {
				grid-column-start:14;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item191_T16x12.$$pageID$$ {
				grid-column-start:15;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			.item192_T16x12.$$pageID$$ {
				grid-column-start:16;
				grid-column-end:span 1;
				grid-row-start:12;
				grid-row-end:span 1;
			}
			
		</style>`)
	});

	bm.add("grid0", {
		label: "grid_T0",
		category: "Grids",
		content: AddPageIDToString(`
		<div class="grid_T0" data-gjs-custom-name="grid_T0">
		</div>
		<style>
		.grid_T0.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr;
			min-height:3vh;
		}
		</style>`)
	});

	bm.add("template1", {
		label: "grid_T1",
		category: "Grids",
		attributes: { class: "fa template t1" },
		content: AddPageIDToString(`
		<div class="grid_T1 " data-gjs-custom-name="grid_T1">
			<div class="item1_T1 " data-gjs-custom-name="item1_T1">
			</div>
		</div>
		<style>
		.grid_T1.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr;
			width:100%;
			height:100%;
		}
		.item1_T1.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		</style>`)
	});

	bm.add("template2", {
		label: "grid_T2",
		category: "Grids",
		attributes: { class: "fa template t2" },
		content: AddPageIDToString(`
		<div class="grid_T2 " data-gjs-custom-name="grid_T2">
			<div class="item1_T2 " data-gjs-custom-name="item1_T2">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
			.grid_T2.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:1fr;
				width:100%;
				height:100%;
				padding:6vh;
			}
			.item1_T2.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
		</style>`)
	});

	bm.add("template3", {
		label: "grid_T3",
		category: "Grids",
		attributes: { class: "fa template t3" },
		content: AddPageIDToString(`
		<div class="grid_T3 " data-gjs-custom-name="grid_T3">
			<div class="item1_T3 " data-gjs-custom-name="item1_T3">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
			.grid_T3.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:1fr;
				width:100%;
				height:100%;
				padding:12vh;
			}
			.item1_T3.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
		</style>`)
	});

	bm.add("template4", {
		label: "grid_T4",
		category: "Grids",
		attributes: { class: "fa template t4" },
		content: AddPageIDToString(`
		<div class="grid_T4 " data-gjs-custom-name="grid_T4">
			<div class="item1_T4 " data-gjs-custom-name="item1_T4">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
			.grid_T4.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:1fr 3fr;
				grid-column-gap:0vh;
				grid-row-gap:0vh;
				width:100%;
				height:100%;
				padding:6vh;
			}
			.item1_T4.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			
		</style>`)
	});

	bm.add("template5", {
		label: "grid_T5",
		category: "Grids",
		attributes: { class: "fa template t5" },
		content: AddPageIDToString(`
		<div class="grid_T5 " data-gjs-custom-name="grid_T5">
			<div class="item1_T5 " data-gjs-custom-name="item1_T5">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
			.grid_T5.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:1fr 1fr;
				grid-column-gap:0vh;
				grid-row-gap:0vh;
				width:100%;
				height:100%;
				padding:6vh;
			}
			.item1_T5.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:1;
				grid-row-end:span 1;
			}
			
		</style>`)
	});

	bm.add("template6", {
		label: "grid_T6",
		category: "Grids",
		attributes: { class: "fa template t6" },
		content: AddPageIDToString(`
		<div class="grid_T6 " data-gjs-custom-name="grid_T6">
			<div class="item1_T6 " data-gjs-custom-name="item1_T6">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T6.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T6.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template7", {
		label: "grid_T7",
		category: "Grids",
		attributes: { class: "fa template t7" },
		content: AddPageIDToString(`
		<div class="grid_T7 " data-gjs-custom-name="grid_T7">
			<div class="item_T7 " data-gjs-custom-name="item_T7">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
			.grid_T7.$$pageID$$ {
				display:grid;
				grid-template-columns:1fr;
				grid-template-rows:1fr 1fr;
				grid-column-gap:0vh;
				grid-row-gap:0vh;
				width:100%;
				height:100%;
				padding:6vh;
			}
			.item_T7.$$pageID$$ {
				grid-column-start:1;
				grid-column-end:span 1;
				grid-row-start:2;
				grid-row-end:span 1;
			}
			
		</style>`)
	});

	bm.add("template8", {
		label: "grid_T8",
		category: "Grids",
		attributes: { class: "fa template t8" },
		content: AddPageIDToString(`
		<div class="grid_T8 " data-gjs-custom-name="grid_T8">
			<div class="item1_T8 " data-gjs-custom-name="item1_T8">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T8 " data-gjs-custom-name="item2_T8">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T8.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T8.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T8.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		</style>`)
	});

	bm.add("template9", {
		label: "grid_T9",
		category: "Grids",
		attributes: { class: "fa template t9" },
		content: AddPageIDToString(`
		<div class="grid_T9 " data-gjs-custom-name="grid_T9">
			<div class="item1_T9 " data-gjs-custom-name="item1_T9">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T9 " data-gjs-custom-name="item2_T9">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T9 " data-gjs-custom-name="item3_T9">
				<p class="" data-gjs-custom-name="text_2">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T9.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T9.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template10", {
		label: "grid_T10",
		category: "Grids",
		attributes: { class: "fa template t10" },
		content: AddPageIDToString(`
		<div class="grid_T10 " data-gjs-custom-name="grid_T10">
			<div class="item1_T10 " data-gjs-custom-name="item1_T10">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T10 " data-gjs-custom-name="item2_T10">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T10 " data-gjs-custom-name="item3_T10">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T10 " data-gjs-custom-name="item4_T10">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T10.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T10.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template11", {
		label: "grid_T11",
		category: "Grids",
		attributes: { class: "fa template t11" },
		content: AddPageIDToString(`
		<div class="grid_T11 " data-gjs-custom-name="grid_T11">
			<div class="item1_T11 " data-gjs-custom-name="item1_T11">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T11.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T11.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template12", {
		label: "grid_T12",
		category: "Grids",
		attributes: { class: "fa template t12" },
		content: AddPageIDToString(`
		<div class="grid_T12 " data-gjs-custom-name="grid_T12">
			<div class="item1_T12 " data-gjs-custom-name="item1_T12">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T12.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T12.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template13", {
		label: "grid_T13",
		category: "Grids",
		attributes: { class: "fa template t13" },
		content: AddPageIDToString(`
		<div class="grid_T13 " data-gjs-custom-name="grid_T13">
			<div class="item1_T13 " data-gjs-custom-name="item1_T13">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T13 " data-gjs-custom-name="item2_T13">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T13.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T13.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T13.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template14", {
		label: "grid_T14",
		category: "Grids",
		attributes: { class: "fa template t14" },
		content: AddPageIDToString(`
		<div class="grid_T14 " data-gjs-custom-name="grid_T14">
			<div class="item1_T14 " data-gjs-custom-name="item1_T14">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T14 " data-gjs-custom-name="item2_T14">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T14.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 2fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T14.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T14.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template15", {
		label: "grid_T15",
		category: "Grids",
		attributes: { class: "fa template t15" },
		content: AddPageIDToString(`
		<div class="grid_T15 " data-gjs-custom-name="grid_T15">
			<div class="item1_T15 " data-gjs-custom-name="item1_T15">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T15 " data-gjs-custom-name="item2_T15">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T15.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T15.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T15.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		</style>`)
	});

	bm.add("template16", {
		label: "grid_T16",
		category: "Grids",
		attributes: { class: "fa template t16" },
		content: AddPageIDToString(`
		<div class="grid_T16 " data-gjs-custom-name="grid_T16">
			<div class="item1_T16 " data-gjs-custom-name="item1_T16">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T16 " data-gjs-custom-name="item2_T16">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T16 " data-gjs-custom-name="item3_T16">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T16.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T16.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T16.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T16.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template17", {
		label: "grid_T17",
		category: "Grids",
		attributes: { class: "fa template t17" },
		content: AddPageIDToString(`
		<div class="grid_T17 " data-gjs-custom-name="grid_T17">
			<div class="item1_T17 " data-gjs-custom-name="item1_T17">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T17.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 2fr;
			grid-template-rows:1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T17.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template18", {
		label: "grid_T18",
		category: "Grids",
		attributes: { class: "fa template t18" },
		content: AddPageIDToString(`
		<div class="grid_T18 " data-gjs-custom-name="grid_T18">
			<div class="item1_T18 " data-gjs-custom-name="item1_T18">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T18 " data-gjs-custom-name="item2_T18">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T18.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T18.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T18.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template19", {
		label: "grid_T19",
		category: "Grids",
		attributes: { class: "fa template t19" },
		content: AddPageIDToString(`
		<div class="grid_T19 " data-gjs-custom-name="grid_T19">
			<div class="item1_T19 " data-gjs-custom-name="item1_T19">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T19 " data-gjs-custom-name="item2_T19">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T19.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T19.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T19.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template20", {
		label: "grid_T20",
		category: "Grids",
		attributes: { class: "fa template t20" },
		content: AddPageIDToString(`
		<div class="grid_T20 " data-gjs-custom-name="grid_T20">
			<div class="item1_T20 " data-gjs-custom-name="item1_T20">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T20.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T20.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template21", {
		label: "grid_T21",
		category: "Grids",
		attributes: { class: "fa template t21" },
		content: AddPageIDToString(`
		<div class="grid_T21 " data-gjs-custom-name="grid_T21">
			<div class="item1_T21 " data-gjs-custom-name="item1_T21">
				<p data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T21 " data-gjs-custom-name="item2_T21">
				<p data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T21 " data-gjs-custom-name="item3_T21">
				<p data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T21 " data-gjs-custom-name="item4_T21">
				<p data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T21.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T21.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T21.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T21.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T21.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template22", {
		label: "grid_T22",
		category: "Grids",
		attributes: { class: "fa template t22" },
		content: AddPageIDToString(`
		<div class="grid_T22 " data-gjs-custom-name="grid_T22">
			<div class="item1_T22 " data-gjs-custom-name="item1_T22">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T22 " data-gjs-custom-name="item2_T22">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T22.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T22.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T22.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template23", {
		label: "grid_T23",
		category: "Grids",
		attributes: { class: "fa template t23" },
		content: AddPageIDToString(`
		<div class="grid_T23 " data-gjs-custom-name="grid_T23">
			<div class="item1_T23 " data-gjs-custom-name="item1_T23">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T23 " data-gjs-custom-name="item2_T23">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T23.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T23.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T23.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template24", {
		label: "grid_T24",
		category: "Grids",
		attributes: { class: "fa template t24" },
		content: AddPageIDToString(`
		<div class="grid_T24 " data-gjs-custom-name="grid_T24">
			<div class="item1_T24 " data-gjs-custom-name="item1_T24">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T24 " data-gjs-custom-name="item2_T24">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T24 " data-gjs-custom-name="item3_T24">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T24.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:0.5fr 1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T24.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T24.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T24.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template25", {
		label: "grid_T25",
		category: "Grids",
		attributes: { class: "fa template t25" },
		content: AddPageIDToString(`
		<div class="grid_T25 " data-gjs-custom-name="grid_T25">
			<div class="item1_T25 " data-gjs-custom-name="item1_T25">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T25 " data-gjs-custom-name="item2_T25">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T25 " data-gjs-custom-name="item3_T25">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T25.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr 0.5fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T25.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T25.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T25.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template26", {
		label: "grid_T26",
		category: "Grids",
		attributes: { class: "fa template t26" },
		content: AddPageIDToString(`
		<div class="grid_T26 " data-gjs-custom-name="grid_T26">
			<div class="item1_T26 " data-gjs-custom-name="item1_T26">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T26 " data-gjs-custom-name="item2_T26">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T26 " data-gjs-custom-name="item3_T26">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T26.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 2fr 2fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T26.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T26.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T26.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template27", {
		label: "grid_T27",
		category: "Grids",
		attributes: { class: "fa template t27" },
		content: AddPageIDToString(`
		<div class="grid_T27 " data-gjs-custom-name="grid_T27">
			<div class="item1_T27 " data-gjs-custom-name="item1_T27">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T27 " data-gjs-custom-name="item2_T27">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T27 " data-gjs-custom-name="item3_T27">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T27.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T27.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template28", {
		label: "grid_T28",
		category: "Grids",
		attributes: { class: "fa template t28" },
		content: AddPageIDToString(`
		<div class="grid_T28 " data-gjs-custom-name="grid_T28">
			<div class="item1_T28 " data-gjs-custom-name="item1_T28">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T28 " data-gjs-custom-name="item2_T28">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T28.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T28.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T28.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template29", {
		label: "grid_T29",
		category: "Grids",
		attributes: { class: "fa template t29" },
		content: AddPageIDToString(`
		<div class="grid_T29 " data-gjs-custom-name="grid_T29">
			<div class="item1_T29 " data-gjs-custom-name="item1_T29">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T29 " data-gjs-custom-name="item2_T29">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T29.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T29.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T29.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template30", {
		label: "grid_T30",
		category: "Grids",
		attributes: { class: "fa template t30" },
		content: AddPageIDToString(`
		<div class="grid_T30 " data-gjs-custom-name="grid_T30">
			<div class="item1_T30 " data-gjs-custom-name="item1_T30">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T30 " data-gjs-custom-name="item2_T30">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T30.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T30.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T30.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template31", {
		label: "grid_T31",
		category: "Grids",
		attributes: { class: "fa template t31" },
		content: AddPageIDToString(`
		<div class="grid_T31 " data-gjs-custom-name="grid_T31">
			<div class="item1_T31 " data-gjs-custom-name="item1_T31">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T31 " data-gjs-custom-name="item2_T31">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T31.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T31.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T31.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template32", {
		label: "grid_T32",
		category: "Grids",
		attributes: { class: "fa template t32" },
		content: AddPageIDToString(`
		<div class="grid_T32 " data-gjs-custom-name="grid_T32">
			<div class="item1_T32 " data-gjs-custom-name="item1_T32">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T32 " data-gjs-custom-name="item2_T32">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T32 " data-gjs-custom-name="item3_T32">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T32 " data-gjs-custom-name="item4_T32">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T32.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T32.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T32.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T32.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T32.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template33", {
		label: "grid_T33",
		category: "Grids",
		attributes: { class: "fa template t33" },
		content: AddPageIDToString(`
		<div class="grid_T33 " data-gjs-custom-name="grid_T33">
			<div class="item1_T33 " data-gjs-custom-name="item1_T33">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T33 " data-gjs-custom-name="item2_T33">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T33 " data-gjs-custom-name="item3_T33">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T33.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T33.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T33.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template34", {
		label: "grid_T34",
		category: "Grids",
		attributes: { class: "fa template t34" },
		content: AddPageIDToString(`
		<div class="grid_T34 " data-gjs-custom-name="grid_T34">
			<div class="item1_T34 " data-gjs-custom-name="item1_T34">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T34 " data-gjs-custom-name="item2_T34">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T34 " data-gjs-custom-name="item3_T34">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T34.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T34.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T34.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T34.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template35", {
		label: "grid_T35",
		category: "Grids",
		attributes: { class: "fa template t35" },
		content: AddPageIDToString(`
		<div class="grid_T35 " data-gjs-custom-name="grid_T35">
			<div class="item1_T35 " data-gjs-custom-name="item1_T35">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T35 " data-gjs-custom-name="item2_T35">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T35 " data-gjs-custom-name="item3_T35">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T35 " data-gjs-custom-name="item4_T35">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T35.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:0.5fr 1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T35.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T35.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T35.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T35.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}		
		</style>`)
	});

	bm.add("template36", {
		label: "grid_T36",
		category: "Grids",
		attributes: { class: "fa template t36" },
		content: AddPageIDToString(`
		<div class="grid_T36 " data-gjs-custom-name="grid_T36">
			<div class="item1_T36 " data-gjs-custom-name="item1_T36">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T36 " data-gjs-custom-name="item2_T36">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T36 " data-gjs-custom-name="item3_T36">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T36 " data-gjs-custom-name="item4_T36">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T36.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:3fr 1fr 0.5fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T36.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T36.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T36.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T36.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template37", {
		label: "grid_T37",
		category: "Grids",
		attributes: { class: "fa template t37" },
		content: AddPageIDToString(`
		<div class="grid_T37 " data-gjs-custom-name="grid_T37">
			<div class="item1_T37 " data-gjs-custom-name="item1_T37">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T37 " data-gjs-custom-name="item2_T37">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T37 " data-gjs-custom-name="item3_T37">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T37 " data-gjs-custom-name="item4_T37">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T37.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T37.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T37.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T37.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T37.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template38", {
		label: "grid_T38",
		category: "Grids",
		attributes: { class: "fa template t38" },
		content: AddPageIDToString(`
		<div class="grid_T38 " data-gjs-custom-name="grid_T38">
			<div class="item1_T38 " data-gjs-custom-name="item1_T38">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T38 " data-gjs-custom-name="item2_T38">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T38 " data-gjs-custom-name="item3_T38">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T38 " data-gjs-custom-name="item4_T38">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T38.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T38.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T38.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T38.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T38.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template39", {
		label: "grid_T39",
		category: "Grids",
		attributes: { class: "fa template t39" },
		content: AddPageIDToString(`
		<div class="grid_T39 " data-gjs-custom-name="grid_T39">
			<div class="item1_T39 " data-gjs-custom-name="item1_T39">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T39 " data-gjs-custom-name="item2_T39">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T39 " data-gjs-custom-name="item3_T39">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T39 " data-gjs-custom-name="item4_T39">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T39.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T39.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T39.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T39.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T39.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}		
		</style>`)
	});

	bm.add("template40", {
		label: "grid_T40",
		category: "Grids",
		attributes: { class: "fa template t40" },
		content: AddPageIDToString(`
		<div class="grid_T40 " data-gjs-custom-name="grid_T40">
			<div class="item1_T40 " data-gjs-custom-name="item1_T40">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T40 " data-gjs-custom-name="item2_T40">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T40 " data-gjs-custom-name="item3_T40">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T40 " data-gjs-custom-name="item4_T40">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T40 " data-gjs-custom-name="item5_T40">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T40.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:0.5fr 1fr 3fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T40.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T40.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T40.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T40.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item5_T40.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template41", {
		label: "grid_T41",
		category: "Grids",
		attributes: { class: "fa template t41" },
		content: AddPageIDToString(`
		<div class="grid_T41 " data-gjs-custom-name="grid_T41">
			<div class="item1_T41 " data-gjs-custom-name="item1_T41">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T41 " data-gjs-custom-name="item2_T41">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T41 " data-gjs-custom-name="item3_T41">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T41 " data-gjs-custom-name="item4_T41">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T41 " data-gjs-custom-name="item5_T41">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T41.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:3fr 1fr 0.5fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T41.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T41.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T41.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T41.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item5_T41.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:3;
			grid-row-end:span 1;
		}		
		</style>`)
	});

	bm.add("template42", {
		label: "grid_T42",
		category: "Grids",
		attributes: { class: "fa template t42" },
		content: AddPageIDToString(`
		<div class="grid_T42 " data-gjs-custom-name="grid_T42">
			<div class="item1_T42 " data-gjs-custom-name="item1_T42">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T42 " data-gjs-custom-name="item2_T42">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T42 " data-gjs-custom-name="item3_T42">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T42 " data-gjs-custom-name="item4_T42">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T42 " data-gjs-custom-name="item5_T42">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T42.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr 3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T42.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T42.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T42.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T42.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item5_T42.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template43", {
		label: "grid_T43",
		category: "Grids",
		attributes: { class: "fa template t43" },
		content: AddPageIDToString(`
		<div class="grid_T43 " data-gjs-custom-name="grid_T43">
			<div class="item1_T43 " data-gjs-custom-name="item1_T43">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T43 " data-gjs-custom-name="item2_T43">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T43 " data-gjs-custom-name="item3_T43">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T43 " data-gjs-custom-name="item4_T43">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T43 " data-gjs-custom-name="item5_T43">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T43" data-gjs-custom-name="item6_T43">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
		</div>
		<style>
		.grid_T43.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T43.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T43.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T43.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T43.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T43.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item6_T43.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template44", {
		label: "grid_T44",
		category: "Grids",
		attributes: { class: "fa template t44" },
		content: AddPageIDToString(`
		<div class="grid_T44 " data-gjs-custom-name="grid_T44">
			<div class="item1_T44 " data-gjs-custom-name="item1_T44">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T44 " data-gjs-custom-name="item2_T44">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T44 " data-gjs-custom-name="item3_T44">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T44 " data-gjs-custom-name="item4_T44">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T44.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T44.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T44.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T44.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T44.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 3;
		}
		
		</style>`)
	});

	bm.add("template45", {
		label: "grid_T45",
		category: "Grids",
		attributes: { class: "fa template t45" },
		content: AddPageIDToString(`
		<div class="grid_T45 " data-gjs-custom-name="grid_T45">
			<div class="item1_T45 " data-gjs-custom-name="item1_T45">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T45 " data-gjs-custom-name="item2_T45">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T45 " data-gjs-custom-name="item3_T45">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T45 " data-gjs-custom-name="item4_T45">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T45.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T45.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 3;
		}
		.item2_T45.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T45.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T45.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template46", {
		label: "grid_T46",
		category: "Grids",
		attributes: { class: "fa template t46" },
		content: AddPageIDToString(`
		<div class="grid_T46 " data-gjs-custom-name="grid_T46">
			<div class="item1_T46 " data-gjs-custom-name="item1_T46">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T46 " data-gjs-custom-name="item2_T46">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T46 " data-gjs-custom-name="item3_T46">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T46 " data-gjs-custom-name="item4_T46">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T46.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T46.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T46.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T46.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 2;
		}
		.item4_T46.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template47", {
		label: "grid_T47",
		category: "Grids",
		attributes: { class: "fa template t47" },
		content: AddPageIDToString(`
		<div class="grid_T47 " data-gjs-custom-name="grid_T47">
			<div class="item1_T47 " data-gjs-custom-name="item1_T47">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T47 " data-gjs-custom-name="item2_T47">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T47 " data-gjs-custom-name="item3_T47">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T47 " data-gjs-custom-name="item4_T47">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T47.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T47.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 2;
		}
		.item2_T47.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T47.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T47.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template48", {
		label: "grid_T48",
		category: "Grids",
		attributes: { class: "fa template t48" },
		content: AddPageIDToString(`
		<div class="grid_T48 " data-gjs-custom-name="grid_T48">
			<div class="item1_T48 " data-gjs-custom-name="item1_T48">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T48 " data-gjs-custom-name="item2_T48">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T48 " data-gjs-custom-name="item3_T48">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T48 " data-gjs-custom-name="item4_T48">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T48 " data-gjs-custom-name="item5_T48">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T48 " data-gjs-custom-name="item6_T48">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
		</div>
		<style>
		.grid_T48.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr;
			grid-template-rows:1fr 3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T48.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 4;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T48.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T48.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T48.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item5_T48.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item6_T48.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 4;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template49", {
		label: "grid_T49",
		category: "Grids",
		attributes: { class: "fa template t49" },
		content: AddPageIDToString(`
		<div class="grid_T49 " data-gjs-custom-name="grid_T49">
			<div class="item1_T49 " data-gjs-custom-name="item1_T49">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T49 " data-gjs-custom-name="item2_T49">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T49 " data-gjs-custom-name="item3_T49">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T49 " data-gjs-custom-name="item4_T49">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T49 " data-gjs-custom-name="item5_T49">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T49.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 2fr 1fr;
			grid-template-rows:1fr 2fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T49.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T49.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T49.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T49.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item5_T49.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template50", {
		label: "grid_T50",
		category: "Grids",
		attributes: { class: "fa template t50" },
		content: AddPageIDToString(`
		<div class="grid_T50 " data-gjs-custom-name="grid_T50">
			<div class="item1_T50 " data-gjs-custom-name="item1_T50">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T50 " data-gjs-custom-name="item2_T50">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T50.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 3fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T50.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T50.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template51", {
		label: "grid_T51",
		category: "Grids",
		attributes: { class: "fa template t51" },
		content: AddPageIDToString(`
		<div class="grid_T51 " data-gjs-custom-name="grid_T51">
			<div class="item1_T51 " data-gjs-custom-name="item1_T51">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T51 " data-gjs-custom-name="item2_T51">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T51.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 3fr 1fr;
			grid-template-rows:1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T51.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 3;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T51.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template52", {
		label: "grid_T52",
		category: "Grids",
		attributes: { class: "fa template t52" },
		content: AddPageIDToString(`
		<div class="grid_T52 " data-gjs-custom-name="grid_T52">
			<div class="item1_T52 " data-gjs-custom-name="item1_T52">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T52 " data-gjs-custom-name="item2_T52">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T52 " data-gjs-custom-name="item3_T52">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T52.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 2fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T52.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T52.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T52.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template53", {
		label: "grid_T53",
		category: "Grids",
		attributes: { class: "fa template t53" },
		content: AddPageIDToString(`
		<div class="grid_T53 " data-gjs-custom-name="grid_T53">
			<div class="item1_T53 " data-gjs-custom-name="item1_T53">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T53 " data-gjs-custom-name="item2_T53">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T53 " data-gjs-custom-name="item3_T53">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T53.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T53.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T53.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T53.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template54", {
		label: "grid_T54",
		category: "Grids",
		attributes: { class: "fa template t54" },
		content: AddPageIDToString(`
		<div class="grid_T54 " data-gjs-custom-name="grid_T54">
			<div class="item1_T54 " data-gjs-custom-name="item1_T54">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T54 " data-gjs-custom-name="item2_T54">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T54 " data-gjs-custom-name="item3_T54">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T54 " data-gjs-custom-name="item4_T54">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T54.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr;
			grid-template-rows:1fr 3fr 1.5fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T54.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T54.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T54.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T54.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template55", {
		label: "grid_T55",
		category: "Grids",
		attributes: { class: "fa template t55" },
		content: AddPageIDToString(`
		<div class="grid_T55 " data-gjs-custom-name="grid_T55">
			<div class="item1_T55 " data-gjs-custom-name="item1_T55">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T55 " data-gjs-custom-name="item2_T55">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T55 " data-gjs-custom-name="item3_T55">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T55 " data-gjs-custom-name="item4_T55">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T55.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 2fr;
			grid-template-rows:1fr 3fr 1.5fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T55.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T55.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T55.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item4_T55.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template56", {
		label: "grid_T56",
		category: "Grids",
		attributes: { class: "fa template t56" },
		content: AddPageIDToString(`
		<div class="grid_T56 " data-gjs-custom-name="grid_T56">
			<div class="item1_T56 " data-gjs-custom-name="item1_T56">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T56 " data-gjs-custom-name="item2_T56">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T56 " data-gjs-custom-name="item3_T56">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T56.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 3fr 1.5fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T56.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T56.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T56.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template57", {
		label: "grid_T57",
		category: "Grids",
		attributes: { class: "fa template t57" },
		content: AddPageIDToString(`
		<div class="grid_T57 " data-gjs-custom-name="grid_T57">
			<div class="item1_T57 " data-gjs-custom-name="item1_T57">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T57 " data-gjs-custom-name="item2_T57">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T57 " data-gjs-custom-name="item3_T57">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T57 " data-gjs-custom-name="item4_T57">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T57.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T57.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T57.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T57.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T57.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template58", {
		label: "grid_T58",
		category: "Grids",
		attributes: { class: "fa template t58" },
		content: AddPageIDToString(`
		<div class="grid_T58 " data-gjs-custom-name="grid_T58">
			<div class="item1_T58 " data-gjs-custom-name="item1_T58">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T58 " data-gjs-custom-name="item2_T58">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T58 " data-gjs-custom-name="item3_T58">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T58 " data-gjs-custom-name="item4_T58">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T58.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T58.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T58.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T58.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T58.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template59", {
		label: "grid_T59",
		category: "Grids",
		attributes: { class: "fa template t59" },
		content: AddPageIDToString(`
		<div class="grid_T59 " data-gjs-custom-name="grid_T59">
			<div class="item1_T59 " data-gjs-custom-name="item1_T59">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T59 " data-gjs-custom-name="item2_T59">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T59 " data-gjs-custom-name="item3_T59">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T59 " data-gjs-custom-name="item4_T59">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T59.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:.5fr 2fr 2fr .5fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T59.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T59.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T59.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T59.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template60", {
		label: "grid_T60",
		category: "Grids",
		attributes: { class: "fa template t60" },
		content: AddPageIDToString(`
		<div class="grid_T60 " data-gjs-custom-name="grid_T60">
			<div class="item1_T60 " data-gjs-custom-name="item1_T60">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T60 " data-gjs-custom-name="item2_T60">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T60 " data-gjs-custom-name="item3_T60">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T60.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T60.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T60.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T60.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 2;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template61", {
		label: "grid_T61",
		category: "Grids",
		attributes: { class: "fa template t61" },
		content: AddPageIDToString(`
		<div class="grid_T61 " data-gjs-custom-name="grid_T61">
			<div class="item1_T61 " data-gjs-custom-name="item1_T61">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T61 " data-gjs-custom-name="item2_T61">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T61 " data-gjs-custom-name="item3_T61">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T61.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:2fr 1fr 2fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T61.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T61.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T61.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template62", {
		label: "grid_T62",
		category: "Grids",
		attributes: { class: "fa template t62" },
		content: AddPageIDToString(`
		<div class="grid_T62 " data-gjs-custom-name="grid_T62">
			<div class="item1_T62 " data-gjs-custom-name="item1_T62">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T62 " data-gjs-custom-name="item2_T62">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T62.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 3fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T62.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template63", {
		label: "grid_T63",
		category: "Grids",
		attributes: { class: "fa template t63" },
		content: AddPageIDToString(`
		<div class="grid_T63 " data-gjs-custom-name="grid_T63">
			<div class="item1_T63 " data-gjs-custom-name="item1_T63">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T63 " data-gjs-custom-name="item2_T63">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
		</div>
		<style>
		.grid_T63.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T63.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item2_T63.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template64", {
		label: "grid_T64",
		category: "Grids",
		attributes: { class: "fa template t64" },
		content: AddPageIDToString(`
		<div class="grid_T64 " data-gjs-custom-name="grid_T64">
			<div class="item1_T64 " data-gjs-custom-name="item1_T64">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
		</div>
		<style>
		.grid_T64.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:2fr 1fr 2fr;
			grid-column-gap:0vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T64.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template65", {
		label: "grid_T65",
		category: "Grids",
		attributes: { class: "fa template t65" },
		content: AddPageIDToString(`
		<div class="grid_T65 " data-gjs-custom-name="grid_T65">
			<div class="item1_T65 " data-gjs-custom-name="item1_T65">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T65 " data-gjs-custom-name="item2_T65">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T65 " data-gjs-custom-name="item3_T65">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T65.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr;
			grid-template-rows:3fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T65.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T65.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T65.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 2;
		}
		
		</style>`)
	});

	bm.add("template66", {
		label: "grid_T66",
		category: "Grids",
		attributes: { class: "fa template t66" },
		content: AddPageIDToString(`
		<div class="grid_T66 " data-gjs-custom-name="grid_T66">
			<div class="item1_T66 " data-gjs-custom-name="item1_T66">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T66 " data-gjs-custom-name="item2_T66">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T66 " data-gjs-custom-name="item3_T66">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T66 " data-gjs-custom-name="item4_T66">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
		</div>
		<style>
		.grid_T66.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 3fr 1fr 3fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T66.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T66.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T66.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T66.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template67", {
		label: "grid_T67",
		category: "Grids",
		attributes: { class: "fa template t67" },
		content: AddPageIDToString(`
		<div class="grid_T67 " data-gjs-custom-name="grid_T67">
			<div class="item1_T67 " data-gjs-custom-name="item1_T67">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T67 " data-gjs-custom-name="item2_T67">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T67 " data-gjs-custom-name="item3_T67">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T67 " data-gjs-custom-name="item4_T67">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T67 " data-gjs-custom-name="item5_T67">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T67 " data-gjs-custom-name="item6_T67">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
			<div class="item7_T67 " data-gjs-custom-name="item7_T67">
				<p class="" data-gjs-custom-name="text_7">text_7
				</p>
			</div>
			<div class="item8_T67 " data-gjs-custom-name="item8_T67">
				<p class="" data-gjs-custom-name="text_8">text_8
				</p>
			</div>
		</div>
		<style>
		.grid_T67.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 3fr 1fr 3fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T67.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T67.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T67.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T67.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T67.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item6_T67.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item7_T67.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item8_T67.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template68", {
		label: "grid_T68",
		category: "Grids",
		attributes: { class: "fa template t68" },
		content: AddPageIDToString(`
		<div class="grid_T68 " data-gjs-custom-name="grid_T68">
			<div class="item1_T68 " data-gjs-custom-name="item1_T68">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T68 " data-gjs-custom-name="item2_T68">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T68 " data-gjs-custom-name="item3_T68">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T68.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 6fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T68.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T68.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T68.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template69", {
		label: "grid_T69",
		category: "Grids",
		attributes: { class: "fa template t69" },
		content: AddPageIDToString(`
		<div class="grid_T69 " data-gjs-custom-name="grid_T69">
			<div class="item1_T69 " data-gjs-custom-name="item1_T69">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T69 " data-gjs-custom-name="item2_T69">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T69 " data-gjs-custom-name="item3_T69">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T69 " data-gjs-custom-name="item4_T69">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T69 " data-gjs-custom-name="item5_T69">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T69.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T69.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T69.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T69.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T69.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T69.$$pageID$$ {
			grid-column-start:5;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template70", {
		label: "grid_T70",
		category: "Grids",
		attributes: { class: "fa template t70" },
		content: AddPageIDToString(`
		<div class="grid_T70 " data-gjs-custom-name="grid_T70">
			<div class="item1_T70 " data-gjs-custom-name="item1_T70">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T70 " data-gjs-custom-name="item2_T70">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T70 " data-gjs-custom-name="item3_T70">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T70 " data-gjs-custom-name="item4_T70">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T70 " data-gjs-custom-name="item5_T70">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T70.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 0.5fr 1fr 0.5fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T70.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T70.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T70.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T70.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T70.$$pageID$$ {
			grid-column-start:5;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template71", {
		label: "grid_T71",
		category: "Grids",
		attributes: { class: "fa template t71" },
		content: AddPageIDToString(`
		<div class="grid_T71 " data-gjs-custom-name="grid_T71">
			<div class="item1_T71 " data-gjs-custom-name="item1_T71">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T71 " data-gjs-custom-name="item2_T71">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T71 " data-gjs-custom-name="item3_T71">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T71 " data-gjs-custom-name="item4_T71">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T71 " data-gjs-custom-name="item5_T71">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T71 " data-gjs-custom-name="item6_T71">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
			<div class="item7_T71 " data-gjs-custom-name="item7_T71">
				<p class="" data-gjs-custom-name="text_7">text_7
				</p>
			</div>
		</div>
		<style>
		.grid_T71.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T71.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T71.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T71.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T71.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T71.$$pageID$$ {
			grid-column-start:5;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item6_T71.$$pageID$$ {
			grid-column-start:6;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item7_T71.$$pageID$$ {
			grid-column-start:7;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template72", {
		label: "grid_T72",
		category: "Grids",
		attributes: { class: "fa template t72" },
		content: AddPageIDToString(`
		<div class="grid_T72 " data-gjs-custom-name="grid_T72">
			<div class="item1_T72 " data-gjs-custom-name="item1_T72">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T72 " data-gjs-custom-name="item2_T72">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T72 " data-gjs-custom-name="item3_T72">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T72 " data-gjs-custom-name="item4_T72">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T72 " data-gjs-custom-name="item5_T72">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T72 " data-gjs-custom-name="item6_T72">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
			<div class="item7_T72 " data-gjs-custom-name="item7_T72">
				<p class="" data-gjs-custom-name="text_7">text_7
				</p>
			</div>
		</div>
		<style>
		.grid_T72.$$pageID$$ {
			display:grid;
			grid-template-columns:2fr 1fr 4fr 1fr 2fr 1fr 2fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T72.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T72.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T72.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T72.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T72.$$pageID$$ {
			grid-column-start:5;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item6_T72.$$pageID$$ {
			grid-column-start:6;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item7_T72.$$pageID$$ {
			grid-column-start:7;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template73", {
		label: "grid_T73",
		category: "Grids",
		attributes: { class: "fa template t73" },
		content: AddPageIDToString(`
		<div class="grid_T73 " data-gjs-custom-name="grid_T73">
			<div class="item1_T73 " data-gjs-custom-name="item1_T73">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T73 " data-gjs-custom-name="item2_T73">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T73 " data-gjs-custom-name="item3_T73">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
		</div>
		<style>
		.grid_T73.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:3fr 1fr 3fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T73.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T73.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T73.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template74", {
		label: "grid_T74",
		category: "Grids",
		attributes: { class: "fa template t74" },
		content: AddPageIDToString(`
		<div class="grid_T74 " data-gjs-custom-name="grid_T74">
			<div class="item1_T74 " data-gjs-custom-name="item1_T74">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T74 " data-gjs-custom-name="item2_T74">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T74 " data-gjs-custom-name="item3_T74">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T74 " data-gjs-custom-name="item4_T74">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T74 " data-gjs-custom-name="item5_T74">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T74 " data-gjs-custom-name="item6_T74">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
		</div>
		<style>
		.grid_T74.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr;
			grid-template-rows:1fr 1fr;
			grid-column-gap:3vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T74.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T74.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T74.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T74.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item5_T74.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item6_T74.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template75", {
		label: "grid_T75",
		category: "Grids",
		attributes: { class: "fa template t75" },
		content: AddPageIDToString(`
		<div class="grid_T75 " data-gjs-custom-name="grid_T75">
			<div class="item1_T75 " data-gjs-custom-name="item1_T75">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T75 " data-gjs-custom-name="item2_T75">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T75 " data-gjs-custom-name="item3_T75">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T75 " data-gjs-custom-name="item4_T75">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T75 " data-gjs-custom-name="item5_T75">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T75 " data-gjs-custom-name="item6_T75">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
		</div>
		<style>
		.grid_T75.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows:1fr;
			grid-column-gap:3vh;
			grid-row-gap:0vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T75.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T75.$$pageID$$ {
			grid-column-start:2;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item3_T75.$$pageID$$ {
			grid-column-start:3;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item4_T75.$$pageID$$ {
			grid-column-start:4;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item5_T75.$$pageID$$ {
			grid-column-start:5;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item6_T75.$$pageID$$ {
			grid-column-start:6;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template76", {
		label: "grid_T76",
		category: "Grids",
		attributes: { class: "fa template t76" },
		content: AddPageIDToString(`
		<div class="grid_T76 " data-gjs-custom-name="grid_T76">
			<div class="item1_T76 " data-gjs-custom-name="item1_T76">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T76 " data-gjs-custom-name="item2_T76">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T76 " data-gjs-custom-name="item3_T76">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T76 " data-gjs-custom-name="item4_T76">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T76 " data-gjs-custom-name="item5_T76">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
		</div>
		<style>
		.grid_T76.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.item5_T76.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:5;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template77", {
		label: "grid_T77",
		category: "Grids",
		attributes: { class: "fa template t77" },
		content: AddPageIDToString(`
		<div class="grid_T77 " data-gjs-custom-name="grid_T77">
			<div class="item1_T77 " data-gjs-custom-name="item1_T77">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T77 " data-gjs-custom-name="item2_T77">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T77 " data-gjs-custom-name="item3_T77">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T77 " data-gjs-custom-name="item4_T77">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T77 " data-gjs-custom-name="item5_T77">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T77 " data-gjs-custom-name="item6_T77">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
		</div>
		<style>
		.grid_T77.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.item5_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:5;
			grid-row-end:span 1;
		}
		.item6_T77.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:6;
			grid-row-end:span 1;
		}
		
		</style>`)
	});

	bm.add("template78", {
		label: "grid_T78",
		category: "Grids",
		attributes: { class: "fa template t78" },
		content: AddPageIDToString(`
		<div class="grid_T78 " data-gjs-custom-name="grid_T78">
			<div class="item1_T78 " data-gjs-custom-name="item1_T78">
				<p class="" data-gjs-custom-name="text_1">text_1
				</p>
			</div>
			<div class="item2_T78 " data-gjs-custom-name="item2_T78">
				<p class="" data-gjs-custom-name="text_2">text_2
				</p>
			</div>
			<div class="item3_T78 " data-gjs-custom-name="item3_T78">
				<p class="" data-gjs-custom-name="text_3">text_3
				</p>
			</div>
			<div class="item4_T78 " data-gjs-custom-name="item4_T78">
				<p class="" data-gjs-custom-name="text_4">text_4
				</p>
			</div>
			<div class="item5_T78 " data-gjs-custom-name="item5_T78">
				<p class="" data-gjs-custom-name="text_5">text_5
				</p>
			</div>
			<div class="item6_T78 " data-gjs-custom-name="item6_T78">
				<p class="" data-gjs-custom-name="text_6">text_6
				</p>
			</div>
			<div class="item7_T78 " data-gjs-custom-name="item7_T78">
				<p class="" data-gjs-custom-name="text_7">text_7
				</p>
			</div>
		</div>
		<style>
		.grid_T78.$$pageID$$ {
			display:grid;
			grid-template-columns:1fr;
			grid-template-rows:1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-column-gap:0vh;
			grid-row-gap:3vh;
			width:100%;
			height:100%;
			padding:6vh;
		}
		.item1_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:1;
			grid-row-end:span 1;
		}
		.item2_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:2;
			grid-row-end:span 1;
		}
		.item3_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:3;
			grid-row-end:span 1;
		}
		.item4_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:4;
			grid-row-end:span 1;
		}
		.item5_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:5;
			grid-row-end:span 1;
		}
		.item6_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:6;
			grid-row-end:span 1;
		}
		.item7_T78.$$pageID$$ {
			grid-column-start:1;
			grid-column-end:span 1;
			grid-row-start:7;
			grid-row-end:span 1;
		}
		
		</style>`)
	});
};
