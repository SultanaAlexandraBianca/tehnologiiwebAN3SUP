import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useParams } from "react-router-dom";
import "./SearchDetails.css";

export default function SearchDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [edit, setEdit] = useState("");
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    try {
      const d = await api.getSearch(id);
      setData(d);
      setEdit(d.query);
    } catch (e) {
      setErr(e.message);
    }
  }

  useEffect(() => { load(); }, [id]);

  async function save() {
    setErr("");
    try {
      await api.updateSearch(id, edit);
      await load();
    } catch (e) {
      setErr(e.message);
    }
  }

  if (err) return <p className="error">{err}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div className="details">
      <h2>Search #{data.id}</h2>
      <p className="subtle">Edit the query and review stored results.</p>

      <div className="edit-bar">
        <input value={edit} onChange={(e) => setEdit(e.target.value)} />
        <button onClick={save}>Update</button>
      </div>

      <h3>Results</h3>
      <ul>
        {data.SearchResults?.map(r => (
          <li key={r.id} className="result-item">
            <a href={r.url} target="_blank" rel="noreferrer">{r.title}</a>
            <div className="result-snippet">{r.snippet}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
