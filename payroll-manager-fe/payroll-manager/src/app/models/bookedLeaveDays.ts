export interface BookedLeaveDays {
	id: string;
	employeeId: string;
	leaveType: string;
	startDate: string;
	endDate: string;
	approved: boolean;
	name?: string;
	surname?: string;
	teamName?: string;
	status?: string;
	reason?: string;
}
