export interface SimulationInput {
    financingValue: number
    interestRate: number
    numberOfPeriods: number
}

export interface Installment  {
    month: string
    installmentValue: number
    monthlyInterest: number
    amortization: number
    outstandingBalance: number
}