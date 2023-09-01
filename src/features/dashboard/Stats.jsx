import {
    HiOutlineBanknotes,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
    HiOutlineClock,
} from "react-icons/hi2";
import Stat from "./Stat";
import {formatCurrency} from "../../utils/helpers";

function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const checkins = confirmedStays.length;
    const occupation =
        confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount);

    return (
        <>
            <Stat
                title="bookings"
                color="blue"
                icon={<HiOutlineClock />}
                value={numBookings}
            />
            <Stat
                title="sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy Rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    );
}

export default Stats;
