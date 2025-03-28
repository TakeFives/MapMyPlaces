import React, { useState } from "react";
import data from "../../data/data.json";
import SingleMap from "../templates/SingleMap";

function Places() {
  const places = data.locations;

  const [activeItemMapId, setActiveItemMapId] = useState(null);

  const toggleShowMap = (id) => {
    setActiveItemMapId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <section id="places" className="bg-light places-container py-5">
        <div className="container">
          <h2 className="text-center mb-5">Saved Places</h2>

          <div className="flex cards-container pt-4 pb-4">
            {places.map((item, index) => {
              return (
                <div
                  className={`card flex-md-row flex-column-reverse ${
                    index % 2 === 0 ? "" : "flex-md-row-reverse"
                  }`}
                  key={item.id}
                >
                  <div className="card__preview container-fliud">
                    {activeItemMapId === item.id ? (
                      <div className="card__map">
                        <SingleMap place={item}/>
                      </div>
                    ) : (
                      <div className="card__image">
                        <img src={item.image} alt={item.name} />
                      </div>
                    )}
                  </div>

                  <div className="card__description">
                    <h3 className="card__title">{item.name}</h3>
                    <p className="card__text">{item.description}</p>
                    <button
                      type="button"
                      className="btn card__location-btn"
                      onClick={() => toggleShowMap(item.id)}
                    >
                      View map {item.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default Places;
