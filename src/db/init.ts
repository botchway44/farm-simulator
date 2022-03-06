import { Building } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Building.sync({ alter: isDev })
}
export default dbInit 