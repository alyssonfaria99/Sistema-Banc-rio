const express = require('express');
const { listarContas, criarConta, atualizarConta, deletarConta, depositar, sacar, transferir, consultarSaldo, consultarExtrato } = require('./controllers/controlador');
const { validarCpfEmail, validacoesParaAtualizar, validacoesParaDeletar, validacoesParaDepositar, validacoesParaSacar, validacoesParaTransferir, validacoesParaConsultarSaldoEExtrato } = require('./middlewares');

const rotas = express();

rotas.get('/contas', listarContas);
rotas.post('/contas', validarCpfEmail, criarConta);
rotas.put('/contas/:numeroConta/usuario', validacoesParaAtualizar, validarCpfEmail, atualizarConta);
rotas.delete('/contas/:numeroConta', validacoesParaDeletar, deletarConta);
rotas.post('/transacoes/depositar', validacoesParaDepositar, depositar);
rotas.post('/transacoes/sacar', validacoesParaSacar, sacar);
rotas.post('/transacoes/transferir', validacoesParaTransferir, transferir);
rotas.get('/contas/saldo', validacoesParaConsultarSaldoEExtrato, consultarSaldo);
rotas.get('/contas/extrato', validacoesParaConsultarSaldoEExtrato, consultarExtrato);


module.exports = rotas;