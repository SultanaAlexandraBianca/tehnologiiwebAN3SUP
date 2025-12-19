require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db");

const User = require("./models/User");
const Search = require("./models/Search");
const SearchResult = require("./models/SearchResult");

const authRoutes = require("./routes/auth.routes");
const searchRoutes = require("./routes/search.routes");

const app = express();
app.use(cors());
app.use(express.json());

// RELAȚII (User -> Search -> SearchResult)
User.hasMany(Search, { onDelete: "CASCADE" });
Search.belongsTo(User);

Search.hasMany(SearchResult, { onDelete: "CASCADE" });
SearchResult.belongsTo(Search);

app.get("/", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/searches", searchRoutes);

const PORT = process.env.PORT || 4000;

(async () => {
  await sequelize.sync(); // simplu: creează tabelele
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
