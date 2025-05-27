export interface CreateCustomAppointmentScheduleDTO {
  date: Date;
  hour: string; // Should match the Hours enum
  maxAppointments: number;
}
