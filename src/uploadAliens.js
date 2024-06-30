Aliens = require('./dataFiles/aliens.json');
Supabase = require('@supabase/supabase-js')

async function uploadAliens() {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = Supabase.createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)
    const { data, error1 } = await supabase.auth.signInWithPassword({
        email: 'jumbocarrot0@gmail.com',
        password: 'QwsK8lSSW8IoEPvL'
    })

    // console.log(data)
    // console.log(error1)
    // console.log(data)

    // console.log(Object.keys(Aliens.aliens))
    // const { data4, error4 } = await supabase
    //     .from('Aliens')
    //     .insert({ id: 240, alienData: Aliens.aliens["1"], viewable: true })

    // console.log(data4, error4)

    // console.log(Object.keys(Aliens.aliens).map((index) => { return { id: index, alienData: Aliens.aliens[index], viewable: true }}))

    const { data2, error2 } = await supabase
        .from('Aliens')
        .insert(Object.keys(Aliens.aliens).map((index) => { return { id: index, alienData: Aliens.aliens[index], viewable: true }}))

    // console.log(data2, error2)

    const currentSession = await supabase.auth.getSession()
    console.log(currentSession)

    const { error3 } = await supabase.auth.signOut()
}

uploadAliens()
