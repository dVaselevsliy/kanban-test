import { IssueType } from "../type/IssueType";

interface Props {
  issue: IssueType,
  board: string,
  moveIssues: (issueId: number, fromBoard: string, toBoard: string) => void 
}

const Column: React.FC<Props> = ({ issue, board, moveIssues }) => {

  function dragStartHandler(event, issue: IssueType) {
    event.dataTransfer.setData('issueId', String(issue.id))
    event.dataTransfer.setData('fromBoard', board)
    event.currentTarget.style.opacity = "0.5"
  }

  function dropHandler(event, targetBoard: string) {
    event.preventDefault()
    const issueId = +event.dataTransfer.getData('issueId')
    const fromBoard = event.dataTransfer.getData('fromBoard')

    if (issueId && fromBoard !== targetBoard) {
      moveIssues(issueId, fromBoard, targetBoard)
    }

    event.currentTarget.style.backgroundColor = '' 
  }
  
  function dragOverHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('column')) {
      event.currentTarget.style.backgroundColor = '#cdcdcd' 
    }
  }

  function dragLeaveHandler(event) {
    event.currentTarget.style.backgroundColor = '' 
  }


  function dragEndHandler(event) {
    event.currentTarget.style.backgroundColor = ''
    event.currentTarget.style.opacity = "1"
  }

  return (
    <div
      onDragStart={(event) => dragStartHandler(event, issue)}
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, board)}

      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragEnd={(event) => dragEndHandler(event)}
      
      draggable
      className="column">
      <h3
        className="column__title">{issue.title}</h3>
      <div className="column__second-section">
        <p className="column__id">
          #{issue.number}
        </p>
        {issue.labels.map(label => (
          <p className="column__description">{label?.description}</p>
        ))}
      </div>

      <div className="column__third-section">
        <a href={issue.html_url} target='_blank'>
          <h4 className="column__link">{issue.user.login}</h4>
        </a>
        |
        <span> Comments: {issue.comments}</span>
      </div>
    </div>
  );
};

export default Column;