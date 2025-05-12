import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum SettingName {
    maxAppointmentsPerDay = "maxAppointmentsPerDay",
}


@Entity({name: 'Setting'})
export class Setting{
    @PrimaryGeneratedColumn()
    ID_setting!: number;
    
    @Column({type: "enum", enum: SettingName})
    settingName!: string;

    @Column({type: "varchar", nullable: true})
    settingStringValue!: string;

    @Column({type: "int", nullable: true})
    settingIntValue!: number;

    @Column({type: "boolean", nullable: true})
    settingBoolValue!: boolean;
}