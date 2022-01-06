import grapesjs from "grapesjs";

import { AddPageIDToString } from "../blocks";

export default (bm: grapesjs.BlockManagerInstance, config) => {
	bm.add("table-10x4", {
		label: "<img src='./img/blocks/blockIcon_gridTable.jpg'></img><br>Table Grid 10x4",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
			<div class="grid_Table " data-gjs-custom-name="grid_Table">
				<div class="item1a_Table padding_Cell flex_Cell border-top-left-radius_GridTable  tableHeader_grey" data-gjs-custom-name="item1a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1a</p>
				</div>
				<div class="item1b_Table padding_Cell flex_Cell tableData_grey " data-gjs-custom-name="item1b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
				</div>
				<div class="item1c_Table padding_Cell flex_Cell tableData_grey " data-gjs-custom-name="item1c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
				</div>
				<div class="item1d_Table padding_Cell flex_Cell tableData_grey border-bottom-left-radius_GridTable " data-gjs-custom-name="item1d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1d</p>
				</div>
				<div class="item2a_Table padding_Cell flex_Cell  tableHeader_red" data-gjs-custom-name="item2a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
				</div>
				<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
				</div>
				<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
				</div>
				<div class="item2d_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2d</p>
				</div>
				<div class="item3a_Table padding_Cell flex_Cell  tableHeader_orange" data-gjs-custom-name="item3a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
				</div>
				<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
				</div>
				<div class="item3c_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3c_Table">
					<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_orange item3d_Table " data-gjs-custom-name="item3d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 3d</p>
				</div>
				<div class="padding_Cell flex_Cell item4a_Table  tableHeader_yellow" data-gjs-custom-name="item4a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 4a</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_yellow item4b_Table " data-gjs-custom-name="item4b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 4b</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_yellow item4c_Table " data-gjs-custom-name="item4c_Table">
					<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 4c</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_yellow item4d_Table " data-gjs-custom-name="item4d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 4d</p>
				</div>
				<div class="padding_Cell flex_Cell item5a_Table  tableHeader_green" data-gjs-custom-name="item5a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 5a</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_green item5b_Table " data-gjs-custom-name="item5b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 5b</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_green item5c_Table " data-gjs-custom-name="item5c_Table">
					<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 5c</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_green item5d_Table " data-gjs-custom-name="item5d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 5d</p>
				</div>
				<div class="padding_Cell flex_Cell item6a_Table  tableHeader_teal" data-gjs-custom-name="item6a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 6a</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_teal item6b_Table " data-gjs-custom-name="item6b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 6b</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_teal item6c_Table " data-gjs-custom-name="item6c_Table">
					<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 6c</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_teal item6d_Table " data-gjs-custom-name="item6d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 6d</p>
				</div>
				<div class="padding_Cell flex_Cell item7a_Table  tableHeader_blue" data-gjs-custom-name="item7a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 7a</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_blue item7b_Table " data-gjs-custom-name="item7b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 7b</p>
				</div>
				<div class="flex_Cell tableData_blue item7c_Table padding_Cell " data-gjs-custom-name="item7c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 7c</p>
				</div>
				<div class="flex_Cell tableData_blue item7d_Table padding_Cell " data-gjs-custom-name="item7d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 7d</p>
				</div>
				<div class="padding_Cell item8a_Table flex_Cell  tableHeader_indigo" data-gjs-custom-name="item8a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 8a</p>
				</div>
				<div class="padding_Cell item8b_Table flex_Cell tableData_indigo " data-gjs-custom-name="item8b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 8b</p>
				</div>
				<div class="item8c_Table flex_Cell tableData_indigo padding_Cell " data-gjs-custom-name="item8c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 8c</p>
				</div>
				<div class="flex_Cell tableData_indigo item8d_Table padding_Cell " data-gjs-custom-name="item8d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 8d</p>
				</div>
				<div class="padding_Cell flex_Cell item9a_Table  tableHeader_purple" data-gjs-custom-name="item9a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 9a</p>
				</div>
				<div class="padding_Cell flex_Cell tableData_purple item9b_Table " data-gjs-custom-name="item9b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 9b</p>
				</div>
				<div class="flex_Cell tableData_purple item9c_Table padding_Cell " data-gjs-custom-name="item9c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 9c</p>
				</div>
				<div class="flex_Cell tableData_purple item9d_Table padding_Cell " data-gjs-custom-name="item9d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 9d</p>
				</div>
				<div class="padding_Cell flex_Cell item10a_Table border-top-right-radius_GridTable  tableHeader_pink" data-gjs-custom-name="item10a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 10a</p>
				</div>
				<div class="padding_Cell flex_Cell item10b_Table  tableData_pink" data-gjs-custom-name="item10b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 10b</p>
				</div>
				<div class="flex_Cell item10c_Table padding_Cell  tableData_pink" data-gjs-custom-name="item10c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 10c</p>
				</div>
				<div class="flex_Cell item10d_Table padding_Cell border-bottom-right-radius_GridTable  tableData_pink" data-gjs-custom-name="item10d_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 10d</p>
				</div>
			</div>
			<style>
			.grid_Table.$$pageID$$ {
				display: grid;
				width: 100%;
				grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
				grid-template-rows: 1fr 1fr 1fr 1fr;
				grid-row-gap: 0;
				grid-column-gap: 0;
			}

			.item1a_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item1b_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item1c_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item1d_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item2a_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item2b_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item2c_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item2d_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item3a_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item3b_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item3c_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item3d_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item4a_Table.$$pageID$$ {
				grid-column-start: 4;
				grid-column-end: 5;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item4b_Table.$$pageID$$ {
				grid-column-start: 4;
				grid-column-end: 5;
				grid-row-start: 2;
				grid-row-end: 3;
				justify-self: stretch;
				align-self: stretch;
			}

			.item4c_Table.$$pageID$$ {
				grid-column-start: 4;
				grid-column-end: 5;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item4d_Table.$$pageID$$ {
				grid-column-start: 4;
				grid-column-end: 5;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item5a_Table.$$pageID$$ {
				grid-column-start: 5;
				grid-column-end: 6;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item5b_Table.$$pageID$$ {
				grid-column-start: 5;
				grid-column-end: 6;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item5c_Table.$$pageID$$ {
				grid-column-start: 5;
				grid-column-end: 6;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item5d_Table.$$pageID$$ {
				grid-column-start: 5;
				grid-column-end: 6;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item6a_Table.$$pageID$$ {
				grid-column-start: 6;
				grid-column-end: 7;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item6b_Table.$$pageID$$ {
				grid-row-start: 2;
				grid-row-end: 3;
				grid-column-start: 6;
				grid-column-end: 7;
			}

			.item6c_Table.$$pageID$$ {
				grid-column-start: 6;
				grid-column-end: 7;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item6d_Table.$$pageID$$ {
				grid-row-start: 4;
				grid-row-end: 5;
				grid-column-start: 6;
				grid-column-end: 7;
			}

			.item7a_Table.$$pageID$$ {
				grid-column-start: 7;
				grid-column-end: 8;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item7b_Table.$$pageID$$ {
				grid-column-start: 7;
				grid-column-end: 8;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item7c_Table.$$pageID$$ {
				grid-column-start: 7;
				grid-column-end: 8;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item7d_Table.$$pageID$$ {
				grid-column-start: 7;
				grid-column-end: 8;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item8a_Table.$$pageID$$ {
				grid-column-start: 8;
				grid-column-end: 9;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item8b_Table.$$pageID$$ {
				grid-column-start: 8;
				grid-column-end: 9;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item8c_Table.$$pageID$$ {
				grid-column-start: 8;
				grid-column-end: 9;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item8d_Table.$$pageID$$ {
				grid-column-start: 8;
				grid-column-end: 9;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item9a_Table.$$pageID$$ {
				grid-column-start: 9;
				grid-column-end: 10;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item9b_Table.$$pageID$$ {
				grid-column-start: 9;
				grid-column-end: 10;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item9c_Table.$$pageID$$ {
				grid-column-start: 9;
				grid-column-end: 9;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item9d_Table.$$pageID$$ {
				grid-column-start: 9;
				grid-column-end: 10;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.item10a_Table.$$pageID$$ {
				grid-column-start: 10;
				grid-column-end: 11;
				grid-row-start: 1;
				grid-row-end: 2;
			}

			.item10b_Table.$$pageID$$ {
				grid-column-start: 10;
				grid-column-end: 11;
				grid-row-start: 2;
				grid-row-end: 3;
			}

			.item10c_Table.$$pageID$$ {
				grid-column-start: 10;
				grid-column-end: 11;
				grid-row-start: 3;
				grid-row-end: 4;
			}

			.item10d_Table.$$pageID$$ {
				grid-column-start: 10;
				grid-column-end: 11;
				grid-row-start: 4;
				grid-row-end: 5;
			}

			.flex_Cell.$$pageID$$ {
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.padding_Cell.$$pageID$$ {
				padding-top: 0.7vh;
				padding-right: 0.7vh;
				padding-bottom: 0.7vh;
				padding-left: 0.7vh;
				border: .3vh solid white;
			}
			</style>
		`)
	});

	bm.add("table-2x2", {
		label: "<img src='./img/blocks/blockIcon_table2x2.jpg'></img><br>Table Grid 2x2",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
			<div class="grid_Table " data-gjs-custom-name="grid_Table">
				<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable border-bottom-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
				</div>
				<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable border-top-right-radius_GridTable" data-gjs-custom-name="item2a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
				</div>
				<div class="item2b_Table padding_Cell flex_Cell tableData_red  border-bottom-right-radius_GridTable" data-gjs-custom-name="item2b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
				</div>
			</div>
			<style>
			.grid_Table.$$pageID$$ {
				display: grid;
				width: 100%;
				grid-template-columns: 1fr 1fr;
				grid-template-rows: 1fr 1fr;
				grid-row-gap: 0;
				grid-column-gap: 0;
			}
			
			.item1a_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item1b_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item2a_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2b_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.flex_Cell.$$pageID$$ {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.padding_Cell.$$pageID$$ {
				padding-top: 0.7vh;
				padding-right: 0.7vh;
				padding-bottom: 0.7vh;
				padding-left: 0.7vh;
				border: .3vh solid white;
			}
			</style>
		`)
	});

	bm.add("table-3x3", {
		label: "<img src='./img/blocks/blockIcon_table3x3.jpg'></img><br>Table Grid 3x3",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
			<div class="grid_Table " data-gjs-custom-name="grid_Table">
				<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
				</div>
				<div class="item1c_Table padding_Cell flex_Cell tableData_grey  border-bottom-left-radius_GridTable" data-gjs-custom-name="item1c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
				</div>
				<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable" data-gjs-custom-name="item2a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
				</div>
				<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
				</div>
				<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
				</div>
				<div class="item3a_Table padding_Cell flex_Cell tableHeader_orange  border-top-right-radius_GridTable" data-gjs-custom-name="item3a_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
				</div>
				<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
					<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
				</div>
				<div class="item3c_Table padding_Cell flex_Cell tableData_orange  border-bottom-right-radius_GridTable" data-gjs-custom-name="item3c_Table">
					<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
				</div>
			</div>
			<style>
			.grid_Table.$$pageID$$ {
				display: grid;
				width: 100%;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: 1fr 1fr 1fr;
				grid-row-gap: 0;
				grid-column-gap: 0;
			}
			
			.item1a_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item1b_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item1c_Table.$$pageID$$ {
				grid-column-start: 1;
				grid-column-end: 2;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item2a_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item2b_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item2c_Table.$$pageID$$ {
				grid-column-start: 2;
				grid-column-end: 3;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.item3a_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 1;
				grid-row-end: 2;
			}
			
			.item3b_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 2;
				grid-row-end: 3;
			}
			
			.item3c_Table.$$pageID$$ {
				grid-column-start: 3;
				grid-column-end: 4;
				grid-row-start: 3;
				grid-row-end: 4;
			}
			
			.flex_Cell.$$pageID$$ {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			
			.padding_Cell.$$pageID$$ {
				padding-top: 0.7vh;
				padding-right: 0.7vh;
				padding-bottom: 0.7vh;
				padding-left: 0.7vh;
				border: .3vh solid white;
			}
			</style>
		`)
	});

	bm.add("table-3x3-loHi", {
		label: "<img src='./img/blocks/blockIcon_table3x3LoSameHi.jpg'></img><br>3 x 3 lo,same,hi",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
		<div class="grid_Table3x3 " data-gjs-custom-name="grid_Table 3x3 lo,same,hi">
		<div class="grid_Table  item1_Table3x3" data-gjs-custom-name="grid_Table">
			<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
			</div>
			<div class="item1c_Table padding_Cell flex_Cell tableData_grey  border-bottom-left-radius_GridTable" data-gjs-custom-name="item1c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
			</div>
			<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable" data-gjs-custom-name="item2a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
			</div>
			<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
			</div>
			<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
			</div>
			<div class="item3a_Table padding_Cell flex_Cell tableHeader_orange " data-gjs-custom-name="item3a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
			</div>
			<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
			</div>
			<div class="item3c_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3c_Table">
				<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
			</div>
			<div class="padding_Cell flex_Cell item4a_Table  tableHeader_grey" data-gjs-custom-name="item4a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Low</p>
			</div>
			<div class="padding_Cell flex_Cell item4b_Table  colorBkgndWhite" data-gjs-custom-name="item4b_Table">
				<widget-radio :visible="true" :enabled="true" id="idjn" group="i6ppg" value="Low" class="buttonRadio Down " data-gjs-custom-name="4b radio down"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item4c_Table  colorBkgndWhite" data-gjs-custom-name="item4c_Table">
				<widget-radio :visible="true" :enabled="true" id="ick2" group="i2nz4" value="Low" class="buttonRadio Down " data-gjs-custom-name="4c radio down"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5a_Table  tableHeader_grey" data-gjs-custom-name="item5a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Same</p>
			</div>
			<div class="padding_Cell flex_Cell item5b_Table  colorBkgndWhite" data-gjs-custom-name="item5b_Table">
				<widget-radio :visible="true" :enabled="true" id="ikmf" group="i6ppg" value="Same" class="buttonRadio NoChange " data-gjs-custom-name="5b radio no change"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5c_Table  colorBkgndWhite" data-gjs-custom-name="item5c_Table">
				<widget-radio :visible="true" :enabled="true" id="ivm7" group="i2nz4" value="Same" class="buttonRadio NoChange " data-gjs-custom-name="5c radio no change"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item6a_Table  border-top-right-radius_GridTable tableHeader_grey" data-gjs-custom-name="item6a_Table">
				<p class="textCenter " data-gjs-custom-name="text">High</p>
			</div>
			<div class="padding_Cell flex_Cell item6b_Table  colorBkgndWhite" data-gjs-custom-name="item6b_Table">
				<widget-radio :visible="true" :enabled="true" id="i02k" group="i6ppg" value="High" class="buttonRadio Up " data-gjs-custom-name="6b radio up"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item6c_Table  border-bottom-right-radius_GridTable colorBkgndWhite" data-gjs-custom-name="item6c_Table">
				<widget-radio :visible="true" :enabled="true" id="iyho" group="i2nz4" value="High" class="buttonRadio Up " data-gjs-custom-name="6c radio up"> </widget-radio>
			</div>
		</div>
		<div class="item2_Table3x3 " data-gjs-custom-name="item2_Table_Submit">
			<widget-button :visible="false" :enabled="true" id="ieej" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i6ppg',selected:'any'}},{comparisonData:{comparisonType:'radioSelection',group:'i2nz4',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue marginLeft2" data-gjs-custom-name="button_Submit">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit </p>
			</widget-button>
			<container-show-hide :visible="false" id="iwag" class="" data-gjs-custom-name="SH_Correct">
				<p class="textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here </p>
			</container-show-hide>
			<container-show-hide :visible="false" id="i3jh" class="" data-gjs-custom-name="SH_Incorrect">
				<p class="textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here </p>
			</container-show-hide>
		</div>
	</div>
	<style>
	.grid_Table3x3.$$pageID$$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		grid-row-gap: 3vh;
	}
	
	.item1_Table3x3.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2_Table3x3.$$pageID$$ {
		display: flex;
		flex-direction: row-reverse;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.grid_Table.$$pageID$$ {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-row-gap: 0;
		grid-column-gap: 0;
	}
	
	.item1a_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item1b_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item1c_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item2a_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2b_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item2c_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item3a_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item3b_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item3c_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item4a_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item4b_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: stretch;
		align-self: stretch;
	}
	
	.item4c_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item5a_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item5b_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item5c_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item6a_Table.$$pageID$$ {
		grid-column-start: 6;
		grid-column-end: 7;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item6b_Table.$$pageID$$ {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 6;
		grid-column-end: 7;
	}
	
	.item6c_Table.$$pageID$$ {
		grid-column-start: 6;
		grid-column-end: 7;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.flex_Cell.$$pageID$$ {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.padding_Cell.$$pageID$$ {
		padding-top: 0.7vh;
		padding-right: 0.7vh;
		padding-bottom: 0.7vh;
		padding-left: 0.7vh;
		border: .3vh solid white;
	}
	</style>
		`)
	});

	bm.add("table-3x3-hiLo", {
		label: "<img src='./img/blocks/blockIcon_table3x3HiSameLo.jpg'></img><br>3 x 3 hi,same,lo",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
		<div class="grid_Table3x3 " data-gjs-custom-name="grid_Table 3x3 hi,same,lo">
		<div class="grid_Table " data-gjs-custom-name="grid_Table">
			<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
			</div>
			<div class="item1c_Table padding_Cell flex_Cell tableData_grey  border-bottom-left-radius_GridTable" data-gjs-custom-name="item1c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
			</div>
			<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable" data-gjs-custom-name="item2a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
			</div>
			<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
			</div>
			<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
			</div>
			<div class="item3a_Table padding_Cell flex_Cell tableHeader_orange " data-gjs-custom-name="item3a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
			</div>
			<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
			</div>
			<div class="item3c_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3c_Table">
				<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
			</div>
			<div class="padding_Cell flex_Cell item4a_Table  tableHeader_grey" data-gjs-custom-name="item4a_Table">
				<p class="textCenter " data-gjs-custom-name="text">High</p>
			</div>
			<div class="padding_Cell flex_Cell item4b_Table  colorBkgndWhite" data-gjs-custom-name="item4b_Table">
				<widget-radio :visible="true" :enabled="true" id="i02k" group="i6ppg" value="High" class="buttonRadio Up " data-gjs-custom-name="4b radio up"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item4c_Table  colorBkgndWhite" data-gjs-custom-name="item4c_Table">
				<widget-radio :visible="true" :enabled="true" id="iyho" group="i2nz4" value="High" class="buttonRadio Up " data-gjs-custom-name="4c radio up"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5a_Table  tableHeader_grey" data-gjs-custom-name="item5a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Same</p>
			</div>
			<div class="padding_Cell flex_Cell item5b_Table  colorBkgndWhite" data-gjs-custom-name="item5b_Table">
				<widget-radio :visible="true" :enabled="true" id="ikmf" group="i6ppg" value="Same" class="buttonRadio NoChange " data-gjs-custom-name="5b radio no change"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5c_Table  colorBkgndWhite" data-gjs-custom-name="item5c_Table">
				<widget-radio :visible="true" :enabled="true" id="ivm7" group="i2nz4" value="Same" class="buttonRadio NoChange " data-gjs-custom-name="5c radio no change"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item6a_Table  border-top-right-radius_GridTable tableHeader_grey" data-gjs-custom-name="item6a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Low</p>
			</div>
			<div class="padding_Cell flex_Cell item6b_Table  colorBkgndWhite" data-gjs-custom-name="item6b_Table">
				<widget-radio :visible="true" :enabled="true" id="idjn" group="i6ppg" value="Low" class="buttonRadio Down " data-gjs-custom-name="6b radio down"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item6c_Table  border-bottom-right-radius_GridTable colorBkgndWhite" data-gjs-custom-name="item6c_Table">
				<widget-radio :visible="true" :enabled="true" id="ick2" group="i2nz4" value="Low" class="buttonRadio Down " data-gjs-custom-name="6c radio down"> </widget-radio>
			</div>
		</div>
		<div class="item2_Table3x3 " data-gjs-custom-name="item2_Table_Submit">
			<widget-button :visible="false" :enabled="true" id="ieej" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i6ppg',selected:'any'}},{comparisonData:{comparisonType:'radioSelection',group:'i2nz4',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue marginLeft2" data-gjs-custom-name="button_Submit">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit </p>
			</widget-button>
			<container-show-hide :visible="false" id="iwag" class="" data-gjs-custom-name="SH_Correct">
				<p class="textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here </p>
			</container-show-hide>
			<container-show-hide :visible="false" id="i3jh" class="" data-gjs-custom-name="SH_Incorrect">
				<p class="textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here </p>
			</container-show-hide>
		</div>
	</div>
	<style>
	.grid_Table3x3.$$pageID$$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		grid-row-gap: 3vh;
	}
	
	.item1_Table3x3.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2_Table3x3.$$pageID$$ {
		display: flex;
		flex-direction: row-reverse;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.grid_Table.$$pageID$$ {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-row-gap: 0;
		grid-column-gap: 0;
	}
	
	.item1a_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item1b_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item1c_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item2a_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2b_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item2c_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item3a_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item3b_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item3c_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item4a_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item4b_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: stretch;
		align-self: stretch;
	}
	
	.item4c_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item5a_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item5b_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item5c_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item6a_Table.$$pageID$$ {
		grid-column-start: 6;
		grid-column-end: 7;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item6b_Table.$$pageID$$ {
		grid-row-start: 2;
		grid-row-end: 3;
		grid-column-start: 6;
		grid-column-end: 7;
	}
	
	.item6c_Table.$$pageID$$ {
		grid-column-start: 6;
		grid-column-end: 7;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.flex_Cell.$$pageID$$ {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.padding_Cell.$$pageID$$ {
		padding-top: 0.7vh;
		padding-right: 0.7vh;
		padding-bottom: 0.7vh;
		padding-left: 0.7vh;
		border: .3vh solid white;
	}
	</style>
		`)
	});

	bm.add("table-3x3-loHiOnly", {
		label: "<img src='./img/blocks/blockIcon_table3x3LoHi.jpg'></img><br>3 x 3 lo,hi",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
		<div class="grid_Table3x3 " data-gjs-custom-name="grid_Table 3x3 lo,hi">
		<div class="grid_Table  item1_Table3x3" data-gjs-custom-name="grid_Table">
			<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
			</div>
			<div class="item1c_Table padding_Cell flex_Cell tableData_grey  border-bottom-left-radius_GridTable" data-gjs-custom-name="item1c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
			</div>
			<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable" data-gjs-custom-name="item2a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
			</div>
			<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
			</div>
			<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
			</div>
			<div class="item3a_Table padding_Cell flex_Cell tableHeader_orange " data-gjs-custom-name="item3a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
			</div>
			<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
			</div>
			<div class="item3c_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3c_Table">
				<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
			</div>
			<div class="padding_Cell flex_Cell item4a_Table  tableHeader_grey" data-gjs-custom-name="item4a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Low</p>
			</div>
			<div class="padding_Cell flex_Cell item4b_Table  colorBkgndWhite" data-gjs-custom-name="item4b_Table">
				<widget-radio :visible="true" :enabled="true" id="idjn" group="i6ppg" value="Low" class="buttonRadio Down " data-gjs-custom-name="4b radio down"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item4c_Table  colorBkgndWhite" data-gjs-custom-name="item4c_Table">
				<widget-radio :visible="true" :enabled="true" id="ick2" group="i2nz4" value="Low" class="buttonRadio Down " data-gjs-custom-name="4c radio down"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5a_Table  tableHeader_grey border-top-right-radius_GridTable" data-gjs-custom-name="item5a_Table">
				<p class="textCenter " data-gjs-custom-name="text">High</p>
			</div>
			<div class="padding_Cell flex_Cell item5b_Table  colorBkgndWhite" data-gjs-custom-name="item5b_Table">
				<widget-radio :visible="true" :enabled="true" id="i02k" group="i6ppg" value="High" class="buttonRadio Up " data-gjs-custom-name="5b radio up"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5c_Table  border-bottom-right-radius_GridTable colorBkgndWhite" data-gjs-custom-name="item5c_Table">
				<widget-radio :visible="true" :enabled="true" id="iyho" group="i2nz4" value="High" class="buttonRadio Up " data-gjs-custom-name="5c radio up"> </widget-radio>
			</div>
		</div>
		<div class="item2_Table3x3 " data-gjs-custom-name="item2_Table_Submit">
			<widget-button :visible="false" :enabled="true" id="ieej" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'i6ppg',selected:'any'}},{comparisonData:{comparisonType:'radioSelection',group:'i2nz4',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ieej',key:'visible',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey  buttonBlinkBlue marginLeft2" data-gjs-custom-name="button_Submit">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit </p>
			</widget-button>
			<container-show-hide :visible="false" id="iwag" class="" data-gjs-custom-name="SH_Correct">
				<p class="textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here </p>
			</container-show-hide>
			<container-show-hide :visible="false" id="i3jh" class="" data-gjs-custom-name="SH_Incorrect">
				<p class="textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here </p>
			</container-show-hide>
		</div>
	</div>
	<style>
	.grid_Table3x3.$$pageID$$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		grid-row-gap: 3vh;
	}
	
	.item1_Table3x3.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2_Table3x3.$$pageID$$ {
		display: flex;
		flex-direction: row-reverse;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.grid_Table.$$pageID$$ {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-row-gap: 0;
		grid-column-gap: 0;
	}
	
	.item1a_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item1b_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item1c_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item2a_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2b_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item2c_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item3a_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item3b_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item3c_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item4a_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item4b_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: stretch;
		align-self: stretch;
	}
	
	.item4c_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item5a_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item5b_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item5c_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.flex_Cell.$$pageID$$ {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.padding_Cell.$$pageID$$ {
		padding-top: 0.7vh;
		padding-right: 0.7vh;
		padding-bottom: 0.7vh;
		padding-left: 0.7vh;
		border: .3vh solid white;
	}
	</style>
		`)
	});

	bm.add("table-3x3-chNoch", {
		label: "<img src='./img/blocks/blockIcon_3x3chNoch.jpg'></img><br>3 x 3 ch No ch",
		category: "Table",
		attributes: { class: "imgIcon block-wide" },
		content: AddPageIDToString(`
		<div class="grid_Table3x3 " data-gjs-custom-name="grid_Table 3x3 lo,same,hi">
		<div class="grid_Table  item1_Table3x3" data-gjs-custom-name="grid_Table">
			<div class="item1b_Table padding_Cell flex_Cell tableData_grey  border-top-left-radius_GridTable" data-gjs-custom-name="item1b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1b</p>
			</div>
			<div class="item1c_Table padding_Cell flex_Cell tableData_grey  border-bottom-left-radius_GridTable" data-gjs-custom-name="item1c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 1c</p>
			</div>
			<div class="item2a_Table padding_Cell flex_Cell tableHeader_red  border-top-left-radius_GridTable" data-gjs-custom-name="item2a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2a</p>
			</div>
			<div class="item2b_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2b</p>
			</div>
			<div class="item2c_Table padding_Cell flex_Cell tableData_red " data-gjs-custom-name="item2c_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 2c</p>
			</div>
			<div class="item3a_Table padding_Cell flex_Cell tableHeader_orange " data-gjs-custom-name="item3a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3a</p>
			</div>
			<div class="item3b_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3b_Table">
				<p class="textCenter " data-gjs-custom-name="text">Cell 3b</p>
			</div>
			<div class="item3c_Table padding_Cell flex_Cell tableData_orange " data-gjs-custom-name="item3c_Table">
				<p class="textCenter item1_Cell " data-gjs-custom-name="text">Cell 3c</p>
			</div>
			<div class="padding_Cell flex_Cell item4a_Table  tableHeader_grey" data-gjs-custom-name="item4a_Table">
				<p class="textCenter " data-gjs-custom-name="text">Change</p>
			</div>
			<div class="padding_Cell flex_Cell item4b_Table  colorBkgndWhite" data-gjs-custom-name="item4b_Table">
				<widget-radio :visible="true" :enabled="true" id="irit" group="izqr" value="Change" class="buttonRadio " data-gjs-custom-name="4b radio"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item4c_Table  colorBkgndWhite" data-gjs-custom-name="item4c_Table">
				<widget-radio :visible="true" :enabled="true" id="i685" group="ijp3" value="Change" class="buttonRadio " data-gjs-custom-name="4c radio"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5a_Table  tableHeader_grey border-top-right-radius_GridTable" data-gjs-custom-name="item5a_Table">
				<p class="textCenter " data-gjs-custom-name="text">No Change</p>
			</div>
			<div class="padding_Cell flex_Cell item5b_Table  colorBkgndWhite" data-gjs-custom-name="item5b_Table">
				<widget-radio :visible="true" :enabled="true" id="i4l2" group="izqr" value="No Change" class="buttonRadio " data-gjs-custom-name="5b radio"> </widget-radio>
			</div>
			<div class="padding_Cell flex_Cell item5c_Table  border-bottom-right-radius_GridTable colorBkgndWhite" data-gjs-custom-name="item5c_Table">
				<widget-radio :visible="true" :enabled="true" id="ibxw" group="ijp3" value="No Change" class="buttonRadio " data-gjs-custom-name="5c radio"> </widget-radio>
			</div>
		</div>
		<div class="item2_Table3x3 " data-gjs-custom-name="item2_Table_Submit">
			<widget-button :visible="false" :enabled="true" id="ipla" :conditions="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[{comparisonData:{comparisonType:'radioSelection',group:'izqr',selected:'any'}},{comparisonData:{comparisonType:'radioSelection',group:'ijp3',selected:'any'}}],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ipla',key:'visible',val:true},fireOnceID:'',delay:0}],effectsFail:[{effectData:{effectType:'updateWidget',widgetID:'ipla',key:'visible',val:false},fireOnceID:'',delay:0}],responsesPass:[],responsesFail:[]}]}" :click-effects="{conditionList:[{evaluateWhen:'widgetsChange',comparisons:[],comparisonsLogic:'and',effectsPass:[{effectData:{effectType:'updateWidget',widgetID:'ipla',key:'visible',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'irit',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i4l2',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'i685',key:'enabled',val:false},fireOnceID:'',delay:0},{effectData:{effectType:'updateWidget',widgetID:'ibxw',key:'enabled',val:false},fireOnceID:'',delay:0}],effectsFail:[],responsesPass:[],responsesFail:[]}]}" class="buttonBasic-Grey " data-gjs-custom-name="button_Submit">
				<p class="marginLeft2 marginRight2 " data-gjs-custom-name="text_Submit">Submit </p>
			</widget-button>
			<container-show-hide :visible="false" id="irue" class="" data-gjs-custom-name="SH_Correct">
				<p class="textBackgroundBasic textBackground-Correct " data-gjs-custom-name="text_Correct"><strong class="" data-gjs-custom-name="text_Bold">Correct!</strong> Explanation here </p>
			</container-show-hide>
			<container-show-hide :visible="false" id="i9yc" class="" data-gjs-custom-name="SH_Incorrect">
				<p class="textBackgroundBasic textBackground-Incorrect " data-gjs-custom-name="text_Incorrect"><strong class="" data-gjs-custom-name="text_Bold">Incorrect.</strong> Explanation here </p>
			</container-show-hide>
		</div>
	</div>
	<style>
	.grid_Table3x3.$$pageID$$ {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: min-content 1fr;
		grid-row-gap: 3vh;
	}
	
	.item1_Table3x3.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2_Table3x3.$$pageID$$ {
		display: flex;
		flex-direction: row-reverse;
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.grid_Table.$$pageID$$ {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-row-gap: 0;
		grid-column-gap: 0;
	}
	
	.item1a_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item1b_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item1c_Table.$$pageID$$ {
		grid-column-start: 1;
		grid-column-end: 2;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item2a_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item2b_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item2c_Table.$$pageID$$ {
		grid-column-start: 2;
		grid-column-end: 3;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item3a_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item3b_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item3c_Table.$$pageID$$ {
		grid-column-start: 3;
		grid-column-end: 4;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item4a_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item4b_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 2;
		grid-row-end: 3;
		justify-self: stretch;
		align-self: stretch;
	}
	
	.item4c_Table.$$pageID$$ {
		grid-column-start: 4;
		grid-column-end: 5;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.item5a_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 1;
		grid-row-end: 2;
	}
	
	.item5b_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 2;
		grid-row-end: 3;
	}
	
	.item5c_Table.$$pageID$$ {
		grid-column-start: 5;
		grid-column-end: 6;
		grid-row-start: 3;
		grid-row-end: 4;
	}
	
	.flex_Cell.$$pageID$$ {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.padding_Cell.$$pageID$$ {
		padding-top: 0.7vh;
		padding-right: 0.7vh;
		padding-bottom: 0.7vh;
		padding-left: 0.7vh;
		border: .3vh solid white;
	}
	</style>
		`)
	});
};
