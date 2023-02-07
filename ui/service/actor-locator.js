import {
  createActor as createHelloActor,
  canisterId as helloCanisterId
} from "../declarations/hello"

import {
  createActor as createImageActor,
  canisterId as imageCanisterId
} from "../declarations/image"

import {
  createActor as createTokenActor,
  canisterId as tokenCansisterId
} from "../declarations/token"

export const makeActor = (canisterId, createActor) => {
  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST
    }
  })
}

export function makeHelloActor() {
  return makeActor(helloCanisterId, createHelloActor)
}

export function makeImageActor() {
  return makeActor(imageCanisterId, createImageActor)
}

export function makeTokenActor() {
  return makeActor(tokenCansisterId, createTokenActor)
}
