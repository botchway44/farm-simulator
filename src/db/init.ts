import { Building, Unit, FeedingQueue } from './models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Building.sync({ alter: isDev })
    Unit.sync({ alter: isDev })
    FeedingQueue.sync({ alter: isDev })
}
export default dbInit 