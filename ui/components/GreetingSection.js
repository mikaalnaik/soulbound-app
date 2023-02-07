import { useState } from "react"

// Dfinity
import { makeHelloActor } from "../service/actor-locator"
import { makeTokenActor } from "../service/actor-locator"
import { Principal } from "@dfinity/principal"

export const GreetingSection = () => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState("")
  const [greetingMessage, setGreetingMessage] = useState("")

  const [userAddress, setUserAddress] = useState("")

  function onChangeName(e) {
    const newName = e.target.value
    setName(newName)
  }

  async function sayGreeting() {
    setGreetingMessage("")
    setLoading("Loading...")

    // const helloActor = makeHelloActor()
    // const greeting = await helloActor.howdy(name)

    const tokenActor = makeTokenActor()
    const test = await tokenActor.getMetadataForUserDip721("sdfs")
    // const tokenName = await tokenActor.nameDip721("sdfs")
    console.log({ tokenName })

    setLoading("")
    setGreetingMessage(tokenName)
  }

  const checkMetadata = async () => {
    const tokenActor = makeTokenActor()
    const test = await tokenActor.getMetadataForUserDip721(
      Principal.fromText(userAddress)
    )

    const totalSupply = await tokenActor.logoDip721()
    console.log({ totalSupply })
    console.log({ test })
  }

  return (
    <div>
      <section>
        <h2>Greeting</h2>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={onChangeName}
        />
        <button onClick={sayGreeting}>Send</button>
      </section>
      <section>
        <h2>Get Metadata for User</h2>
        <label htmlFor="name">Enter your address: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
        <button onClick={checkMetadata}>Send</button>
      </section>
      <section>
        <label>Response: &nbsp;</label>
        {loading}
        {greetingMessage}
      </section>
    </div>
  )
}
