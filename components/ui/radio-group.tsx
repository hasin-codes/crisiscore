"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface RadioGroupItemProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

const RadioGroupContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null)

export const RadioGroup: React.FC<RadioGroupProps> = ({ 
  value, 
  onValueChange, 
  className, 
  children 
}) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange }}>
      <div className={cn("grid gap-2", className)}>
        {children}
      </div>
    </RadioGroupContext.Provider>
  )
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ 
  value, 
  className, 
  children 
}) => {
  const context = React.useContext(RadioGroupContext)
  if (!context) throw new Error("RadioGroupItem must be used within a RadioGroup")

  const { value: selectedValue, onValueChange } = context
  const isSelected = value === selectedValue

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => onValueChange(value)}
      className={cn(
        "flex items-center space-x-2 p-2 rounded-md",
        isSelected && "bg-zinc-800",
        className
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full border border-zinc-600",
        isSelected && "bg-blue-500 border-blue-500"
      )} />
      <span>{children}</span>
    </button>
  )
} 