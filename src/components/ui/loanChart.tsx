import { Chart } from "react-google-charts"
import type { Installment } from "@/types/types"

interface LoanChartProps {
    installments: Installment[]
    method: "price" | "sac"
}

const formatBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function LoanChart({ installments, method }: LoanChartProps) {
    const header = ["Mês", "Saldo Devedor", "Parcela", "Juros", "Amortização"]

    const rows = installments.map(inst => [
        inst.month,
        parseFloat(inst.outstandingBalance.toFixed(2)),
        parseFloat(inst.installmentValue.toFixed(2)),
        parseFloat(inst.monthlyInterest.toFixed(2)),
        parseFloat(inst.amortization.toFixed(2)),
    ])

    const data = [header, ...rows]

    const totalJuros = installments.reduce((s, i) => s + i.monthlyInterest, 0)
    const totalPago = installments.reduce((s, i) => s + i.installmentValue, 0)
    const totalAmort = installments.reduce((s, i) => s + i.amortization, 0)

    const options = {
        backgroundColor: "transparent",
        chartArea: { width: "88%", height: "72%", top: 20, left: 70 },
        legend: {
            position: "bottom",
            textStyle: { color: "#ffffff", fontSize: 12 },
        },
        hAxis: {
            textStyle: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
            gridlines: { color: "transparent" },
            baselineColor: "rgba(255,255,255,0.15)",
        },
        vAxis: {
            textStyle: { color: "rgba(255,255,255,0.55)", fontSize: 11 },
            gridlines: { color: "rgba(255,255,255,0.06)" },
            baselineColor: "rgba(255,255,255,0.15)",
            format: "short",
        },
        series: {
            0: { color: "#2bff00", areaOpacity: 0.12, lineWidth: 2 },   // Saldo Devedor
            1: { color: "#ffffff", areaOpacity: 0.08, lineWidth: 2 },   // Parcela
            2: { color: "#ff6b35", areaOpacity: 0.14, lineWidth: 2 },   // Juros
            3: { color: "#00d4ff", areaOpacity: 0.10, lineWidth: 2 },   // Amortização
        },
        tooltip: {
            textStyle: { color: "#111", fontSize: 13 },
            showColorCode: true,
        },
        curveType: "function",
        lineWidth: 2,
        pointSize: installments.length <= 24 ? 4 : 0,
    }

    return (
        <div style={{
            width: "100%",
            marginTop: "24px",
        }}>
            {/* Cabeçalho do resultado */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "20px",
            }}>
                {[
                    { label: "Total Pago", value: formatBRL(totalPago), color: "#ffffff" },
                    { label: "Total Juros", value: formatBRL(totalJuros), color: "#ff6b35" },
                    { label: "Amortizado", value: formatBRL(totalAmort), color: "#2bff00" },
                ].map(card => (
                    <div key={card.label} style={{
                        padding: "14px 16px",
                        borderRadius: "8px",
                        border: `1px solid ${card.color}30`,
                        background: `${card.color}08`,
                        backdropFilter: "blur(6px)",
                        textAlign: "center",
                    }}>
                        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "6px" }}>
                            {card.label}
                        </p>
                        <p style={{ fontSize: "1rem", fontWeight: 700, color: card.color }}>
                            {card.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Tag do método */}
            <p style={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "8px",
                textAlign: "right",
            }}>
                {method === "price" ? "Tabela Price" : "SAC"} · {installments.length} parcelas
            </p>

            {/* Gráfico */}
            <div style={{
                borderRadius: "12px",
                border: "1px solid rgba(43,255,0,0.15)",
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(8px)",
                padding: "16px 8px 8px",
                overflow: "hidden",
            }}>
                <Chart
                    chartType="AreaChart"
                    data={data}
                    options={options}
                    width="100%"
                    height="320px"
                />
            </div>
        </div>
    )
}
