export interface GameStatusData {
  current_event: number;
  current_event_finished: boolean;
  next_event: number;
  processing_status: string;
  trades_time_for_approval: boolean;
  waivers_processed: boolean;
}
