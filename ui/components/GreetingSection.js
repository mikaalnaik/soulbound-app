import { useState } from "react"

// Dfinity
import { makeTokenActor } from "../service/actor-locator"
import { Principal } from "@dfinity/principal"

export const GreetingSection = () => {
  const [loading, setLoading] = useState("")
  const [userTokens, setUserTokens] = useState([])
  const [userAddress, setUserAddress] = useState("")

  const checkMetadata = async () => {
    setLoading(true)
    const tokenActor = makeTokenActor()
    const tokenIDsBigInts = await tokenActor.getTokenIdsForUserDip721(
      Principal.fromText(userAddress)
    )
    const x = new BigUint64Array(tokenIDsBigInts)
    const tokenIDs = x.reduce((accum, tokenID) => {
      accum = [...accum, Number(tokenID)]
      return accum
    }, [])
    const tokenPromise = tokenIDs.map(async id => {
      return await tokenActor.getMetadataDip721(id)
    })

    const tokens = await Promise.all(tokenPromise)

    console.log({ tokens })

    const forDisplay = tokens.map(token => {
      return {
        description: token.Ok[0].key_val_data[0].val.TextContent,
        tag: token.Ok[0].key_val_data[1].val.TextContent
      }
    })

    console.log({ forDisplay })
    setUserTokens(forDisplay)

    setLoading(false)
  }

  return (
    <div>
      <section>
        <h2>Get Tokens</h2>
        <label htmlFor="name">Enter address: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          placeholder="User Address"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
        <button onClick={checkMetadata}>Send</button>
      </section>
      <section>
        {loading}
        {userTokens.map(token => {
          return (
            <div>
              <h1> {token.description}</h1>
              <h2> {token.tag}</h2>
            </div>
          )
        })}
      </section>
    </div>
  )
}
