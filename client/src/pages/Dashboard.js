import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const data = await api.listSearches();
      setItems(data);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function create() {
    setErr("");
    try {
      await api.createSearch(query);
      setQuery("");
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function del(id) {
    setErr("");
    try {
      await api.deleteSearch(id);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="dashboard">
      <h2>Search Manager</h2>
      <p className="subtle">Save searches, view results, and manage history per user.</p>

      <div className="search-bar">
        <input
          placeholder="Type something… (ex: pepeni galbeni)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={create} disabled={!query.trim()}>Search</button>
      </div>

      {err && <p className="error">{err}</p>}

      <h3 style={{ marginTop: 26 }}>My searches</h3>
      <ul className="search-list">
        {items.map(s => (
          <li key={s.id}>
            <Link to={`/searches/${s.id}`}>{s.query}</Link>
            <button onClick={() => del(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
