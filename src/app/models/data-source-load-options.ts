export interface DataSourceLoadOptions {
    skip: number,
    take: number,
    requireTotalCount: boolean,
    filter: string[][],
    sort: SortDefinition[]
}

export interface SortDefinition {
    selector: string;
    desc: boolean
}