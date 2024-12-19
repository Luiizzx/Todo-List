class Task {
    constructor(taskTitle, taskStart, taskEnd) {
        this.objTitle = taskTitle;
        this.objStartDate = taskStart;
        this.objEndDate = taskEnd;
    }

    setTaskId(taskId) {
        this.taskId = taskId;
    }

    getTaskId() {
        return this.taskId;
    }

    setTaskState(bool) {
        this.taskState = bool;
    }

    getTaskState() {
        return this.taskState;
    }
}