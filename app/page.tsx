import { getUser } from "@/utils/database/auth";
import LandingPage from "./components/landing";
import Stats from "./components/stats";

const Home = async () => {
  const user = await getUser();
  return <>{user ? <Stats user={user} /> : <LandingPage />}</>;
};

export default Home;
