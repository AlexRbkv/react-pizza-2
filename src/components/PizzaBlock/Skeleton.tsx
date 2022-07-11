import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton: React.FC = () => (
  <ContentLoader
  className="pizza-block" 
    speed={2}
    width={280}
    height={490}
    viewBox="0 0 280 490"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <rect x="317" y="612" rx="0" ry="0" width="260" height="86" /> 
    <circle cx="140" cy="140" r="140" /> 
    <rect x="0" y="290" rx="10" ry="10" width="280" height="28" /> 
    <rect x="0" y="330" rx="10" ry="10" width="280" height="86" /> 
    <rect x="120" y="429" rx="20" ry="20" width="155" height="44" /> 
    <rect x="0" y="438" rx="10" ry="10" width="84" height="27" />
  </ContentLoader>
);