import express from "express"
import cors from "cors"
import { convertHourStringToMinutes } from './utils/convert-hours-to-minutes'
import { PrismaClient } from '@prisma/client'

const app = express()
app.use(cors())
app.use(express.json())

const prisma = new PrismaClient()

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include : {
            _count: {
                select : {
                    ads: true
                }
            }
        }
    })
    
    return res.json(games)
})

app.post("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id
    const body : any = req.body

    const ad = await prisma.ad.create({
        data : {
            gameId :gameId,
            name : body.name,
            yearsPlaying : body.yearsPlaying,
            discord : body.discord,
            weekDays : body.weekDays,
            hourStart : convertHourStringToMinutes(body.hourStart),
            hourEnd : convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel : body.useVoiceChannel
        }
    })

    return res.json(ad)
})

app.get("/games/:id/ads",async (req, res) => {
    const gameId = req.params.id

    const ads = await prisma.ad.findMany({ 
        select : {
            id : true,
            name : true,
            weekDays : true,
            useVoiceChannel : true,
            yearsPlaying : true, 
            hourEnd : true,
            hourStart : true
        },
        where : {
            gameId 
        },
        orderBy : {
            createdAt : 'desc'
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad, 
            weekDays : ad.weekDays.split(',')
        }
    }))
})

app.get("/ads/:id/discord", async (req, res) => {

    const adId = req.params.id

    const ad = await prisma.ad.findFirstOrThrow({
        select : {
            discord: true
        },
        where :{ 
            id : adId
        }
    })

    return res.json({
        discord : ad.discord
    })
})

app.listen("3000")