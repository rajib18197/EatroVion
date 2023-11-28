import { useSelector } from "react-redux";
import { getCitiesState } from "../cities/citiesSlice";
import styles from "./Stats.module.css";

export default function Stats() {
  const cities = useSelector(getCitiesState);
  const masterpiece = cities.filter((city) => city.masterpiece);
  const totalExpenses = cities.reduce(
    (acc, cur) => acc + Number(cur.expense),
    0
  );

  const years = cities.reduce((acc, cur) => {
    const year = new Date(cur.date).getFullYear();
    console.log(year, cur.date);

    if (acc[year]) {
      acc[year]++;
    } else {
      acc[year] = 1;
    }
    return acc;
  }, {});

  console.log(years);
  return (
    <div className={styles.stats}>
      <StatItem>
        <h3>Until Now Visited {cities.length} restaurants</h3>
      </StatItem>
      <StatItem>
        <h3>{masterpiece.length} of them are absolute masterpiece</h3>
      </StatItem>
      <StatItem>
        <h3>
          Total Expenses -{">"} €{totalExpenses}
        </h3>
      </StatItem>
      <StatItem>
        <h3>Your Dining Odyssey: Annual Restaurant Visits</h3>
        <div className={styles.years}>
          {Object.keys(years).map((el) => (
            <h3 key={el}>
              {el}: {years[el]} restaurants
            </h3>
          ))}
        </div>
      </StatItem>
    </div>
  );
}

function StatItem({ children }) {
  return <div className={styles.statItem}>{children}</div>;
}

// "One of the most unexpected gifts you can receive is an early loss.

// Missing out on a job you really wanted.
// Trying a business idea that fails.
// Suffering a heartbreak.
// An early setback can become the catalyst for a wonderful next chapter—if you channel the emotion effectively.

// Disappointment is a hot burning fuel. Let it light your fire to become better."

// "You probably don't want maximum effectiveness.

// For example, the most effective way to make money likely requires a lifestyle you don't want to live. Instead, you want the most effective path that fits your desired lifestyle.

// How do you want to spend your days? Start there, then optimize."

// 5 ways to get more recognition as a developer:

// 1. Find a niche and go deep
// 2. Share your thoughts publicly
// 3. Start a blog about what you learn
// 4. Conduct a tech talk with your team
// 5. Find an open-source project to contribute to

// These will help prove that you're a knowledgeable developer and will get you the recognition you deserve.

// Try it.
