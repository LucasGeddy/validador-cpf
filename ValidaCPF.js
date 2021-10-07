class ValidadorCPF {
    constructor(cpf) {
        this.cpfOriginal = cpf;
    }
    
    validar() {
        this.cpfCalculado = Array.from(this.cpfOriginal.replace(/\D+/g, ''));
        this.cpfCalculado.splice(9,2);
        this.calculaPrimeiroDigito();
        this.calculaSegundoDigito();
        this.formataArrayToString();
    }

    get cpfValido() {
        if (this.cpfCalculado === undefined) {
            this.validar();
        }
        return this.cpfCalculado === this.cpfOriginal ? 'válido' : 'inválido';
    }

    report() {
        if (this.cpfCalculado === undefined) {
            this.validar();
        }
        console.log(`Seu cpf ${this.cpfOriginal} é ${this.cpfValido}`);
    }
    
    calculaPrimeiroDigito = () => {
        let primeiroDigito = 11 - (this.cpfCalculado.reduce((ac, val, index) => ac + (Number(val) * Math.abs(index - 10)), 0) % 11);
    
        this.cpfCalculado.splice(9, 0, 
            primeiroDigito >= 10 ? '0' : primeiroDigito.toString()
        );
    }
    
    calculaSegundoDigito = () => {
        let segundoDigito = 11 - (this.cpfCalculado.reduce((ac, val, index) => ac + (Number(val) * Math.abs(index - 11)), 0) % 11);
    
        this.cpfCalculado.splice(10, 0, 
            segundoDigito >= 10 ? '0' : segundoDigito.toString()
        );
    }
    
    formataArrayToString() {
    
        this.cpfCalculado.splice(3, 0, '.');
        this.cpfCalculado.splice(7, 0, '.');
        this.cpfCalculado.splice(11, 0, '/');
    
        this.cpfCalculado = this.cpfCalculado.toString().replaceAll(',', '');
    };
};

// TESTES
let validaCPF = new ValidadorCPF('330.803.178/74');

// validaCPF.validaCPF();
// console.log(validaCPF);

console.log(validaCPF.cpfValido);

validaCPF.report();