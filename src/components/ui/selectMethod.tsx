import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import styles from "./selectMethod.module.css"
import { cn } from "@/lib/utils"

export type LoanMethod = "price" | "sac"

const OPTIONS: { value: LoanMethod; label: string; description: string }[] = [
    { value: "price", label: "Tabela Price", description: "Parcelas fixas" },
    { value: "sac", label: "SAC", description: "Amortização constante" },
]

interface SelectMethodProps {
    value: LoanMethod
    onChange: (v: LoanMethod) => void
}

export function SelectMethod({ value, onChange }: SelectMethodProps) {
    const [open, setOpen] = useState(false)
    const selected = OPTIONS.find(o => o.value === value)!

    return (
        <div className={styles.selectWrapper}>
            <p className={styles.label}>Método de amortização</p>
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <button className={styles.trigger} data-state={open ? "open" : "closed"}>
                        <span>{selected.label} — <span style={{ opacity: 0.55, fontSize: "0.85rem" }}>{selected.description}</span></span>
                        <ChevronDown size={18} className={styles.chevron} />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className={styles.content} align="start" sideOffset={6}>
                    {OPTIONS.map(opt => (
                        <DropdownMenuItem
                            key={opt.value}
                            className={cn(styles.item, opt.value === value && styles.itemActive)}
                            onClick={() => { onChange(opt.value); setOpen(false) }}
                        >
                            <span>
                                {opt.label}
                                <span style={{ display: "block", fontSize: "0.78rem", opacity: 0.55 }}>
                                    {opt.description}
                                </span>
                            </span>
                            {opt.value === value && <Check size={15} className={styles.check} />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
