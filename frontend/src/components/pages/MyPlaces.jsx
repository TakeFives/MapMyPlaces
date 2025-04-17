import React, { useState, useEffect } from "react";
import SingleMap from "../templates/SingleMap";
import { getUserPlaces } from "../../services/api/placesApi";
import { useAuth } from "../../hooks/useAuth";

function MyPlaces() {
  const {user} = useAuth();
  console.log("user my-places", user);
  const [places, setPlaces] = useState([]);

  const [activeItemMapId, setActiveItemMapId] = useState(null);

  const toggleShowMap = (id) => {
    setActiveItemMapId((prevId) => {
      return prevId === id ? null : id;
    });
  };

  useEffect(() => {
    if (!user) return; 

    async function fetchPlaces() {
      try {
        const data = await getUserPlaces(user.id);
        setPlaces(data);
      } catch (error) {
        console.error("Error loading places:", error);
      }
    }
    fetchPlaces();
  }, [user]);

  return (
    <>
      <section id="my-places" className="bg-light places-container py-5">
        <div className="container">
          <h2 className="text-center mb-5">{ user ?`${user.name}'s Places`: 'My Places'}</h2>

          <div className="flex cards-container pt-4 pb-4">
            {places.map((item, index) => {
              return (
                <div
                  className={`card flex-md-row flex-column-reverse ${
                    index % 2 === 0 ? "" : "flex-md-row-reverse"
                  }`}
                  key={item._id}
                >
                  <div className="card__preview container-fliud">
                    {activeItemMapId === item._id ? (
                      <div className="card__map">
                        <SingleMap place={item} />
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
                      onClick={() => toggleShowMap(item._id)}
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
export default MyPlaces;
