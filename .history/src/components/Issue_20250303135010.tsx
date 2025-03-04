import { IssueType } from "../type/IssueType";
import { timeAgo } from "../helpers/timeAgo";

interface Props {
  issue: IssueType;
  col: string;
  handleDragStart: (issue: IssueType, column: string) => void;
  handleDragOver: (issue: IssueType) => void;
}

const Issue: React.FC<Props> = ({
  issue,
  col,
  handleDragStart,
  handleDragOver,
}) => {
  return (
    <div
      className="issue"
      draggable
      onDragStart={() => handleDragStart(issue, col)}
      onDragOver={(event) => {
        event.preventDefault(); // Улучшает поддержку drag-and-drop
        handleDragOver(issue);
      }}
    >
      <h3 className="issue__title">{issue.title}</h3>

      <div className="issue__second-section">
        <p className="issue__id">#{issue.number}</p>
        <p className="issue__description">{timeAgo(issue.created_at)}</p>
      </div>

      <div className="issue__third-section">
        <a
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View issue by ${issue.user.login}`}
        >
          <h4 className="issue__link">{issue.user.login}</h4>
        </a>
        <span> | Comments: {issue.comments}</span>
      </div>
    </div>
  );
};

export default Issue;
