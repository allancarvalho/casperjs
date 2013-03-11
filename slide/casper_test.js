//carrega o casper
var casper = require('casper').create();

//inicia os testes
casper.start('http://www.submarino.com.br/', function() {
	//Verifica se não existe o texto
	this.test.assertTextDoesntExist("Cadastro realizado com sucesso!");

	//Busca o formulario com action '/message/option' preenche o campo 'optin.email'
	this.fill('form[action="/message/optin"]', { 
		'optin.email': 'allan.carvalho@ideais.com.br' 
	});
	//clica no botão enviar
	this.click(".btSend02");

	//Verifica se existe o texto
	this.waitFor(function() {
		return this.evaluate(function() {
			return document.querySelectorAll('.sucessBox').length > 0;
		})
	},function() {
		this.test.assertTextExists("Cadastro realizado com sucesso!");
	});
});


//roda os testes
casper.run(function() {
	this.test.renderResults(true);
});