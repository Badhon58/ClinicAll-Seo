export function getStarPath(
  width: any,
  height: any,
  points: any,
  innerRadiusRatio: any,
  rounding: any
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2;
  const innerRadius = outerRadius * innerRadiusRatio;

  let path = "";

  for (let i = 0; i <= points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;

    // Apply rounding to the points
    const nextAngle = ((i + 1) * Math.PI) / points - Math.PI / 2;
    const nextRadius = (i + 1) % 2 === 0 ? outerRadius : innerRadius;

    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    if (i === 0) {
      path += `M ${x} ${y}`;
    } else {
      if (rounding > 0) {
        const controlX1 =
          centerX + radius * Math.cos(angle + rounding * (nextAngle - angle));
        const controlY1 =
          centerY + radius * Math.sin(angle + rounding * (nextAngle - angle));
        const controlX2 =
          centerX +
          nextRadius * Math.cos(nextAngle - rounding * (nextAngle - angle));
        const controlY2 =
          centerY +
          nextRadius * Math.sin(nextAngle - rounding * (nextAngle - angle));

        path += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${
          centerX + nextRadius * Math.cos(nextAngle)
        } ${centerY + nextRadius * Math.sin(nextAngle)}`;
        i++; // Skip the next point since we've handled it with the curve
      } else {
        path += ` L ${x} ${y}`;
      }
    }
  }

  path += " Z";
  return path;
}
