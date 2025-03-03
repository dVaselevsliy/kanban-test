import React, { useEffect, useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { setIssues, setLink } from "./array/dataArray";
import { getGitHubLink } from "./api";

function App() {
  const [query, setQuery] = useState(""); // Локальный стейт для input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { link, issues } = useAppSelector(state => state.data);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;

    dispatch(setLink(query)); // Диспатчим ссылку в `store`
    setQuery(""); // Очищаем input, но `link` в `store` уже обновился
    setError("");
  };

  useEffect(() => {
    if (!link) return;

    setLoading(true);
    setError("");

    getGitHubLink(link)
      .then(issues => dispatch(setIssues(issues)))
      .catch(() => setError("❌ Не удалось загрузить issues"))
      .finally(() => setLoading(false));
  }, [dispatch, link]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input"
          placeholder="Введите ссылку на репозиторий"
          type="text"
        />
        <button type="submit" className="button">Загрузить</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p>Загрузка...</p>}

      <KanbanBoard issues={issues} repoUrl={link} />
    </div>
  );
}

export default App;
