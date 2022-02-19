import mongoose from "mongoose"

function initMongoStore() {
  return mongoose.connect(process.env.MONGO_URI)
}

export { initMongoStore }
