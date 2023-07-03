// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

export default function Product() {
  return (
    <main className={styles.pricing}>
      <PageNav />
      <section className={styles.pricingDesign}>
        <section className={styles["design-content"]} id="section--3">
          {/* <!-- Design Content Images--> */}
          <div className={styles["design-content__images"]}>
            <img
              src="/design1.jpg"
              alt=""
              className={styles["design-content__images--1"]}
            />
            <img
              src="/design2.jpg"
              alt=""
              className={styles["design-content__images--2"]}
            />
          </div>

          <div className={styles["design-content__information"]}>
            <h2 className={styles["design-content__information--title"]}>
              Simple pricing.<span>Just $9/month.</span>
            </h2>
            <p className={styles["design-content__information--paragraph"]}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae maiores similique assumenda deleniti! Impedit doloribus
              adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
            <img
              src="/design4.jpg"
              alt=""
              className={styles["design-content__information--img"]}
            />
          </div>
        </section>
        {/* <!------------------------- Design Text Section ------------------------> */}
        <section className={styles["design-text"]}>
          <div className={styles["design-text__heading"]}>
            <h2 className={styles["design-text__heading--title"]}>Pricing</h2>
          </div>
        </section>
      </section>
    </main>
  );
}
