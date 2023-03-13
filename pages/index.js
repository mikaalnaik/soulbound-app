import Head from "next/head"
import { GreetingSection } from "../ui/components/GreetingSection"
import styles from "../ui/styles/Home.module.css"

function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>Soulbound Tokens</h3>
        <GreetingSection />
      </main>
    </div>
  )
}

export default HomePage
