import styles from './style.module.scss';

const ProofCard = ({ title, content, tag, description }) => {
  return (
    <div className={styles.component}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.description}>
        {description}
      </div>

      <div className={styles.title}>
        {content}
      </div>

      <div className={styles.tag}>
        {tag}
      </div>
    </div>
  )
}

export default ProofCard