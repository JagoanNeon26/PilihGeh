import React, { useEffect, useState } from 'react';
import { Timeline } from 'flowbite-react';
import styles from './timeline.module.css';

export default function HorizontalTimeline({ timelineItems }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isVerticalTimeline = width <= 768;

  return (
    <Timeline horizontal={!isVerticalTimeline}>
      {timelineItems.map((item) => (
        <Timeline.Item key={item.id}>
          <Timeline.Point />
          <Timeline.Content className={styles.timeline}>
            <Timeline.Title className={styles.timelineTitle}>
              {item.title}
            </Timeline.Title>
            <Timeline.Time className={styles.timelineTime}>
              {item.date}
            </Timeline.Time>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
