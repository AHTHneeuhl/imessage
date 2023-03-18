import { Session } from "next-auth";

interface IFeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<IFeedWrapperProps> = ({ session }) => {
  return <div>Feed Wrapper</div>;
};

export default FeedWrapper;
