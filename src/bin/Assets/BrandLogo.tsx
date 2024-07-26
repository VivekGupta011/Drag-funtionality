import React from "react";

const Logo = () => {
  return (
    <div
      data-framer-component-type="SVG"
      data-framer-name="Clip path group"
      className="framer-11n80y4"
      style={{
        imageRendering: "pixelated",
        flexShrink: 0,
        fill: "rgb(0, 0, 0)",
        color: "rgb(0, 0, 0)",
        opacity: 1,
      }}
    >
      <div
        className="svgContainer"
        style={{
          width: "40%",
          height: "40%",
          aspectRatio: "inherit",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ width: "100%", height: "100%" }}
          viewBox="0 0 64 64"
          preserveAspectRatio="none"
          width="40%"
          height="40%"
        >
          <use href="#svg-1178891646_913"></use>
        </svg>
      </div>
    </div>
  );
};

export default React.memo(Logo);
