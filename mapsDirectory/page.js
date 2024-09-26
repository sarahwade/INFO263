"use client";

import React, { useState, useEffect } from "react";
import Layout from "../components/Layout"; // Import the layout component
import styles from '../page.module.css';
import Link from "next/link";

export default function Graphs() {
    const [graph, setGraph] = useState([]);

    useEffect(() => {
        document.title = "Rental Graphs";
        async function fetchGraph() {
            let res = await fetch('http://localhost/car_rental/car_php/car_rental.php?query=graph');
            let data = await res.json();
            setGraph(data);
        }
        fetchGraph();
    }, []);

    return (
        <Layout>
            <div>
                {/* Nav Bar */}
                <ul className={styles.navMenu}>
                    <li><Link className={styles.nav} href="./">HOME</Link></li>
                    <li><Link className={styles.nav} href="./vehiclesDirectory">VEHICLES</Link></li>
                    <li><Link className={`${styles.nav} ${styles.active}`} href="./mapsDirectory">MAPS-EMPTY</Link></li>
                    <li><Link className={styles.nav} href="/graphsDirectory">GRAPHS_EMPTY</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.contentSection}>
                <h1>Maps</h1>
                <p>Make container or grid format</p>
                    {/* Put graph code here */}
            </div>
</Layout>
)
    ;
}
