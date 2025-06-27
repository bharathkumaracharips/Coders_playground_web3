"use client"

import React, { useState } from "react"
import { cn } from "../lib/utils"

interface ActivityData {
  date: string // YYYY-MM-DD format
  count: number
  level: 0 | 1 | 2 | 3 | 4 // Activity level (0 = no activity, 4 = highest)
}

interface ProgressCalendarProps {
  data: ActivityData[]
  className?: string
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const LEVEL_COLORS = {
  0: "bg-gray-100 dark:bg-gray-800",
  1: "bg-green-200 dark:bg-green-900",
  2: "bg-green-300 dark:bg-green-700",
  3: "bg-green-400 dark:bg-green-600",
  4: "bg-green-500 dark:bg-green-500",
}

export function ProgressCalendar({ data, className }: ProgressCalendarProps) {
  const today = new Date()
  const [selectedYear, setSelectedYear] = useState(today.getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth())

  // Create a map for quick lookup of activity data
  const activityMap = new Map(data.map((item) => [item.date, item]))

  // Get first and last day of the selected month
  const firstDay = new Date(selectedYear, selectedMonth, 1)
  const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Build grid: pad start with empty days if month doesn't start on Sunday
  const grid: Array<{ date: Date|null, dateString: string, activity: ActivityData|null }> = []
  for (let i = 0; i < firstDay.getDay(); i++) {
    grid.push({ date: null, dateString: "", activity: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(selectedYear, selectedMonth, d)
    const dateString = date.toISOString().split("T")[0]
    grid.push({
      date,
      dateString,
      activity: activityMap.get(dateString) || null,
    })
  }
  // Pad end to complete the last week
  while (grid.length % 7 !== 0) {
    grid.push({ date: null, dateString: "", activity: null })
  }

  // Years for dropdown (show a range around current year)
  const yearOptions = Array.from({length: 5}, (_, i) => today.getFullYear() - 2 + i)

  return (
    <div className={cn("bg-white dark:bg-neutral-900 rounded-xl shadow p-6 w-full max-w-xl mx-auto", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{MONTHS[selectedMonth]} {selectedYear} Activity</h2>
        <div className="flex gap-2">
          <select
            className="border rounded px-2 py-1 text-sm focus:outline-none"
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
          >
            {MONTHS.map((m, i) => <option value={i} key={m}>{m}</option>)}
          </select>
          <select
            className="border rounded px-2 py-1 text-sm focus:outline-none"
            value={selectedYear}
            onChange={e => setSelectedYear(Number(e.target.value))}
          >
            {yearOptions.map(y => <option value={y} key={y}>{y}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-xs text-gray-500 text-center font-medium">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {grid.map((cell, idx) => (
            <div key={idx} className="flex items-center justify-center h-8">
              {cell.date ? (
                <div
                  className={cn(
                    "w-6 h-6 rounded transition-all cursor-pointer flex items-center justify-center text-xs font-medium",
                    LEVEL_COLORS[cell.activity?.level || 0],
                    cell.date.toDateString() === today.toDateString() ? "ring-2 ring-green-400" : ""
                  )}
                  title={cell.dateString + (cell.activity ? `: ${cell.activity.count} contributions` : "")}
                >
                  {cell.date.getDate()}
                </div>
              ) : (
                <div className="w-6 h-6" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end mt-4 text-xs text-gray-600 dark:text-gray-400 gap-1">
        <span>Less</span>
        {Object.entries(LEVEL_COLORS).map(([level, color]) => (
          <div key={level} className={cn("w-4 h-4 rounded", color)} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
