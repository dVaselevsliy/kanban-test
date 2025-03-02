import { useEffect, useState } from "react"
import { IssueType } from "../type/IssueType"
import Column from "./Column"

interface Props {
  issues: IssueType[],
}

export const Content: React.FC<Props> = ({ issues }) => {
  const [todoIssues, setTodoIssues] = useState<IssueType[]>([]) 
  const [inProgressIssues, setInProgressIssues] = useState<IssueType[]>([]) 
  const [doneIssues, setDoneIssues] = useState<IssueType[]>([])

  useEffect(() => {
    setTodoIssues(issues.filter(issue => issue.state === 'open' && !issue.assignee))
    setInProgressIssues(issues.filter(issue => issue.state === 'open' && issue.assignee))
    setDoneIssues(issues.filter(issue => issue.state === 'closed'))
  }, [issues])

  function moveIssues(issueId: number, fromBoard: string, toBoard: string) {
    let issueToMove: IssueType | undefined

    if (fromBoard === 'todo') {
      issueToMove = todoIssues.find(issue => issue.id === issueId)
      setTodoIssues(prev => prev.filter(issue => issue.id !== issueId))
    } else if (fromBoard === 'inprogress') {
      issueToMove = inProgressIssues.find(issue => issue.id === issueId)
      setInProgressIssues(prev => prev.filter(issue => issue.id !== issueId))
    } else if (fromBoard === 'done') {
      issueToMove = doneIssues.find(issue => issue.id === issueId)
      setDoneIssues(prev => prev.filter(issue => issue.id !== issueId))
    }


    if (!issueToMove) return

    if (toBoard === 'todo') {
      setTodoIssues(prev => [...prev, issueToMove!])
    }

    if (toBoard === 'inprogress') {
      setInProgressIssues(prev => [...prev, issueToMove!])
    }

    if (toBoard === 'done') {
      setDoneIssues(prev => [...prev, issueToMove!])
    }
  }
  
  return (
        <div className="colums">
        <div>
          <h2 className="colums__name">ToDo</h2>
          <div
            className="colums__container">
              {todoIssues.map(issue => (
                <Column
                  key={issue.id}
                  issue={issue}
                  board={'todo'}
                  moveIssues={moveIssues}
                />
              ))}
            </div> 
          </div>

          <div>
          <h2 className="colums__name">In Progress</h2>
            <div className="colums__container">
              {inProgressIssues.map(issue => (
                <Column
                  key={issue.id}
                  issue={issue}
                  board={'inprogress'}
                  moveIssues={moveIssues}
                />
              ))}
            </div>
          </div>

          <div className="colums__name">
          <h2>Done</h2>
          <div className="colums__container">
            {doneIssues.map(issue => (
              <Column
                key={issue.id}
                issue={issue}
                board={'done'}
                moveIssues={moveIssues}
              />
            ))}
          </div>
          </div>
        </div>
  )
}