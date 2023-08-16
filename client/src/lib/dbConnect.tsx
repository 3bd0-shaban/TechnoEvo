import { connect, connection } from 'mongoose'
const MONGO_URI = process.env.NEXT_PUBLIC_GRAPHBASE_DB_URL

const options: any = {
    useUnifiedTopology: true,

    useNewUrlParser: true
}

export const dbConnect = async () => {
    if (!connection.readyState) {
        connect(MONGO_URI).then(() => {
            console.log('Connecting to ', MONGO_URI)
        })
            .catch((error) => {
                console.log('error while connecting', error)
            })
    }
}
