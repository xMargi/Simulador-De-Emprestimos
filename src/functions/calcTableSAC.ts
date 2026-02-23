import type { Installment, SimulationInput } from "../types/types";

const validateEntry = (data: SimulationInput): SimulationInput => {
    const {financingValue, interestRate, numberOfPeriods} = data;

    if(!financingValue || !interestRate || !numberOfPeriods){
        throw new Error("Valores não podem ser nulos ou indefinidos");
    }

    if(financingValue <= 0 || interestRate <= 0 || numberOfPeriods <= 0){
        throw new Error("Os valores devem ser maiores do que 0");
    }

    return data;
}

const calcSAC = (data: SimulationInput): number => {
    const {financingValue, interestRate, numberOfPeriods} = data;
    validateEntry({financingValue, interestRate, numberOfPeriods});

    const calcSac = financingValue / numberOfPeriods

    return calcSac
}

export const calcTableSac = (data: SimulationInput): Installment[] => {
    const amortization = calcSAC(data);
    const installments: Installment[] = [];
    let debtBalance = data.financingValue;

    for(let i = 0; i < data.numberOfPeriods; i++){
        const monthlyInterest = debtBalance * data.interestRate;
        const installmentValue = amortization + monthlyInterest;

        const newInstallment: Installment = {
            month: `Mês ${i + 1}`,
            amortization,
            installmentValue,
            monthlyInterest,
            outstandingBalance: debtBalance
        }

        debtBalance -= amortization;
        installments.push(newInstallment);
    }

    return installments;
}