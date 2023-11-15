import { createClient } from "@supabase/supabase-js"

function uniqid(prefix = "", random = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, "").padEnd(14, "0");
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ""}`;
};

export async function createLobby(LobbyName) {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { error } = await supabase
        .from('SelectionLobbies')
        .insert({ id: uniqid(), name: LobbyName })

    if (error) {
        console.error(error)
        return false
    } else {
        console.log("Game created")
        return true
    }
}

export async function joinLobby(LobbyName, PlayerName, PlayerColor) {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data } = await supabase.from('SelectionLobbies')
        .select('id')
        .eq('name', LobbyName)

    if (data.length === 0) {
        console.error("Game not found")
        return false
    } else if (data.length > 1) {
        console.error("Multiple games of same name found")
        return false
    } else {
        console.log("Game found", data[0].id)

        const { error } = await supabase
            .from('SelectionPlayers')
            .insert({ gameID: data[0].id, name: PlayerName, color: PlayerColor })
        if (error) {
            console.error(error)
            return false
        } else {
            console.log("Game created")
            return true
        }

    }
}

export async function getLobby(LobbyID) {

    const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxbmVnd2hxdnFrcXFva2ZlenhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4ODE0NTEsImV4cCI6MjAwNjQ1NzQ1MX0.t9fYQQ_KzxGr_FGU7JNtndiHLI3nGjRdINhbQbg11CY"

    const options = {
        auth: {
            persistSession: false
        }
    }
    const supabase = createClient('https://eqnegwhqvqkqqokfezxc.supabase.co', PUBLIC_KEY, options)

    const { data } = await supabase.from('SelectionLobbies')
        .select('*')
        .eq('id', LobbyID)

    if (data.length === 0) {
        console.error("Game not found")
        return false
    } else if (data.length > 1) {
        console.error("Multiple games of same name found")
        return false
    } else {

        const players = await supabase.from('SelectionPlayers')
            .select('name, color, playerID')
            .eq('gameID', LobbyID)
        
        let output = data[0]
        output.players = players.data

        return output
    }
}