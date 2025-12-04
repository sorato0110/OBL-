export type GoalStatus = 'focus' | 'excluded';

export interface Goal {
  id: string;
  text: string;
  status: GoalStatus;
  createdAt: number;
}
