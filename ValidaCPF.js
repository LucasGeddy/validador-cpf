function ValidadorCPF(cpf) {
    this.cpfOriginal = cpf;
    
    let cpfCalculadoTemp = Array.from(this.cpfOriginal.replace(/\D+/g, ''));
    cpfCalculadoTemp.splice(9,2);
    cpfCalculadoTemp = calculaPrimeiroDigito(cpfCalculadoTemp);
    cpfCalculadoTemp = calculaSegundoDigito(cpfCalculadoTemp);
    
    this.cpfCalculado = formataArrayToString(cpfCalculadoTemp);
};

Object.defineProperty(ValidadorCPF.prototype, 'cpfValido',
{
    get() {
        return (this.cpfCalculado === undefined || this.cpfOriginal === undefined) ? 'Erro, campos indefinidos.' 
            : this.cpfCalculado === this.cpfOriginal ? 'válido' : 'inválido';
    },
});

ValidadorCPF.prototype.report = function() { console.log(`Seu cpf ${this.cpfOriginal} é ${this.cpfValido}`); };

const calculaPrimeiroDigito = (cpf) => {
    let primeiroDigito = 11 - (cpf.reduce((ac, val, index) => ac + (Number(val) * Math.abs(index - 10)), 0) % 11);

    cpf.splice(9, 0, 
        primeiroDigito >= 10 ? '0' : primeiroDigito.toString()
    );

    return cpf;
}

const calculaSegundoDigito = (cpf) => {
    let segundoDigito = 11 - (cpf.reduce((ac, val, index) => ac + (Number(val) * Math.abs(index - 11)), 0) % 11);

    cpf.splice(10, 0, 
        segundoDigito >= 10 ? '0' : segundoDigito.toString()
    );

    return cpf;
}

const formataArrayToString = (cpf) => {

    cpf.splice(3, 0, '.');
    cpf.splice(7, 0, '.');
    cpf.splice(11, 0, '/');

    return cpf.toString().replaceAll(',', '');
};


// TESTES
let validaCPF = new ValidadorCPF('330.803.178/73');

console.log(validaCPF.cpfValido);

validaCPF.report();