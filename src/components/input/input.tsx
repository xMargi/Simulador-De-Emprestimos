import { DollarSign } from "lucide-react"
import styles from "../input/input.module.css"
import { cn } from "@/lib/utils"
import React, { useState } from "react";

interface InputProps {
    label: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type?: string,
    icon?: React.ReactNode,
    error?: string,
}

export function InputElement({
    label,
    value,
    onChange,
    type = "text",
    icon = <DollarSign size={18} />,
    error,
}: InputProps) {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isActive = focused || hasValue || (value !== undefined && value !== "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value.length > 0);
        onChange?.(e);
    };

    return (
        <div className="w-full">
            <fieldset
                className={cn(
                    styles.containerInput,
                    isActive && styles.active,
                    error && styles.error
                )}
            >
                <legend className={styles.legend}>{label}</legend>

                <input
                    type={type}
                    onChange={handleChange}
                    value={value}
                    id={label}
                    className={styles.input}
                    placeholder=" "
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />

                <label htmlFor={label} className={styles.label}>
                    {label}
                </label>

                {icon && (
                    <span className={styles.icon}>{icon}</span>
                )}
            </fieldset>
            {error && (
                <span className={styles.errorMsg}>{error}</span>
            )}
        </div>
    )
}