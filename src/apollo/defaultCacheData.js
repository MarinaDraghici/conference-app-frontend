import { DashboardSharp } from '@material-ui/icons'
import { emptyArray, emptyObject, emptyString } from 'utils/constants'
import { emailKey } from './cacheKeyFunctions'

const yourEntityDefaultListFilter = emptyObject

const defaultEmail = {email: "admin@totalsoft.ro"}

export const defaults = {
  [emailKey]: defaultEmail
}
