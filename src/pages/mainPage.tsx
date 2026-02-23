import { useState } from "react"
import { InputElement } from "@/components/input/input"
import { ConstellationBackground } from "@/components/ui/constellation.tsx"
import { GlassDiv } from "@/components/ui/glassDiv"
import { GlassButton } from "@/components/ui/glassButton"
import { SelectMethod, type LoanMethod } from "@/components/ui/selectMethod"
import { LoanChart } from "@/components/ui/loanChart"
import { calcTablePrice } from "@/functions/calcTablePrice"
import { calcTableSac } from "@/functions/calcTableSAC"
import type { Installment } from "@/types/types"
import { Percent, Hash } from "lucide-react"

interface FormState {
  financingValue: string
  interestRate: string
  numberOfPeriods: string
}

interface FormErrors {
  financingValue?: string
  interestRate?: string
  numberOfPeriods?: string
}

function validateField(value: string, name: string): string | undefined {
  if (!value || value.trim() === "") return "Campo obrigatório"
  const num = parseFloat(value)
  if (isNaN(num)) return "Valor inválido"
  if (num <= 0) return "Deve ser maior que 0"
  if (name === "numberOfPeriods" && !Number.isInteger(num))
    return "Deve ser um número inteiro"
  return undefined
}

export default function Page() {
  const [form, setForm] = useState<FormState>({
    financingValue: "",
    interestRate: "",
    numberOfPeriods: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [method, setMethod] = useState<LoanMethod>("price")
  const [result, setResult] = useState<Installment[] | null>(null)

  const handleChange = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }))
      // limpa o erro do campo ao digitar
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
    }

  const handleCalculate = () => {
    const newErrors: FormErrors = {
      financingValue: validateField(form.financingValue, "financingValue"),
      interestRate: validateField(form.interestRate, "interestRate"),
      numberOfPeriods: validateField(form.numberOfPeriods, "numberOfPeriods"),
    }

    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    try {
      const input = {
        financingValue: parseFloat(form.financingValue),
        interestRate: parseFloat(form.interestRate) / 100, // % → decimal
        numberOfPeriods: parseInt(form.numberOfPeriods, 10),
      }

      const table = method === "price"
        ? calcTablePrice(input)
        : calcTableSac(input)

      setResult(table)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <ConstellationBackground
      glow={true}
      count={180}
      nodeSize={1}
      nodeColor="#2bff00"
      mouseRadius={200}
    >
      <GlassDiv>
        <h1 className="text-white text-2xl font-semibold mb-8 tracking-wide">
          Simulador de Empréstimos

        </h1>

        <div className="flex flex-col gap-5">
          {/* Financiamento */}
          <div className="flex flex-col gap-1.5">
            <span className="text-green-400/70 text-xs uppercase tracking-widest font-medium pl-1">
              Financiamento
            </span>
            <InputElement
              label="Valor do Financiamento (R$)"
              type="number"
              value={form.financingValue}
              onChange={handleChange("financingValue")}
              error={errors.financingValue}
            />
          </div>

          {/* Taxa de Juros */}
          <div className="flex flex-col gap-1.5">
            <span className="text-green-400/70 text-xs uppercase tracking-widest font-medium pl-1">
              Taxa de Juros
            </span>
            <InputElement
              label="Taxa de Juros (% ao mês)"
              type="number"
              value={form.interestRate}
              icon={<Percent size={18} />}
              onChange={handleChange("interestRate")}
              error={errors.interestRate}
            />
          </div>

          {/* Períodos */}
          <div className="flex flex-col gap-1.5">
            <span className="text-green-400/70 text-xs uppercase tracking-widest font-medium pl-1">
              Número de Períodos
            </span>
            <InputElement
              label="Número de Períodos (meses)"
              type="number"
              value={form.numberOfPeriods}
              icon={<Hash size={18} />}
              onChange={handleChange("numberOfPeriods")}
              error={errors.numberOfPeriods}
            />
          </div>

          {/* Dropdown método */}
          <SelectMethod value={method} onChange={setMethod} />

          {/* Botão calcular */}
          <GlassButton onClick={handleCalculate}>
            Calcular
          </GlassButton>
        </div>

        {/* Gráfico */}
        {result && (
          <LoanChart installments={result} method={method} />
        )}
      </GlassDiv>
    </ConstellationBackground>
  )
}
