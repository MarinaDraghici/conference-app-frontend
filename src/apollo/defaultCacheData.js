//import { DashboardSharp } from '@material-ui/icons'
import { emptyObject} from 'utils/constants'
import { emailKey } from './cacheKeyFunctions'

// eslint-disable-next-line no-unused-vars
const yourEntityDefaultListFilter = emptyObject

const defaultEmail = {email: "admin@totalsoft.ro"}

export const defaults = {
  [emailKey]: defaultEmail
}
