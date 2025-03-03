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
      className="issue"
      draggable
      onDragStart={() => handleDragStart(issue, col)}
      onDragOver={() => handleDragOver(issue)}
    >
      <Title level={5} ellipsis>
        {issue.title}
      </Title>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Text type="secondary">#{issue.number} • {timeAgo(issue.created_at)}</Text>
        <Space size="small">
          <Link href={issue.html_url} target="_blank">{issue.user.login}</Link>
          <Text type="secondary">| Comments: {issue.comments}</Text>
        </Space>
      </Space>
    </Card>
    
  );
};

export default Issue;