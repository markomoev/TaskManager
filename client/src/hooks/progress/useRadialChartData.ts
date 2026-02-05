import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useUserId } from '../global/UserId'

export interface RadialChartDataPoint {
    status: string;
    count: number;
    fill: string;
}

export default function useRadialChartData() {
    const [data, setData] = useState<RadialChartDataPoint[]>([])

    useEffect(() => {
        async function loadData() {
            // Get User
            const { data: userData } = await useUserId()

            // Fetch all hustles with their statuses
            const { data: hustles } = await supabase
                .from('hustles')
                .select('status')
                .eq('user_id', userData?.[0])

            // Initialize counts
            const counts = {
                active: 0,
                completed: 0,
                paused: 0
            }

            // Aggregate data
            hustles?.forEach((hustle: any) => {
                // Normalize status to lower case just in case
                const status = hustle.status.toLowerCase()
                
                if (status === 'active') counts.active++
                else if (status === 'completed') counts.completed++
                else if (status === 'paused') counts.paused++
            })
            
            // Format data for Pie/Donut (which visually mimics a Stacked Radial)
            const formattedData = [
                { status: "completed", count: counts.completed, fill: "var(--color-completed)" },
                { status: "active", count: counts.active, fill: "var(--color-active)" },
                { status: "paused", count: counts.paused, fill: "var(--color-paused)" },
            ]

            setData(formattedData)
        }
        loadData()
    }, [])
    
    return { data }
}
