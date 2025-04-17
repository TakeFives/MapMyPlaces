import { useAuth } from "../../hooks/useAuth";
import UserMap from "../templates/UserMap";

function MyMap() {
const {user} = useAuth();
console.log("user my-map", user);

  return (
    <div>
      <section id="map" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">{user ? `${user.name}'s Map` : 'My Map'}</h2>
          <div className="map-container">
            <UserMap />
          </div>
        </div>
      </section>
    </div>
  );
}
export default MyMap;