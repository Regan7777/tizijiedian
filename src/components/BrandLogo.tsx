import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  size = 40,
  showText = false
}) => {
  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Geometric Emblem SVG */}
      <svg
        width={size}
        height={showText ? size * 1.35 : size}
        viewBox="0 0 100 130"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-200"
      >
        {/* Top Inverted Trapezoid / Triangle */}
        <polygon 
          points="27,14 73,14 50,42" 
        />

        {/* Left Wing Polygon */}
        <polygon 
          points="14,24 43,49 43,84 14,106" 
        />

        {/* Right Wing Polygon */}
        <polygon 
          points="86,24 57,49 57,84 86,106" 
        />

        {/* Stylized Vertical "意品" & "创意改变生活" if showText is true */}
        {showText ? (
          <>
            <text
              x="50"
              y="108"
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="2"
            >
              意
            </text>
            <text
              x="50"
              y="122"
              textAnchor="middle"
              fontSize="13"
              fontWeight="900"
              fontFamily="sans-serif"
              letterSpacing="2"
            >
              品
            </text>
            <text
              x="50"
              y="132"
              textAnchor="middle"
              fontSize="6"
              fontWeight="700"
              letterSpacing="1"
            >
              创意改变生活
            </text>
          </>
        ) : (
          <>
            {/* Small stylized 意品 text below emblem in compact mode */}
            <text
              x="50"
              y="114"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              letterSpacing="1.5"
            >
              意
            </text>
            <text
              x="50"
              y="126"
              textAnchor="middle"
              fontSize="10"
              fontWeight="900"
              letterSpacing="1.5"
            >
              品
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
