import { useEffect, useState } from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { PiSealCheckFill } from "react-icons/pi";
import { TbRocket } from "react-icons/tb";

import "./stateBar.css";

function AnimatedCounter({ value, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;

        const timer = setInterval(() => {
            current++;

            setCount(current);

            if (current >= value) {
                clearInterval(timer);
            }
        }, 250);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function StatsBar() {

    const startDate = new Date("2022-07-07");
    const today = new Date();

    const years =
        today.getFullYear() -
        startDate.getFullYear() -
        (
            today.getMonth() < startDate.getMonth() ||
            (
                today.getMonth() === startDate.getMonth() &&
                today.getDate() < startDate.getDate()
            )
        );

    return (
        <div className="stats-bar">

            <div className="stat-item">
                <BsCalendar2Date className="stat-icon" />

                <div>
                    <h2>
                        <AnimatedCounter
                            value={years}
                            suffix="+"
                        />
                    </h2>

                    <p>Years of Experience</p>
                </div>
            </div>

            <div className="divider"></div>

            <div className="stat-item">
                <PiSealCheckFill className="stat-icon" />

                <div>
                    <h2>
                        <AnimatedCounter
                            value={3}
                            suffix="x"
                        />
                    </h2>

                    <p>Salesforce Certifications</p>
                </div>
            </div>

            <div className="divider"></div>

            <div className="stat-item">
                <TbRocket className="stat-icon" />

                <div>
                    <h2>E2E</h2>

                    <p>Delivery Focus</p>
                </div>
            </div>

        </div>
    );
}