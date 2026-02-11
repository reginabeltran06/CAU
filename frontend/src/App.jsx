import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header
        search={search}
        onSearchChange={setSearch}
      />
      <Home search={search} />
    </>
  );
}
