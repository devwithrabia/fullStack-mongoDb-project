const { default: mongoose } = require('mongoose')

const connection: any = {}

export const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log('using existing connection')

      return
    }

    const db = await mongoose.connect(process.env.MONGO)

    connection.isConnected = db.connections[0].readyState
  } catch (err: any) {
    console.log(err)

    throw new Error(err)
  }
}
