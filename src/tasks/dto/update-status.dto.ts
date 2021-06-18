import { TaskStatus } from "../task-status.enum";

export class UpdateStatusDto {
    id: number;
    status: TaskStatus
}