#!/usr/bin/env node

const axios = require('axios')
const colors = require('colors')

const API_KEY = '5400ea2acd79fe57afde50615790f1afcbb14'
const URL_TO_SHORTEN = process.argv[2]
const SHOULD_COPY_RESULT_TO_CLIPBOARD = process.argv[3] == 'clip'

if (URL_TO_SHORTEN == undefined) {
    console.error('Без ссылки меня вызывать не нужно. Отстань.') //'Link to shorten is required!'
    process.exit(1)
}

console.log(`Выходит, ты хочешь сократить ${URL_TO_SHORTEN.brightCyan}? Хм...`) //`Url to shorten: ${URL_TO_SHORTEN}`

shortenUrl(API_KEY, URL_TO_SHORTEN)
    .then(shortLink => {
        console.log(`Так уж и быть, держи: ${shortLink.yellow}`) // Short link
        copyShortLinkToClipboardIfRequired(shortLink)
    }).catch(err => {
        console.error(err)
    })

async function shortenUrl(apiKey, urlToShorten) {
    return axios
        .get(`https://cutt.ly/api/api.php?key=${apiKey}&short=${urlToShorten}`)
        .then(res => {
            //console.log(res)//
            const url = res.data.url
            const status = url.status
            if (status == 7) {
                return url.shortLink
            }
            if (status == 2) {
                return Promise.reject('Так это же какая-то хуйня, а не ссылка. Передай мне ссылку или иди в задницу!')
            }
            return Promise.reject(`Error with code ${status} occurred`)
        })
}

function copyShortLinkToClipboardIfRequired(link) {
//    if (SHOULD_COPY_RESULT_TO_CLIPBOARD)
//        clipboardy.writeSync(link)
}

//cuttly.shortenUrl(
//    API_KEY,
//    URL_TO_SHORTEN
//).then(res => {
//    console.log(response)
//}).catch(err => {
//    console.error('Some error: ', err)
//})
