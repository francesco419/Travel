import styles from "./MainPage.module.css";

export default function Recommend() {
  const arr = [
    {
      id: 0,
      name: "France",
      url: "https://i.pinimg.com/564x/44/03/f0/4403f0a973a39baf1c5fca1165f85b68.jpg",
    },
    {
      id: 1,
      name: "South Africa",
      url: "https://i.pinimg.com/564x/e4/e3/fe/e4e3fe89578999f340b6cccbec517c44.jpg",
    },
    {
      id: 2,
      name: "Japan",
      url: "https://i.pinimg.com/564x/6c/99/87/6c99874bc01b851e6db5b02d3aabe613.jpg",
    },
    {
      id: 3,
      name: "USA",
      url: "https://i.pinimg.com/564x/c6/81/f8/c681f8ef410c1d7e33361984204f7aaf.jpg",
    },
  ];

  return (
    <div className={styles["main-second"]}>
      <hr />
      <div className={styles["block-second"]}>
        <ul>
          <ol style={{ backgroundColor: `var(--color-tomato)` }}>
            <li>
              <p>Recommend</p>
              <p>Country</p>
              <p>{`->`}</p>
            </li>
          </ol>
          {arr.map((data, index) => (
            <ol
              style={{ backgroundImage: `url(${data.url})` }}
              key={`recommend_${index}`}
            >
              <li>
                <p>{data.name}</p>
              </li>
              <li>
                <p>See Detail</p>
              </li>
            </ol>
          ))}
        </ul>
      </div>
      <hr />
    </div>
  );
}
