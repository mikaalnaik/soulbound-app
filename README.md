# Soulbound Tokens on Internet Computer with Next.js

This project provides a start template for minting Soulbound Tokens using Next.js framework as frontend.

**Backend**
- A simple greeting hello world canister written in Motoko
- ImageBucket canister written in Motoko with create image, delete image and getImageById

**Frontend**

- A simple React HTML form with name input, sending it to greet canister and showing the returned result
- An Image Upload HTML form with Pick an Image button, upload the image to image canister, loading the image back from the canister and display it using useImageObject React Hook


Local Deployment

- run `sh scripts/build.sh`
- run `dfx deploy frontend`



## Quick Start (Run locally)

Install:

- NodeJS 16.\* or higher https://nodejs.org/en/download/
- Internet Computer dfx CLI https://smartcontracts.org/docs/current/developer-docs/quickstart/local-quickstart/
- Visual Studio Code (Recommended Code Editor) https://code.visualstudio.com/Download
- VSCode extension - Motoko (Recommended) https://marketplace.visualstudio.com/items?itemName=dfinity-foundation.vscode-motoko

```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Clone this Git repository:

```bash
git clone https://github.com/dappblock/nextjs-ic-starter
```

Open command terminal:
Enter the commands to start dfx local server in background:

```bash
cd nextjs-ic-starter
dfx start --background
```

Note: If you run it in MacOS, you may be asked to allow connections from dfx local server.

Enter the commands to install dependencies, deploy canister and run Next.js dev server:

```bash
npm install
dfx deploy
npm run dev
```

Open in Chrome the following URL to try the demo app:  
http://localhost:3000/

Cleanup - stop dfx server running in background:

```bash
dfx stop
```

## Project Structure

Internet Computer has the concept of [Canister](https://smartcontracts.org/docs/current/concepts/canisters-code/) which is a computation unit. This project has 3 canisters:

- hello (backend)
- image (backend)
- hello_assets (frontend)

Canister configurations are stored in dfx.json.

### Backend

Backend code is inside /backend/ written in [Motoko language](https://smartcontracts.org/docs/current/developer-docs/build/languages/motoko/). Motoko is a type-safe language with modern language features like async/await and actor build-in. It also has [Orthogonal persistence](https://smartcontracts.org/docs/current/developer-docs/build/languages/motoko/#orthogonal-persistence) which I find very interesting.

Image canister is introduced from release v0.2.0. It makes use of orthogonal persistence through stable variables and provides functions for create, delete and get image. See /backend/service/Image.mo.

### Frontend

Frontend code follows Next.js folder convention with /pages storing all React code, /public storing static files including images. This project uses CSS modules for styling which is stored in /ui/styles. React Components are stored in /ui/components

Entry page code is inside /pages/index.js where the magic starts. With the generated code inside /.dfx, frontend can use RPC style call to server side actor and its functions without worrying about HTTP request and response parsing.

Starting with DFX 0.8.0, we start using the DFX generated front end code located in .dfx/local/canisters/hello/index.js and adapt it to work with Next.js. The adapted code is in ui/declaration/hello/index.js .

We use a service locator pattern through actor-locator.js that will handle the dfx agent host using env var NEXT_PUBLIC_IC_HOST.

Creating hello actor:

```javascript
import { makeHelloActor } from "../ui/service/actor-adapter"
const hello = makeHelloActor()
```

Calling hello actor:

```javascript
const greeting = await hello.greet(name)
```

The beautiful part is you can invoke the hello actor greet function with async/await style as if they are on the same platform. For details, see React Components GreetingSection.js and ImageSection.js in /ui/components/.

Webpack configuration:  
In Next.js, it's located in next.config.js.

## React Hook

By using React Hook with actor UI declaration, it can greatly simplify frontend dev. It encourages component based composable logic. A great example is useImageObject.js React Hook in /ui/hooks. Given an imageId, useImageObject can load the image binary and convert it to a HTML image source object ready for use in <img>.

If you look closer, useImageObject.js depends on image-serivce.js which depends on actor-locator.js. When you open ImageSection.js, you can find how useImageObject is being used to greatly reduce the complexity and the underlying calls with Canister. This is the pattern I used very often in my Content Fly Dapp project.

## Backend dev

After marking changes in backend code e.g main.mo in /backend/service/hello, you can deploy it to the local DFX server using:

```bash
dfx deploy hello
```

**hello** is the backend canister name defined in dfx.json.

## Frontend dev - Next.js Static Code

Next.js developers are familiar with the handy hot code deployed in the Next.js dev environment when making changes in frontend code.

After deploying your backend code as shown above, you can run Next.js local dev server **npm run dev** and edit your frontend code with all the benefits of hot code deploy.

One thing to note is we use Next.js static code export here for hosting in Internet Computer so we can't use any features of Next.js that require server side NodeJS. Potentially, there might be ways to use Internet Computer canister as backend while deploying Next.js dapp to a hosting like Vercel that supports NodeJS server in the future. Further research is needed on that aspect. However, if you do want to run everything decentralized on blockchain including the frontend, you would want to deploy the exported static code to Internet Computer as well.

## Deploy and run frontend in local DFX server

In order to simulate the whole Internet Computer experience, you can deploy and run frontend code to local DFX server by running:

```bash
dfx start --background
npm run build
dfx deploy hello_assets
```

**hello_assets** is the frontend canister defined in dfx.json.

**npm run build** builds and export Next.js as static code storing in **/out** folder which would be picked up by **dfx deploy hello_assets** as defined in dfx.json with **/out** as the source.

When it completes, you can open Chrome and browse to:  
http://localhost:8000/?canisterId=[canisterId]

Replace [canisterId] with the hello_assets canister ID which you can find by running:

```bash
dfx canister id hello_assets
```

## Environment Configuration

There are three key configs following Next.js [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables) configuration:

**.env.development** stores configs for use in local dev.

```
NEXT_PUBLIC_IC_HOST=http://localhost:8000
```

**.env.production** is used when building and exporting static code using **npm run build**

```
NEXT_PUBLIC_IC_HOST=http://localhost:8000
```

Notice both files are identical if we want the Next.js dapp to interact with the local dfx server.

Note **NEXT_PUBLIC** is the prefix used by Next.js to make env vars available to client side code through [build time inlining](https://nextjs.org/docs/basic-features/environment-variables).

**.env.ic** is included for deployment to Internet Computer ic network which would be covered below.




## Author

Mikaal Naik
Twitter: @mikaalnaik

## Contributing

Please feel free to raise an issue or submit a pull request.

## License

MIT
