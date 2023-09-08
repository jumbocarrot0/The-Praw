import { createClient } from "@supabase/supabase-js"

export async function getRandomCombo() {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data, error } = await supabase.rpc('getrandomcombos')
        .eq('viewable', true)
        .limit(1)
        .single()

    // console.log(data)
    // console.log(error)

    return data
}

export async function getCombo(id) {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data, error } = await supabase.from('Combos')
        .select('*')
        .eq('viewable', true)
        .eq('id', id)
        .limit(1)
        .single()

    // console.log(data)
    // console.log(error)

    return data
}

export async function getAllCombos() {
    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data, error } = await supabase.from('Combos')
        .select('*')
        .eq('viewable', true)

    // console.log(data)
    // console.log(error)

    return data
}

export async function uploadCombo(ComboName, ComboAuthor, ComboAliens) {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)
    // const { data, error1 } = await supabase.auth.signInWithPassword({
    //     email: '',
    //     password: ''
    // })

    // console.log(data)
    // console.log(error1)
    // console.log(data)

    const { data, error } = await supabase
        .from('Combos')
        .insert({ name: ComboName, author: ComboAuthor, viewable: false, 
            alien1: ComboAliens[0],
            alien2: ComboAliens[1],
            alien3: ComboAliens[2],
            alien4: ComboAliens[3],
            alien5: ComboAliens[4],
            alien6: ComboAliens[5],
            alien7: ComboAliens[6],
            alien8: ComboAliens[7],
        })

    console.log(data, error)

    // console.log(Object.keys(Aliens.aliens).map((index) => { return { id: index, alienData: Aliens.aliens[index], viewable: true }}))

    // const { data2, error2 } = await supabase
    //     .from('Aliens')
    //     .insert(Object.keys(Aliens.aliens).map((index) => { return { id: index, alienData: Aliens.aliens[index], viewable: true }}))

    // console.log(data2, error2)

    // const currentSession = await supabase.auth.getSession()
    // console.log(currentSession)

    // const { error3 } = await supabase.auth.signOut()
}