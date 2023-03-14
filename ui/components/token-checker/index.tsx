import { useState } from "react"

import styles from './style.module.scss'
// Dfinity
import { makeTokenActor } from "../../service/actor-locator"
import { Principal } from "@dfinity/principal"
import ProofCard from "../proof-card"

export const TokenCheckerSection = () => {
  const [userTokens, setUserTokens] = useState([])
  const [userAddress, setUserAddress] = useState("")

  const checkMetadata = async () => {
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
      const tokenTitle = new TextDecoder().decode(token.Ok[0].data)
      console.log({ tokenTitle });
      console.log({ token });

      const description = token.Ok[0].key_val_data.find(obj => obj.key === 'description')?.val?.TextContent;
      const content = token.Ok[0].key_val_data.find(obj => obj.key === 'content')?.val?.TextContent;
      const tag = token.Ok[0].key_val_data.find(obj => obj.key === 'tag')?.val?.TextContent;
      console.log({ content });
      return {
        title: tokenTitle,
        description,
        tag,
        content,
      }
    })

    console.log({ forDisplay })
    setUserTokens(forDisplay)

  }

  return (
    <div className={styles.component}>
      <section className={styles.sidebar}>
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
      <section className={styles.grid}>
        {userTokens.map(token => {
          return (
            <ProofCard title={token.title} description={token.description} content={token.content} tag={token.tag} />
          )
        })}
      </section>
    </div>
  )
}
