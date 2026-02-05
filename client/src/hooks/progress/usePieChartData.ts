import { useState, useEffect } from 'react'
import { supabase } from '../../client'
import { useUserId } from '../global/UserId'

export interface PieChartDataPoint {
    month: string;
    desktop: number;
    fill: string;
}

export default function usePieChartData(){
    const [data, setData] = useState<PieChartDataPoint[]>([])
    
    useEffect(() => {
        async function loadData(){
            // Get User
            const { data: userData } = await useUserId()

            // Fetch all hustles
            const { data: hustles } = await supabase
                .from('hustles')
                .select('created_at')
                .eq('user_id', userData?.[0])
                .order('created_at', { ascending: true })
                
            const MONTHS = [
                "january", "february", "march", "april", "may", "june",
                "july", "august", "september", "october", "november", "december"
            ];

            const counts : any = {}
            MONTHS.forEach(m => counts[m] = 0)

            hustles?.forEach(hustle => {
                const dateObj = new Date(hustle.created_at);
                const monthIndex = dateObj.getMonth()
                const monthName = MONTHS[monthIndex];

                counts[monthName] += 1
            })

            const formattedData = MONTHS.map(month => ({
                month: month,
                desktop: counts[month],
                fill: `var(--color-${month})`
            }));

            setData(formattedData)
        }
        loadData()
    }, [])
    
    return { data }
}