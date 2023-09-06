const { contas } = require('./bancodedados');


const validarCpfEmail = (req, res, next) => {
    const { cpf, email } = req.body;
    let cpfOuEmailEncontrado = contas.find((conta) => {
        return conta.usuario.cpf == cpf || conta.usuario.email == email;
    });
    if (cpfOuEmailEncontrado) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado.' })
    }
    next();
}

const validacoesParaAtualizar = (req, res, next) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    if (isNaN(numeroConta) || numeroConta < 1) {
        return res.status(400).json({ mensagem: "Número da conta inválido." })
    }
    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numeroConta;
    });
    if (contaEncontrada === undefined) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' })
    }
    next();
}

const validacoesParaDeletar = (req, res, next) => {
    const { numeroConta } = req.params;
    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numeroConta;
    });
    if (contaEncontrada === undefined) {
        return res.status(400).json({ mensagem: 'O número da conta é inválido.' })
    }
    if (contaEncontrada.saldo != 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero.' })
    }
    next();
}

const validacoesParaDepositar = (req, res, next) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor do depósito devem ser informados.' });
    }
    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numero_conta;
    })
    if (contaEncontrada === undefined) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' })
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do depósito deve ser maior que zero.' })
    }
    next();
}

const validacoesParaSacar = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor e a senha devem ser informados.' });
    }
    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numero_conta;
    })
    if (contaEncontrada === undefined) {
        return res.status(404).json({ mensagem: 'A conta informada não existe.' });
    }
    if (contaEncontrada.usuario.senha !== senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' })
    }
    if (contaEncontrada.saldo < valor) {
        return res.status(400).json({ mensagem: 'Seu saldo é insuficiente' });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor do saque deve ser maior que zero.' });
    }
    next();

}

const validacoesParaTransferir = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    if (!numero_conta_destino || !numero_conta_origem) {
        return res.status(400).json({ mensagem: 'As contas de origem e de destino devem ser informadas.' });
    }
    const conta_origem_encontrada = contas.find((conta) => {
        return conta.numero == numero_conta_origem;
    });
    const conta_destino_encontrada = contas.find((conta) => {
        return conta.numero == numero_conta_destino;
    });
    if (conta_destino_encontrada == undefined) {
        return res.status(404).json({ mensagem: 'A conta de destino não existe.' });
    }
    if (conta_origem_encontrada == undefined) {
        return res.status(404).json({ mensagem: 'A conta de origem não existe.' });
    }
    if (senha !== conta_origem_encontrada.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' });
    }
    if (valor > conta_origem_encontrada.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }
    next();
}

const validacoesParaConsultarSaldoEExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    const contaEncontrada = contas.find((conta) => {
        return conta.numero == numero_conta;
    });
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e a senha devem ser informados.' });
    }
    if (contaEncontrada == undefined) {
        return res.status(404).json({ mensagem: ' A conta não foi encontrada.' });
    }
    if (senha !== contaEncontrada.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha inválida.' });
    }
    next();
}

module.exports = {
    validarCpfEmail,
    validacoesParaAtualizar,
    validacoesParaDeletar,
    validacoesParaDepositar,
    validacoesParaSacar,
    validacoesParaTransferir,
    validacoesParaConsultarSaldoEExtrato
};