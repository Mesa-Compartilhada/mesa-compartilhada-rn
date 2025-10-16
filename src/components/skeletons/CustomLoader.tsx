import React from "react"
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"

type Props = {
  w: string,
  h: string
}

const BaseSkeleton = ({ w, h }: Props) => (
  <ContentLoader 
    speed={2}
    width={w}
    height={h}
    backgroundColor="#a6a6a6"
    foregroundColor="#ecebeb"
  >
    <Rect width={w} height={h} />
  </ContentLoader>
)

export default BaseSkeleton