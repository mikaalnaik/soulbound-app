/* eslint-disable @next/next/no-img-element */
// Next, React
import Head from "next/head"

import styles from "../../ui/styles/Home.module.css"

import { AuthClient } from "@dfinity/auth-client"
import { useState } from "react"
import { Actor, HttpAgent } from "@dfinity/agent"

function AdminPage() {
  const [authSuccess, setAuthSuccess] = useState(null)

  const auth = async () => {
    const authClient = await AuthClient.create()
    authClient.login({
      identityProvider: process.env.NEXT_PUBLIC_II_CANISTER_ADDRESS,
      onSuccess: async () => {
        console.log('howdy folks');
        setAuthSuccess(true)
      }
    })
  }

  const webapp_id = process.env.NEXT_PUBLIC_II_CANISTER_ID;

  // The interface of the whoami canister
  const webapp_idl = ({ IDL }) => {
    return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
  };
  const init = ({ IDL }) => {
    return [];
  };


  const check = async () => {
    // Get the identity from the auth client:
    const authClient = await AuthClient.create()
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({ identity });
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    const webapp = Actor.createActor(webapp_idl, {
      agent,
      canisterId: webapp_id,
    });
    // Call whoami which returns the principal (user id) of the current user.
    // const principal = await webapp.whoami();
    // console.log({ principal });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>Soulbound Tokens</h3>
        <button onClick={auth}>Authenticate: {authSuccess}</button>
        <button onClick={check}>Check</button>
      </main>
    </div>
  )
}

export default AdminPage
