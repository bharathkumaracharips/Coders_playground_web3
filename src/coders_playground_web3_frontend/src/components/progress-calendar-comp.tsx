"use client"

import { ProgressCalendar } from "../ui/progress-calendar"

// Generate sample data for demonstration
const generateSampleData = () => {
  const data = []
  const startDate = new Date(2024, 0, 1)
  const endDate = new Date(2024, 11, 31)

  const currentDate = new Date(startDate)
  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0]

    // Generate random activity with some patterns
    const dayOfWeek = currentDate.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const randomFactor = Math.random()

    let count = 0
    let level: 0 | 1 | 2 | 3 | 4 = 0

    // Less activity on weekends
    if (!isWeekend && randomFactor > 0.3) {
      count = Math.floor(Math.random() * 15) + 1
      if (count >= 12) level = 4
      else if (count >= 8) level = 3
      else if (count >= 4) level = 2
      else level = 1
    } else if (isWeekend && randomFactor > 0.7) {
      count = Math.floor(Math.random() * 5) + 1
      level = count >= 3 ? 2 : 1
    }

    if (count > 0) {
      data.push({ date: dateString, count, level })
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return data
}

export default function ProgressCalendarDemo() {
  const sampleData = generateSampleData()

  // Calculate some stats
  const totalContributions = sampleData.reduce((sum, day) => sum + day.count, 0)
  const activeDays = sampleData.length
  const currentStreak = calculateCurrentStreak(sampleData)
  const longestStreak = calculateLongestStreak(sampleData)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Progress Tracker Calendar</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your daily progress with a GitHub-style contribution calendar
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">{totalContributions}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total contributions</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">{activeDays}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active days</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-purple-600">{currentStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Current streak</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <div className="text-2xl font-bold text-orange-600">{longestStreak}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Longest streak</div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h2 className="text-lg font-semibold mb-4">2024 Activity</h2>
        <ProgressCalendar data={sampleData}  />
      </div>
    </div>
  )
}

// Helper functions for calculating streaks
function calculateCurrentStreak(data: Array<{ date: string; count: number }>) {
  if (data.length === 0) return 0

  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  const currentDate = new Date(today)

  for (const activity of sortedData) {
    const activityDate = new Date(activity.date)
    activityDate.setHours(0, 0, 0, 0)

    if (activityDate.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (activityDate.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}

function calculateLongestStreak(data: Array<{ date: string; count: number }>) {
  if (data.length === 0) return 0

  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  let longestStreak = 0
  let currentStreak = 1

  for (let i = 1; i < sortedData.length; i++) {
    const prevDate = new Date(sortedData[i - 1].date)
    const currentDate = new Date(sortedData[i].date)

    const diffTime = currentDate.getTime() - prevDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)

    if (diffDays === 1) {
      currentStreak++
    } else {
      longestStreak = Math.max(longestStreak, currentStreak)
      currentStreak = 1
    }
  }

  return Math.max(longestStreak, currentStreak)
}
