import { map, get, has, filter, isObject } from 'lodash'

export default function getOpReturn(tx) {
    let res = filter(
        map(tx.outputs, (out) => {
            if (has(out, 'data_hex')) {
                return {
                    hex: out.data_hex,
                    string: out.data_string,
                }
            }
        }), isObject)[0]
    return res
}
