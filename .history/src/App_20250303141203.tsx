import React, { useEffect, useState } from "react"
import KanbanBoard from "./components/KanbanBoard"
import "antd/dist/reset.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { setIssues, setLink, setQuery} from "./array/dataArray"
import { getGitHubLink } from "./api"
import { Button, Input, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";


function App() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const { query, link, issues } = useAppSelector(state => state.data)

  const submit = (query: string) => {
    dispatch(setLink(query))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (query.length === 0) {
      return
    }

    submit(query)

    reset()
  }

  const reset = () => {
    dispatch(setQuery(''))
    setError('')
  }

  useEffect(() => {
    if (!link) return

    setLoading(true)
    setError('')
  /*  check local storage for repo link if it has tasks already
      if has - take tasks from local storage
      if no - make a request
    */
    getGitHubLink(link) 
      .then(issues => {
        dispatch(setIssues(issues))
      })
      .catch(() => setError('Failed to loud issues'))
      .finally(() => setLoading(false))
  }, [dispatch, link])

  return (
    <>
      <div className="conta">
        <form onSubmit={handleSubmit} className="form">
          <Input
            value={query}
            onChange={(event) => {
              dispatch(setQuery(event.target.value))
            }}
            className="input"
            placeholder="Enter you link"
            id="query"
            type="text" />

          <Button
            color="default"
            htmlType="submit"
            type="primary"
            className="button"
            loading={loading}
          >
            Load
          </Button>
          {error && error}
        </form>
        {!loading && (
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        )}
          
        <KanbanBoard issues={issues} repoUrl={link} />
      </div>
    </>
  )
}

export default App