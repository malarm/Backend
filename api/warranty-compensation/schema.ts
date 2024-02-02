import { WarrantyCompensationReportSchema } from 'lib/schemas';

export const getWarrantyCompensationReportSchema = {
	params: WarrantyCompensationReportSchema,
};

export interface WarrantyCompensationType {
	warrantyProducts: WarrantyCompensationProductType[];
}

export interface WarrantyCompensationProductType {
	status: number;
	supplier: CompensationSupplierType;
	warrantyCompensationStatusId?: number;
}

export interface WarrantyCompensationStatusType {
	id: number;
	title: string;
}

export interface CompensationSupplierType {
	id: number;
	title: string;
}

export interface CompensationReport {
	supplier: string;
	notAppliedFor: number
	unnecessary: number;
	appliedFor: number
	approvedButNotReceived: number;
	approvedReceived: number
	declined: number;
	notAppliedForPercentage: string;
	unnecessaryPercentage: string;
	appliedForPercentage: string
	approvedButNotReceivedPercentage: string;
	approvedReceivedPercentage: string
	declinedPercentage: string;
	total: number;
}
