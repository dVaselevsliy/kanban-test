import { IssueType } from "../type/IssueType";
import { timeAgo } from "../helpers/timeAgo"
import { Card } from "antd";
import Title from "antd/es/typography/Title";

interface Props {
  issue: IssueType,
  col: string,
  handleDragStart: (issue: IssueType, column: string) => void,
  handleDragOver: (issue: IssueType) => void
}

const Issue: React.FC<Props> = ({
  issue,
  col,
  handleDragStart,
  handleDragOver
}) => {

  return (
    <Card
    style={{ width: "32%", minHeight: "300px", margin: "10px", borderRadius: "8px" }}

      draggable
      onDragStart={() => handleDragStart(issue, col)}
      onDragOver={() => handleDragOver(issue)}
    >
      <
        className="issue__title">{issue.title}</>
      <div className="issue__second-section">
        <p className="issue__id">
          #{issue.number}
        </p>
        <p className="issue__description">
          {timeAgo(issue.created_at)}
        </p>
      </div>

      <div className="issue__third-section">
        <a href={issue.html_url} target='_blank'>
          <h4 className="issue__link">{issue.user.login}</h4>
        </a>
        |
        <span> Comments: {issue.comments}</span>
      </div>
    </Card>
    
  );
};

export default Issue;