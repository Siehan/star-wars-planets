import { useState, useEffect } from "react";

const PlanetsApp = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const [lastPage, setLastPage] = useState(1);
  const [hasBack, setHasBack] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  const handleButton2Click = () => {
    setLastPage(page - 1);
  };

  useEffect(() => {
    setLoading(true);

    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Sorry, no information available.");
      })

      .then((data) => {
        console.log(data);
        setLoading(false);
        setPlanets((planets) => [...planets, ...data.results]);
        setHasNext(!!data.next);
        setHasBack(!!data.back);
      })
      .catch((error) => console.log(error.message));
  }, [page, lastPage]);

  return (
    <section className="container py-5">
      <div className="row">
        {planets.map((planet) => {
          return (
            <div key={planet.name} className="text-center col-md-6  col-lg-4 col-xl-3 mb-3 p-4">
              <article className="rounded border border-warning text-warning p-5 ">
                <h2 className="h3 text-uppercase fs-2 text-center mb-4">{planet.name}</h2>
                <p className="mb-0 text-center">
                  <b>population :</b> <br /> {planet.population}
                </p>{" "}
                <br />
                <p className="mb-0 text-center">
                  <b>climat : </b> <br /> {planet.climate}
                </p>
              </article>
            </div>
          );
        })}
        {loading && (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>

      {!loading && hasNext && (
        <button
          type="button"
          className="btn btn-warning float-end text-dark p-3 mb-5"
          onClick={handleButtonClick}
          disabled={loading}
        >
          ➡️
        </button>
      )}
      {!hasNext && hasNext === hasBack && (
        <p className="rounded bg-dark text-white text-center p-3">
          You have arrived at the last page and the last planets.
        </p>
      )}

      <button
        type="button"
        className="btn btn-warning float-start text-dark p-3 mb-5"
        onClick={handleButton2Click}
        disabled={loading}
      >
        ⬅️
      </button>
    </section>
  );
};

export default PlanetsApp;

// TODO activer le bouton de retour

/*
{hasBack && (
        <p className="rounded bg-dark text-white text-center p-3 ">Welcome to the Stars War Planets.</p>
      )}
*/
