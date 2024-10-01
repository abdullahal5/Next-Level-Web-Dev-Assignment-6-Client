"use client";
import { useAppSelector } from "../../redux/hook";

export default function Home() {
  const { user } = useAppSelector((state) => state.auth);

  console.log(user);

  return <div>Home</div>;
}
