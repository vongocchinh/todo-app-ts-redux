type countActionNumber = {
    type: string,
    payload: number
}

type countActionObject = {
    type: string,
    payload: ProductModel
}
type countAction = { type: string, payload: number[] }

export type ActionThunk = countAction | countActionNumber | countActionObject