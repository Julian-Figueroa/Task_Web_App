export class Task {
    constructor(
        public _id: string,
        public title: string,
        public owner: string,
        public priority: number,
        public dueDate: Date,
        public creator: string,
        public taskStatus: string,
        public createdAt,
        public updatedAt
    ) { }
}
