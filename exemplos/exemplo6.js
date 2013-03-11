var casper = require('casper').create({
	logLevel: "error",
	pageSettings: {
		loadImages:  false,      
		loadPlugins: false       
	},
	verbose: true
});

casper.test.on("fail", function(fail){
	// casper.capture('error.png');
	// casper.exit();
});

casper.start('http://hml.www.submarino.com.br/', function(e) {  
	this.test.assertTitleMatch(/Submarino/, "Submarino encontrado no titulo");

	this.test.assert(this.evaluate(function() {
		return document.querySelector(".prodList li:nth-of-type(1) .priceBox .discount").offsetTop < document.querySelector(".prodList li:nth-of-type(1) .regular").offsetTop
	}), "Desconto acima de preço");

	this.test.assert(this.evaluate(function() {
		return document.querySelector(".prodList li:nth-of-type(1) .priceBox .sale").offsetTop == document.querySelector(".prodList li:nth-of-type(1) .priceBox .regular").offsetTop
	}), "preço de e por na mesma linha");
});

casper.run(function() {
	this.test.renderResults(true);
});
