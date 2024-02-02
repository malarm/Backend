export type ReviewOutput = {
    orderId: number;
    updatedAt: Date;
    service: string;
    serviceProducts: string;
    warranty: {
        warrantyProducts: ReviewWarrantyProducts[];
    },
    reviewDetails: ReviewQuestionAnswer[];
    agentComment: string;
    platform: string;
}

export type ReviewWarrantyProducts = {
    itemNumber: string
}


export type ReviewQuestionAnswer = {
    question: {
        name: string;
    }
    comment: string;
    rating: number;
}