"use client"

import Image from "next/image";
import styles from "../page.module.css";
import {useState, useEffect} from "react";
import Link from 'next/link'
import Layout from "../components/Layout"; // Import the layout component


export default function Graphs() {
    const [graph, setGraph] = useState([]);

    useEffect(() => {
        document.title = "Rental Graphs";
        async function fetchGraph() {
            let res = await fetch('http://localhost/car_rental/car_php/car_rental.php?query=graph')
            let data = await res.json()
            setGraph(data)
        }
        fetchGraph()
    }, [])


    return ( // the return section displays html
        <Layout>
            <div>
                {/* Nav Bar */}
                <ul className={styles.navMenu}>
                    <li><Link className={styles.nav} href="./">HOME</Link></li>
                    <li><Link className={styles.nav} href="./vehiclesDirectory">VEHICLES</Link></li>
                    <li><Link className={styles.nav} href="./mapsDirectory">MAPS-EMPTY</Link></li>
                    <li><Link className={`${styles.nav} ${styles.active}`} href="/graphsDirectory">GRAPHS_EMPTY</Link>
                    </li>
                </ul>
            </div>

            <div className={styles.contentSection}>
                <h1>Graph</h1>
                <p>Make container or grid format</p>
            </div>


        </Layout>

);
}
