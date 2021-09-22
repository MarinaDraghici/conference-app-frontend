import { emptyArray, emptyObject, emptyString } from 'utils/constants'
import { emailKey } from './cacheKeyFunctions'

const yourEntityDefaultListFilter = emptyObject

const defaultEmail = {email: emptyString}

export const defaults = {
  [emailKey]: defaultEmail
}
