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


const calcPMT = (data: SimulationInput): number => {
    const {financingValue, interestRate, numberOfPeriods} = data;
    validateEntry({financingValue, interestRate, numberOfPeriods});

    const calcPMT = (financingValue * interestRate) / (1 - (1 + interestRate) ** -numberOfPeriods)

    return calcPMT;

}

export const calcTablePrice = (data: SimulationInput): Installment[] => {
    const pmt = calcPMT(data);
    const installments: Installment[] = [];
    let debtBalance = data.financingValue;

    for(let i = 0; i < data.numberOfPeriods; i++){
        const monthlyInterest = debtBalance * data.interestRate;
        const amortization = pmt - monthlyInterest;

        const newInstallment: Installment = {
            month: `Mês ${i + 1}`,
            amortization,
            installmentValue: pmt,
            monthlyInterest,
            outstandingBalance: debtBalance
        }
        installments.push(newInstallment);
        debtBalance -= amortization;
    }

    return installments;
}