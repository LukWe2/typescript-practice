class ApiRateLimitError extends Error{

    constructor(

        message: string,
        readonly userId: number,
        readonly requestesUsed: number,
        readonly requestsLimit: number
    ) {

        super(message);
        this.name = "MonthlyPlannedPostLimitError";
    }
}


function checkApiRateLimit(
    userId: number,
    requestsUsed: number,
    requestsLimit: number
): void {

    if (requestsLimit <= requestsUsed){

        throw new ApiRateLimitError(

        );
    }
}