import { useCallback, useState } from "react";
import classNames from "classnames";
import "./styles.css";

export default function App() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [breakPoints, setBreakPoints] = useState<
    Array<{ lower: number; upper: number }>
  >([]);
  const scrollerRef = useCallback((node: HTMLUListElement) => {
    if (node !== null) {
      setBreakPoints(
        Array.from(node.children).map((child, idx) => {
          if (idx === node.childElementCount - 1) {
            return {
              lower:
                (100 * idx * child.getBoundingClientRect().width) /
                node.scrollWidth,
              upper: 100
            };
          }

          return {
            lower:
              (100 * idx * child.getBoundingClientRect().width) /
              node.scrollWidth,
            upper:
              (100 * (idx + 1) * child.getBoundingClientRect().width) /
              node.scrollWidth
          };
        })
      );
    }
  }, []);

  const onScroll = (e: any) => {
    const rootNode = e.target;
    if (!rootNode) return;
    const cursor =
      (100 * e.target.scrollLeft) /
      (rootNode.scrollWidth - rootNode.clientWidth);
    const activeChildIndex = breakPoints.findIndex(
      (el) => cursor >= el.lower && cursor <= el.upper
    );
    setActiveIndex(activeChildIndex);
  };

  return (
    <div>
      <ul onScroll={onScroll} ref={scrollerRef} className="list">
        {new Array(10).fill(0).map((_, idx) => (
          <li
            className={classNames("item", {
              "active-item": idx === activeIndex
            })}
            key={idx}
          >
            {idx}
          </li>
        ))}
      </ul>
    </div>
  );
}
