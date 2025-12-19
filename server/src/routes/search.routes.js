const express = require("express");
const { auth } = require("../middleware/auth");
const Search = require("../models/Search");
const SearchResult = require("../models/SearchResult");
const { bingSearch } = require("../services/bing.service");

const router = express.Router();

// CREATE search + rezultate (integrare Bing)
router.post("/", auth, async (req, res) => {
  const { query } = req.body || {};
  if (!query) return res.status(400).json({ message: "query required" });

  const search = await Search.create({ query, UserId: req.user.id });
  const results = await bingSearch(query);

  const created = await Promise.all(
    results.map(r => SearchResult.create({ ...r, SearchId: search.id }))
  );

  return res.status(201).json({ search, results: created });
});

// READ all searches ale userului
router.get("/", auth, async (req, res) => {
  const searches = await Search.findAll({
    where: { UserId: req.user.id },
    order: [["createdAt", "DESC"]]
  });
  return res.json(searches);
});

// READ one search + children
router.get("/:id", auth, async (req, res) => {
  const search = await Search.findOne({
    where: { id: req.params.id, UserId: req.user.id },
    include: [{ model: SearchResult }]
  });

  if (!search) return res.status(404).json({ message: "Not found" });
  return res.json(search);
});

// UPDATE query (doar metadata, simplu)
router.put("/:id", auth, async (req, res) => {
  const { query } = req.body || {};
  const search = await Search.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!search) return res.status(404).json({ message: "Not found" });

  if (query) search.query = query;
  await search.save();
  return res.json(search);
});

// DELETE search (și cascade rezultate)
router.delete("/:id", auth, async (req, res) => {
  const search = await Search.findOne({ where: { id: req.params.id, UserId: req.user.id } });
  if (!search) return res.status(404).json({ message: "Not found" });

  await search.destroy();
  return res.status(204).send();
});

module.exports = router;
