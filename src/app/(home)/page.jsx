import { toast } from "react-toastify";

export default function Home() {
  const notify = () => toast("toastify test!");
  return <div>Home</div>;
}
