import { Skeleton } from "@chakra-ui/react";

interface TProps {
  count: number;
  height: string;
  width: string;
}

const SkeletonLoader: React.FC<TProps> = ({ count, height, width }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          startColor="blackAlpha.400"
          endColor="whiteAlpha.300"
          height={height}
          width={width}
          borderRadius={4}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
