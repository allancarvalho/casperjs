//carrega o casper
var casper = require('casper').create();

//inicia os testes
casper.start('http://www.submarino.com.br/', function() {
	// procura um texto na pagina
	this.test.assertTextExists('Eletrônicos', 'Verifica se a pagina contem o texto');
	// procura um texto no seletor
	this.test.assertSelectorHasText('.desc', 'Submarino.com.br: Livros, DVDs, Blu-ray, Eletrônicos, Notebooks, Computadores, Celulares, Câmeras Digitais e muito mais');
});
});


//roda os testes
casper.run(function() {
this.test.renderResults(true);
});