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
		},
		esta_ao_lado_desse: function(selector2, msg) {
			casper.test.assert(casper.evaluate(function(_selector, _selector2) {
				return document.querySelector(_selector).offsetTop == document.querySelector(_selector2).offsetTop
			}, selector, selector2), msg);
		}		
	}
}
var este_elemento = function(selector) {
	return new casperApi(selector);
}
var o_titulo_dessa_pagina_tem = function(text, msg) {
	return casper.test.assertTitleMatch(text, msg);
}
casper.test.on("fail", function(fail){
	// casper.capture('error.png');
	// casper.exit();
});

casper.start('http://hml.www.submarino.com.br/', function(e) {  
	o_titulo_dessa_pagina_tem(/Submarino/, "Submarino encontrado no titulo")
	este_elemento('.prodList li:nth-of-type(1) .priceBox .discount').esta_acima_desse('.prodList li:nth-of-type(1) .regular', 'esta acima');
	este_elemento('.prodList li:nth-of-type(1) .priceBox .sale').esta_ao_lado_desse('.prodList li:nth-of-type(1) .priceBox .regular', 'esta ao lado')
});

casper.run(function() {
	this.test.renderResults(true);
});
