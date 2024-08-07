import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CircularProgress = ({ percentage , color }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const width = 200;
    const height = 200;
    const margin = 20;
    const radius = Math.min(width, height) / 2 - margin;

    svg.attr('width', width).attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const backgroundArc = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    g.append('path')
      .attr('d', backgroundArc)
      .attr('fill', '#d6d6d6');

    const foregroundArc = d3
      .arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(0);

    const path = g.append('path')
      .datum({ endAngle: 0 })
      .attr('d', foregroundArc)
      .attr('fill', color);

    const text = g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('font-size', '24px')
      .attr('font-weight', '600')
      .attr('fill', color);

    path.transition()
      .duration(1000)
      .attrTween('d', (d) => {
        const interpolate = d3.interpolate(d.endAngle, (percentage / 100) * 2 * Math.PI);
        return (t) => {
          d.endAngle = interpolate(t);
          return foregroundArc(d);
        };
      });

    const interpolateText = d3.interpolate(0, percentage);
    text.transition()
      .duration(1000)
      .tween('text', () => (t) => {
        text.text(Math.round(interpolateText(t)) + '%');
      });

    return () => {
      svg.selectAll('*').remove();
    };
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage]);

  return <svg ref={ref}></svg>;
};

export default CircularProgress;
