export interface UpdateCustomAppointmentScheduleDTO {
  date?: Date;
  hout?: string; // Should match the Hours enum
  maxAppointments?: number;
}
