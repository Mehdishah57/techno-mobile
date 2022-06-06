import React from 'react';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CardSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item margin={10} flexDirection="column" alignItems="center">
        <SkeletonPlaceholder.Item width={180} height={200} borderRadius={30} />
        <SkeletonPlaceholder.Item alignSelf='flex-start'  marginTop={5} marginLeft={10}>
          <SkeletonPlaceholder.Item width={100} height={10} borderRadius={4} />
          <SkeletonPlaceholder.Item
            marginTop={5}
            width={50}
            height={10}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export default CardSkeleton;
