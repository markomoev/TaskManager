import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useUserId } from '../global/UserId'

export type ChartDataPoint = {
    date: string
    desktop: number
}

export function useProgressData(timeRange: string) {
    const [data, setData] = useState<ChartDataPoint[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)
            
            // Get User
            const { data: userData } = await useUserId()
            if (!userData?.[0]) return setIsLoading(false)

            // Fetch all hustles
            const { data: hustles } = await supabase
                .from('hustles')
                .select('created_at')
                .eq('user_id', userData[0])
                .order('created_at', { ascending: true })

            if (!hustles) return setIsLoading(false)

            const counts: Record<string, number> = {}
            
            hustles.forEach(h => {
                const date = h.created_at.split('T')[0]
                counts[date] = (counts[date] || 0) + 1
            })

            // Filter by ID range
            const now = new Date()
            const days = timeRange === '30d' ? 30 : timeRange === '7d' ? 7 : 90
            now.setDate(now.getDate() - days)
            const cutoffDate = now.toISOString().split('T')[0]

            const cleanData = Object.entries(counts)
                .map(([date, count]) => ({
                    date,
                    desktop: count, 
                }))
                .filter(item => item.date >= cutoffDate) // String comparison works for ISO dates
                .sort((a, b) => a.date.localeCompare(b.date))

            setData(cleanData)
            setIsLoading(false)
        }

        loadData()
    }, [timeRange])

    return { data, isLoading }
}