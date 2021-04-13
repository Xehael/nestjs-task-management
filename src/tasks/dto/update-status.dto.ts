import { TaskStatus } from "../tasks.model";

export class UpdateStatusDto {
    id: string;
    status: TaskStatus
}