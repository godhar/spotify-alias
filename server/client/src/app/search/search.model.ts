export class SearchResult {
  
    constructor(public type: string, public name: string, public href: string, public img?:{}[], public totalTracks?: number){}
}

export class Query {

    constructor(public query: string, public type: string){}
}