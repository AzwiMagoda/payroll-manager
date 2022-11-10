export interface BookLeave {
	leaveType: number;
	startDate: Date;
	endDate: Date;
}

export class BookLeave implements BookLeave {
	constructor(leaveType: number, startDate: Date, endDate: Date) {
		this.endDate = endDate;
		this.startDate = startDate;
		this.leaveType = leaveType;
	}
}
