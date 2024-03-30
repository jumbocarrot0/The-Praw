import { createClient } from "@supabase/supabase-js"
import Revisions from "../dataFiles/revisions.json"
import RevisionNotes from "../dataFiles/revisionNotes.json"
import faq from "../dataFiles/faq.json"

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

    const { data } = await supabase
        .from('Aliens')
        .select('alienData -> original')
        .eq('id', index)
        .eq('viewable', true)
        .limit(1)
        .single()

    console.log(data.original)

    const fields = ['powerName', 'short', 'powerBody', 'wildBody', 'superBody', 'wildClassicBody', 'superClassicBody', 'history', "gameSetup", "bans"].filter(field => Object.keys(data.original).includes(field) || field === "bans")
    // console.log(fields)
    for (const field of fields) {
        if (field === "bans") {
            data.original[field] = Object.keys(data.original[field] ?? []).map(id => { return { style: {}, value: { id: id, name: data.original[field][id] } } })
        } else {
            data.original[field] = [{ value: data.original[field], style: {} }]
        }
        if (Revisions[index] && Revisions[index][field]) {
            data.original[field] = Revisions[index][field]
            if (RevisionNotes[index]) {
                data.original[field].forEach((revision, i) => {
                    Revisions[index][field][i].revisionNote = RevisionNotes[index][revision?.revisionID]
                })
            }
        }
    }
    const timingFields = ['powerTiming', 'wildTiming', 'superTiming', 'wildClassicTiming', 'superClassicTiming'].filter(field => Object.keys(data.original).includes(field))
    for (const field of timingFields) {
        if (Revisions[index] && Revisions[index][field]) {
            for (const timing_field of ['player', 'choice', 'phases']) {
                if (Revisions[index][field][timing_field]) {
                    data.original[field][timing_field] = Revisions[index][field][timing_field]
                    if (RevisionNotes[index]) {
                        data.original[field][timing_field].forEach((revision, i) => {
                            Revisions[index][field][timing_field][i].revisionNote = RevisionNotes[index][revision?.revisionID]
                        })
                    }
                } else if (data.original[field][timing_field]) {
                    data.original[field][timing_field] = [{ style: [], value: data.original[field][timing_field] }]
                }
            }
        } else {
            for (const timing_field of ['player', 'choice', 'phases']) {
                if (data.original[field][timing_field]) {
                    data.original[field][timing_field] = [{ style: [], value: data.original[field][timing_field] }]
                }
            }
        }
    }
    if (Revisions[index]) {
        data.original.versions = Revisions[index].versions
    } else {
        data.original.versions = ["original"]
    }

    if (faq.aliens[index]) {
        data.original.faq = faq.aliens[index]
    } else {
        data.original.faq = []
    }

    console.log(data.original)

    return data.original
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