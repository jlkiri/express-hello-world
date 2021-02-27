const express = require("express")
const redis = require("redis")
const client = redis.createClient()

client.on("error", function (err) {
  console.log("Error " + err)
})

client.set("string key", "string val", redis.print)
client.hset("hash key", "hashtest 1", "some value", redis.print)
client.hset(["hash key", "hashtest 2", "some other value"], redis.print)

client.hkeys("hash key", function (err, replies) {
  console.log(replies.length + " replies:")

  replies.forEach(function (reply, i) {
    console.log("    " + i + ": " + reply)
  })

  // client.quit()
})

const app = express()
const port = process.env.PORT || 3001

app.get("/", (req, res) => res.send(client.get("string key")))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
