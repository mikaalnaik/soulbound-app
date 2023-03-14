import Head from "next/head"
import { TokenCheckerSection } from "../ui/components/token-checker"
import styles from "../ui/styles/Home.module.css"

function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h6 className={styles.title}>Thentic</h6>
        <TokenCheckerSection />
      </main>
    </div>
  )
}

export default HomePage
