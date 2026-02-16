/*global QUnit*/
import Controller from "moovi/sap/fiori/master/detail/v1/controller/Home.controller";

QUnit.module("Home Controller");

QUnit.test("I should test the Home controller", function (assert: Assert) {
	const oAppController = new Controller("Home");
	oAppController.onInit();
	assert.ok(oAppController);
});