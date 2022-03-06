import { Building, Unit } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Building.sync({ alter: isDev })
    Unit.sync({ alter: isDev })
}
export default dbInit 