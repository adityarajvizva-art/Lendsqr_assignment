import { adjutorClient } from "../../../config/axios";
import { AppError } from "../../../shared/errors/app-error";

export class KarmaService {
    async isBlacklisted(identity: string): Promise<boolean> {
        try {
            const response = await adjutorClient.get(
                `/verification/karma/${identity}`
            );

            console.log("Adjutor Karma response:", response.data);

            return Boolean(response.data?.data);
        } catch (error: any) {
            console.log(
                "Adjutor Karma error:",
                error.response?.data || error.message
            );

            if (error.response?.status === 404) {
                return false;
            }

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                throw new AppError(
                    "Unable to verify user against Karma blacklist",
                    503
                );
            }

            throw error;
        }
    }
}