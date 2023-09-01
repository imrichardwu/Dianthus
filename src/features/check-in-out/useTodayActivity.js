import {useQuery} from "@tanstack/react-query";
import {
    getStaysAfterDate,
    getStaysTodayActivity,
} from "../../services/apiBookings";

export function useTodayActivity() {
    const {isLoading, data: activities} = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"],
    });

    return {activities, isLoading};
}

export function useNextDayActivity() {
    const {isLoading, data: activities} = useQuery({
        queryFn: getStaysAfterDate,
        queryKey: ["Next-day-activity"],
    });

    return {activities, isLoading};
}
