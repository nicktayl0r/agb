import { orderCssClasses } from "../../commands/edit_source/view/EditSource";

test('orderCssClasses puts page css at the end', () => {
	//end "{" is expected
	expect(orderCssClasses(".pageTest.test1.test2")).toBe(".test1.test2.pageTest{");;
});