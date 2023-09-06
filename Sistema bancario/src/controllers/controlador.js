let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const listarContas = async (req, res) => {
    try {
        const { senha_banco } = req.query;
        if (!senha_banco) {
            return res.status(401).json({ mensagem: 'A senha é obrigatória.' });
        }
        if (senha_banco !== banco.senha) {
            return res.status(401).json({ mensagem: "A senha do banco informada é inválida." });
        }
        return res.status(200).json(contas);
    } catch (error) {
        console.log(error.message);
    }
}

const criarConta = async (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        let numero = 1;
        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
        }
        if (contas.length > 0) {
            numero = (contas[contas.length - 1].numero) + 1
        }

        const novaConta = {
            numero,
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        contas.push(novaConta);
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const atualizarConta = async (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
        const { numeroConta } = req.params;
        const contaEncontrada = contas.find((conta) => {
            return conta.numero == numeroConta;
        });
        contaEncontrada.usuario.nome = nome;
        contaEncontrada.usuario.cpf = cpf;
        contaEncontrada.usuario.data_nascimento = data_nascimento;
        contaEncontrada.usuario.telefone = telefone;
        contaEncontrada.usuario.email = email;
        contaEncontrada.usuario.senha = senha;

        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const deletarConta = async (req, res) => {
    try {
        const { numeroConta } = req.params;
        contas = contas.filter((conta) => {
            return conta.numero != numeroConta;
        });
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const depositar = async (req, res) => {
    try {
        const { numero_conta, valor } = req.body;
        const contaEncontrada = contas.find((conta) => {
            return conta.numero == numero_conta;
        })
        contaEncontrada.saldo += valor;
        const registroDeDepósito = {
            data: new Date(),
            numero_conta,
            valor
        }
        depositos.push(registroDeDepósito);
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const sacar = async (req, res) => {
    try {
        const { numero_conta, valor } = req.body;
        const contaEncontrada = contas.find((conta) => {
            return conta.numero == numero_conta;
        })
        contaEncontrada.saldo -= valor;
        const registroDeSaque = {
            data: new Date(),
            numero_conta,
            valor
        }
        saques.push(registroDeSaque);
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const transferir = async (req, res) => {
    try {
        const { numero_conta_origem, numero_conta_destino, valor } = req.body;
        const contaOrigem = contas.find((conta) => {
            return conta.numero == numero_conta_origem;
        });
        const contaDestino = contas.find((conta) => {
            return conta.numero == numero_conta_destino;
        });
        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
        const registroDeTransferencia = {
            data: new Date(),
            numero_conta_origem,
            numero_conta_destino,
            valor
        }
        transferencias.push(registroDeTransferencia);
        return res.status(204).send();
    } catch (error) {
        console.log(error.message);
    }
}

const consultarSaldo = async (req, res) => {
    try {
        const { numero_conta } = req.query;
        const contaEncontrada = contas.find((conta) => {
            return conta.numero == numero_conta;
        });
        return res.status(200).json({ saldo: contaEncontrada.saldo });
    } catch (error) {
        console.log(error.message);
    }
}

const consultarExtrato = async (req, res) => {
    try {
        const { numero_conta } = req.query;
        const contaEncontrada = contas.find((conta) => {
            return conta.numero == numero_conta;
        });
        const transferenciasEnviadas = transferencias.filter((transferencia) => {
            return transferencia.numero_conta_origem == contaEncontrada.numero;
        });
        const transferenciasRecebidas = transferencias.filter((transferencia) => {
            return transferencia.numero_conta_destino == contaEncontrada.numero;
        });
        const depositosRecebidos = depositos.filter((deposito) => {
            return deposito.numero_conta == numero_conta;
        });
        const saquesEfetuados = saques.filter((saque) => {
            return saque.numero_conta == numero_conta;
        });
        return res.status(200).json({ depositosRecebidos, saquesEfetuados, transferenciasEnviadas, transferenciasRecebidas });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    consultarExtrato
};