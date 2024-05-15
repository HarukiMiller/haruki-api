import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { load } from "cheerio";
import { json } from 'stream/consumers';

@Injectable()
export class MackolikService {
    async getEventList(): Promise<any> {
        const url = `https://arsiv.mackolik.com/Iddaa-Programi`;
        try {
            const response = await axios.get(url);
            const htmlText = response.data;
            const $ = load(htmlText);

            const groups = [];
            const tableBody = $('#iddaa-tab-body tbody')
            $(tableBody).find('tr.iddaa-oyna-title').each((index, parent) => {
                const parentHTML = $(parent).find('td').contents().filter(function () {
                    return this.nodeType === 3; // Filter only text nodes
                }).text().trim();;
                const children = $(parent).nextUntil('tr.iddaa-oyna-title').filter('tr#Tr2')
                .map((index, child) => parseInt($(child).find('td').last().find('a').attr('class').match(/\d+/)[0])).get();
                groups.push({
                    parent: parentHTML,
                    children: children,
                });
            });
            console.log(groups)
            return groups
            // const divsWithClassAll = $(tableBody).find('tr.iddaa-oyna-title')//$('a.all[class]');
            // console.log(divsWithClassAll.length)
        }
        catch (error) {
            console.log(error)
        }
        return null;
    }
    async getMatchesForEvent(eventNumber : number): Promise<any> {
        const url = `https://arsiv.mackolik.com/AjaxHandlers/IddaaHandler.aspx?command=morebets&mac=${eventNumber}&type=ByLeague`;
        try {
            const response = await axios.get(url);
            let htmlText = response.data;
            htmlText = htmlText.replace("Match:",`"Match":`).replace("Event:",`"Event":`)
            let resultObject = JSON.parse(htmlText)
            resultObject = resultObject.Event.Markets.map(market=>{
                return {
                    MarketName: market.MarketType.Name,
                    Outcomes: market.Outcomes.map(outcome=>{
                        return {
                            Name:outcome.OutcomeName,
                            Odd:outcome.Odd
                        }
                    })
                }
            })
            return resultObject
        }
        catch (error) {
            console.log(error)
        }
        return null;
    }
    
}
