var casper = require('casper').create({
	logLevel: "error",
	pageSettings: {
		loadImages:  false,      
		loadPlugins: false       
	},
	verbose: true
});

var casperApi = function(selector) {
	return {
		esta_acima_desse: function(selector2, msg) {
			casper.test.assert(casper.evaluate(function(_selector, _selector2) {
				return document.querySelector(_selector).offsetTop < document.querySelector(_selector2).offsetTop
			}, selector, selector2), msg);
		}		
	}
}
var este_elemento = function(selector) {
	return new casperApi(selector);
}
casper.test.on("fail", function(fail){
	// casper.capture('error.png');
	// casper.exit();
});

casper.start('http://localhost:8080/', function(e) {  
	// this.test.assertTitleMatch(/Submarino/, "Submarino encontrado no titulo");
	este_elemento('.prodList li:nth-of-type(1) .priceBox .discount').esta_acima_desse('.prodList li:nth-of-type(2) .regular')

	this.test.assert(this.evaluate(function() {
		return document.querySelector(".prodList li:nth-of-type(1) .priceBox .discount").offsetTop < document.querySelector(".prodList li:nth-of-type(1) .regular").offsetTop
	}), "Desconto acima de preço");

	// this.test.assert(this.evaluate(function() {
	// 	return document.querySelector(".prodList li:nth-of-type(1) .priceBox .sale").offsetTop == document.querySelector(".prodList li:nth-of-type(1) .priceBox .regular").offsetTop
	// }), "preço de e por na mesma linha");

});

casper.run(function() {
	this.test.renderResults(true);
});
