import { Link } from "react-router-dom";

export default function ProfilePage() {
  return (
    <section>
      <h1>ProfilePage</h1>
      <Link to="./home">
        <img src="/icons/logo.svg" alt="Logo" />
      </Link>
    </section>
  );
}
