import styles from './bookmarks.module.css';

export default function Bookmarks() {
  return (
    <div className={styles.bookmarks_container}>
      <div className={styles.title}>Bookmarks</div>
      
      <div className={styles.recommendations}>
        <div className={styles.recommendation_tab}>
          <div className={styles.recommendation_tab_title}>
            Library Management System
          </div>
          <div className={styles.recommendation_tab_category}>
            Web Development
          </div>
          <div className={styles.recommendation_tab_description}>
            Build a fully functioning Library web 
            app using Javascript, C++, Python...
          </div>
        </div>
        <div className={styles.recommendation_tab}>
          <div className={styles.recommendation_tab_title}>
            Library Management System
          </div>
          <div className={styles.recommendation_tab_category}>
            Web Development
          </div>
          <div className={styles.recommendation_tab_description}>
            Build a fully functioning Library web 
            app using Javascript, C++, Python...
          </div>
        </div>
        <div className={styles.recommendation_tab}>
          <div className={styles.recommendation_tab_title}>
            Library Management System
          </div>
          <div className={styles.recommendation_tab_category}>
            Web Development
          </div>
          <div className={styles.recommendation_tab_description}>
            Build a fully functioning Library web app using Javascript, C++, Python...
          </div>
        </div>
        <div className={styles.recommendation_tab}>
          <div className={styles.recommendation_tab_title}>
            Library Management System
          </div>
          <div className={styles.recommendation_tab_category}>
            Web Development
          </div>
          <div className={styles.recommendation_tab_description}>
            Build a fully functioning Library web app using Javascript, C++, Python...
          </div>
        </div>
        <div className={styles.recommendation_tab}>
          <div className={styles.recommendation_tab_title}>
            Library Management System
          </div>
          <div className={styles.recommendation_tab_category}>
            Web Development
          </div>
          <div className={styles.recommendation_tab_description}>
            Build a fully functioning Library web app using Javascript, C++, Python...
          </div>
        </div>
      </div>
    </div>
  );
}