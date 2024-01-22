import { createClient } from "@supabase/supabase-js"

export async function getRandomAlien() {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data } = await supabase.rpc('getrandomaliens')
        .select('aliendata')
        .limit(1)
        .single()

    return data.aliendata
}

export async function getAlien(index) {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    if (index.match(/^\d+$/)) {
        const { data } = await supabase
            .from('Aliens')
            .select('alienData')
            .eq('id', index)
            .eq('viewable', true)
            .limit(1)
            .single()
            return data.alienData
    } else {
        const { data } = await supabase
            .from('Aliens')
            .select('alienData')
            .eq('alienData->original->>name', index.replaceAll('_', ' ').replace('-AT', ''))
            .eq('viewable', true)
            .or(`alienData->original->altTimeline.eq.${index.replaceAll('_', ' ').includes('-AT') ? 'true' : 'false,alienData->original->altTimeline.is.null'}`)
            .limit(1)
            .single()
            return data.alienData
    }

}

export async function getAllAliens() {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data } = await supabase
        .from('Aliens')
        .select('id, alienData')
        .eq('viewable', true)

    const outputData = Object.fromEntries(data.map((alien) => [alien.id, alien.alienData]))
    // console.log(outputData)

    return outputData
}