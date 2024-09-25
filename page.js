"use client"

import Layout from "./components/Layout";
import Image from "next/image";
import styles from "./page.module.css";
import {useState, useEffect} from "react";
import Link from 'next/link'

export default function Home() {
  const [summary, setSummary] = useState([]);
  const [costs, setCosts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    document.title = "Car Rental Website";
    async function fetchSummary() {
      let res = await fetch('http://localhost/car_rental/car_php/car_rental.php?query=summary')
      let data = await res.json()
      setSummary(data)
    }
      async function fetchCosts() {
          const response = await fetch('http://localhost/car_rental/car_php/car_rental.php?query=costs');
          const data = await response.json();
          setCosts(data);
      }

    fetchCosts();
    fetchSummary()
  }, [])

    const handleDropdownChange = (event) => {
        const index = event.target.value;
        setSelectedIndex(index === '' ? null : Number(index));
    };

    const selectedCost = costs[selectedIndex];






    return ( // the return section displays html
        <Layout>

            <div>
                {/* Nav Bar */}
                <ul className={styles.navMenu}>
                    <li><Link className={`${styles.nav} ${styles.active}`} href="/">HOME</Link></li>
                    <li><Link className={styles.nav} href="/vehiclesDirectory">VEHICLES</Link></li>
                    <li><Link className={styles.nav} href="/mapsDirectory">MAPS-EMPTY</Link></li>
                    <li><Link className={styles.nav} href="/graphsDirectory">GRAPHS_EMPTY</Link></li>
                </ul>
            </div>


            <div className={styles.contentSection}>
                <div className={styles.doublePanel}>
                    {summary.map((summ, index) => (
                        <div key={index} className={styles.sumPanel}>
                            <h2>Trip Summaries</h2>
                            {Object.entries(summ).map(([key, value], idx) => (
                                <div key={idx} className={styles.entry}>
                                    <p className={styles.sumP}>{key}:</p>
                                    <p className={styles.valueP}> {value}</p>
                                </div>
                            ))}
                        </div>
                    ))}



                    {selectedCost && (
                        <div className={styles.costsPanel}>
                            <h2>Costs and Rates</h2>
                            <div className={styles.dropVehicle}>
                                <select className={styles.select} onChange={handleDropdownChange}
                                        value={selectedIndex || ''}>
                                    <option value="0">Economy Car</option>
                                    <option value="1">Compact Auto</option>
                                    <option value="2">Full Size Sedan</option>
                                    <option value="3">Compact SUV</option>
                                    <option value="4">Intermediate SUV</option>
                                    <option value="5">Full Size SUV</option>
                                    <option value="6">Other</option>
                                </select>
                            </div>

                            {/*<p className={styles.sumP}>Vehicle Category: </p><p className={styles.valueP}>${selectedCost.vehicle_category}</p>*/}
                            <p className={styles.sumP}>Daily Hire Rate: </p><p
                            className={styles.valueP}>${selectedCost.daily_hire_rate}</p>
                            <p className={styles.sumP}>Flat Maintenance Rate: </p><p
                            className={styles.valueP}>${selectedCost.flat_maintenance_rate}</p>
                            <p className={styles.sumP}>Hourly Relocation Rate: </p><p
                            className={styles.valueP}>${selectedCost.hourly_relocation_rate}</p>
                            <p className={styles.sumP}>Purchase Cost: </p><p
                            className={styles.valueP}>${selectedCost.purchase_cost}</p>
                            <p className={styles.sumP}>Monthly Lease Cost: </p><p
                            className={styles.valueP}>${selectedCost.monthly_lease_cost}</p>
                        </div>
                    )}
                </div>
            </div>


        </Layout>
    );
}
