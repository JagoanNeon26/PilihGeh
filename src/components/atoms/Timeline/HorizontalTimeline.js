import React from 'react';
import { Timeline } from 'flowbite-react';
import styles from './timeline.module.css';

export default function HorizontalTimeline({ timelineItems }) {
  return (
    <Timeline horizontal>
      {timelineItems.map((item) => (
        <Timeline.Item key={item.id}>
          <Timeline.Point />
          <Timeline.Content className={styles.timeline}>
            <Timeline.Title>{item.title}</Timeline.Title>
            <Timeline.Time>{item.date}</Timeline.Time>
            <Timeline.Body>{item.content}</Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}
